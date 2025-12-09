import { Injectable, Res, StreamableFile } from '@nestjs/common';
import jsPDF from 'jspdf';
import { TelemetryService } from 'src/telemetry/telemetry.service';
import autoTable from 'jspdf-autotable';
import fs, { createReadStream } from 'fs'
import path, { dirname, join } from 'path'
import { type Response } from 'express';
import { InjectModel } from '@nestjs/mongoose';
import { Reports } from './schemas/reports.schema';
import { ReportsModule } from './reports.module';
import { Model } from 'mongoose';
import { URL } from 'url';
const multer = require("multer")

@Injectable()
export class ReportsService {
    private document: jsPDF
    private __dirname = __dirname;
    private letterhead = "data:image/png;base64,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"

    constructor(private telemetryService: TelemetryService, @InjectModel(Reports.name) private reportsModel: Model<Reports>) {
        this.document = new jsPDF({ orientation: "portrait", unit: "pt", format: "a4" });

    }
    async generateReport() {
        const data = await this.telemetryService.findAll();
        const headers: string[] = ["deviceType", "timestamp", "status", "temperature"];
        this.document.text("Telemetry Report", 40, 40);
        this.document.addImage(this.letterhead, "PNG", 45, 45, 40, 40)
        const values = data.map((item) => [String(item.deviceType), String(item.timestamp), String(item.data.status), String(item.data.temperature)])
        await autoTable(this.document, {
            startY: 80,
            head: [headers],
            body: values,
            theme: "grid",
            styles: { fontSize: 8, cellPadding: 6 },
            headStyles: {
                fontStyle: "bold"
            }
        });
        const doc = await this.document.save("report.pdf");       
        const value = await this.saveReportToDB();
        return value;
    }

    async saveReportToDB() {
        const name = String(Date.now()) + "report.pdf"
        const fileBuffer = fs.readFileSync(path.join(process.cwd(), 'report.pdf'));
        const newReport = new this.reportsModel({
            file: fileBuffer,
            fileName: name
        });
        await newReport.save();
        const finalValue = await this.getReportFromDb();
        return finalValue;
    }

    async getReportFromDb() {
        const report = await this.reportsModel.findOne().sort({ _id: -1 }).exec();
        return report;
    }
}

