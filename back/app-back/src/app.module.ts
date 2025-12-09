import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TelemetryModule } from './telemetry/telemetry.module';


@Module({
  imports: [AuthModule, MongooseModule.forRoot("mONGOURI", {
    onConnectionCreate: (connection) => {
      connection.on('connected', () => console.log('connected'));
      connection.on('open', () => console.log('open'));
      connection.on('disconnected', () => console.log('disconnected'));
      connection.on('reconnected', () => console.log('reconnected'));
      connection.on('disconnecting', () => console.log('disconnecting'));
      return connection;
    }
  }), TelemetryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
