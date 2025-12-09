import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TelemetryDocument = HydratedDocument<Telemetry>

@Schema()
export class Telemetry {
    @Prop()
    temperature: string

    @Prop()
    humidity: string 

    @Prop()
    flow_rate: string

    @Prop()
    power: string

    @Prop()
    cumulative_power: string

    @Prop()
    current: string
}

export const TelemetrySchema = SchemaFactory.createForClass(Telemetry);

