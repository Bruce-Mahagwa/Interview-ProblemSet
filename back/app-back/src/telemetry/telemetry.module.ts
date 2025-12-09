import { Module } from '@nestjs/common';
import { TelemetryService } from './telemetry.service';
import { TelemetryController } from './telemetry.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Telemetry, TelemetrySchema } from './schema/telemetry.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Telemetry.name, schema: TelemetrySchema }])],
  providers: [TelemetryService],
  controllers: [TelemetryController]
})
export class TelemetryModule { }
