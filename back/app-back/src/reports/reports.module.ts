import { Module } from '@nestjs/common';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { TelemetryModule } from 'src/telemetry/telemetry.module';
import { MongooseModule } from '@nestjs/mongoose'; 
import { Reports, ReportsSchema } from './schemas/reports.schema';
@Module({
  imports: [TelemetryModule, MongooseModule.forFeature([{ name: Reports.name, schema: ReportsSchema }])],
  controllers: [ReportsController],
  providers: [ReportsService]
})
export class ReportsModule {}
 