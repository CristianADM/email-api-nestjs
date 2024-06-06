import { Module } from '@nestjs/common';
import { EmailModule } from './email/email.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [".env"],
      isGlobal: true
      }),
    MongooseModule.forRoot(process.env.CONEXIONDB),
    EmailModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
