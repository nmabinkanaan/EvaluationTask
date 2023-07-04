import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './local.strategy';
import { UserService } from 'src/module/user/user.service';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/module/user/user.module';
import { JwtService, JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt-strategy';

@Module({
  imports:[UserModule,PassportModule, JwtModule.register({
    secret:'sdfghjknm2345678ioujghfdvcx@#$%^&*()thfbcv',
    signOptions:{expiresIn:'1d'}
    //this indecate that it should expire in after one day
  })],
  providers: [AuthService,LocalStrategy,JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
