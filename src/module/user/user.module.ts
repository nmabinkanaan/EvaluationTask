import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { S3Module } from 'src/s3/s3.module';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserReposity } from './user.reposetory';
import { UserService } from './user.service';

@Module({
    providers:[UserService],
    controllers:[UserController],
    imports:[TypeOrmModule.forFeature([UserReposity]),TypeOrmModule.forFeature([User]),S3Module],
    exports:[UserService]
})
export class UserModule {}
