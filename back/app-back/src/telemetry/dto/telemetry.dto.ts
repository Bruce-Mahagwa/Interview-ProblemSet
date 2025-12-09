import { IsNumber, IsObject, IsString, Length } from "class-validator";
export class TelemetryDto {
    @IsString()
    temperature: number

    @IsString()
    humidity: number

    @IsString()
    flow_rate: number

    @IsString()
    power: number

    @IsString()
    cumulative_power: number

    @IsString()
    current: number

}