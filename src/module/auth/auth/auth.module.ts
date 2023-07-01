import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './local.strategy';
import { UserService } from 'src/module/user/user.service';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/module/user/user.module';

@Module({
  imports:[UserModule,PassportModule],
  providers: [AuthService,LocalStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
