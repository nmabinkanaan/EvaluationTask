import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmConfig } from './config/typeorm.config';
import { UserModule } from './module/user/user.module';
import { AuthModule } from './module/auth/auth/auth.module';
import { config } from 'rxjs';
import { S3Module } from './s3/s3.module';
import { ConfigModule,ConfigService } from '@nestjs/config';


@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), UserModule,AuthModule, S3Module,ConfigModule.forRoot({ isGlobal: true})],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
