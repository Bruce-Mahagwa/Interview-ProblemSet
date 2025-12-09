import { Body, Controller, Get, HttpException, Post } from '@nestjs/common';
import { TelemetryService } from './telemetry.service';
import { TelemetryDto } from './dto/telemetry.dto';
import { Telemetry } from './schema/telemetry.schema';

@Controller('telemetry')
export class TelemetryController {
    constructor(private telemetryService: TelemetryService) { }
    @Get()
    async getAll() {
        try {
            const res = await this.telemetryService.findOne();
            return res;
        }
        catch (e) {
            throw new HttpException("Error fetching telemetry data", 500);
        }
    }
    @Post()
    async create(@Body() telemetryDto: TelemetryDto): Promise<Telemetry> {
        try {
            return this.telemetryService.createTele(telemetryDto);
        }
        catch (e) {
            return e;
        }
    }
}
