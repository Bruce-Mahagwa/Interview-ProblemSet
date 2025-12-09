import { Controller, Get, Header, Post, Query, Res, StreamableFile } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { type Response } from 'express';
import { createReadStream } from 'node:fs';
import { join } from 'node:path';

@Controller('telemetry/reports')
export class ReportsController {
    constructor(private reportsService: ReportsService) { }
    @Get()
    async generateReportController() {
        try {
            const doc = await this.reportsService.generateReport();            
            return doc;            
        }
        catch (e) {
            console.error(e);
        }
    }    
}
