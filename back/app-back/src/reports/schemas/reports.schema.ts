import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ReportsDocument = HydratedDocument<Reports>

@Schema()
export class Reports {
    @Prop()
    file: Buffer
    @Prop()
    fileName: string
}

export const ReportsSchema = SchemaFactory.createForClass(Reports);

