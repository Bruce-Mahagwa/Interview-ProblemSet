import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Telemetry } from './schema/telemetry.schema';
import { Model } from 'mongoose';
import { TelemetryDto } from './dto/telemetry.dto';

@Injectable() 
export class TelemetryService {
    constructor(@InjectModel(Telemetry.name) private telemetryModel:Model<Telemetry>) {}
    async findOne() {
        const res = await this.telemetryModel.find().limit(1).exec();
        const alerts: {temperature: string, flow_rate: string, power: string,current: string} = {
            temperature: "", flow_rate: "", power: "",current: ""
        }
        // temp
        if (Number(res[0].temperature) > 40) {
            alerts.temperature = "Temperature is over 40"
        }
        if (Number(res[0].flow_rate) > 12) {
            alerts.flow_rate = "Flow rate is greater than 12"
        }
        if (Number(res[0].power) === 0) {
            alerts.power = "There is no power"
        }
        if (Number(res[0].current) > 12) {
            alerts.current = "Current is too strong"
        }        
        // rule processing
        return {info: res, alerts: alerts};
    }
    async createTele(data: TelemetryDto) {
        const newTele = new this.telemetryModel(data);
        await newTele.save();
        return newTele;
    }
}
