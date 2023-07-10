import { Body, Controller, Get, Param, ParseUUIDPipe, Post, Query, UseGuards, ValidationPipe, Request, UploadedFile, UseInterceptors, ParseFilePipe, FileTypeValidator } from "@nestjs/common";
import { ApiBadRequestResponse, ApiBody, ApiConsumes, ApiCreatedResponse, ApiSecurity, ApiTags } from "@nestjs/swagger";
import { AdminRoleGuard } from "../auth/auth/admin-role.guard";
import { JwtAuthGuard } from "../auth/auth/jwt-auth.guard";
import { UserRegisterRequestDto } from "./dto/user-register-req.dto";
import { FilterUserByNameDto } from "./dto/user-search.dto";
import { User } from "./user.entity";
import { UserService } from "./user.service";
import { Express } from 'express';
import { FileInterceptor } from "@nestjs/platform-express";



@ApiTags('user')
@Controller('user')
//@UseGuards(JwtAuthGuard)

export class UserController {
    constructor(private userService: UserService) { }


    @ApiCreatedResponse({
        description: 'return list of all users as response',
        type: User,
    })
    //localhost:3000/user?search=Nouf999
    //thisis an example of the endpoint
    @Get('/')
    @ApiCreatedResponse({
        description: 'return user object as response',
        //type: User,
    })
    @UseGuards(JwtAuthGuard, AdminRoleGuard)
    @ApiBadRequestResponse({ description: 'User cannot search. Try again!' })
    @ApiSecurity('jwt')
    async getAllUsers(@Query() filterUserByName: FilterUserByNameDto): Promise<any> {
        //console.log(filterUserByName);
        if (Object.keys(filterUserByName).length)
            return await this.userService.getUserWithFilters(filterUserByName);
        return await this.userService.getAllUsers();
    }



    @Post('/register')
    @ApiCreatedResponse({
        description: 'Created user object as response',
        type: User,
    })
    @ApiBadRequestResponse({ description: 'User cannot register. Try again!' })
    async doUserRegistration(@Body(ValidationPipe) userRegister: UserRegisterRequestDto): Promise<User> {

        return await this.userService.doUserRegistration(userRegister);
    }



    @UseGuards(JwtAuthGuard)
    @ApiBadRequestResponse({ description: 'you are not authorized to operate on this website, please try to login in order to be authinticated ' })
    @ApiSecurity('jwt')
    @Post('/:id/upload-file')
    @UseInterceptors(FileInterceptor('file'))
    async addImageToUser(
        @Param('id', new ParseUUIDPipe()) id: number,
        @UploadedFile(
            new ParseFilePipe({
                validators: [

                    new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),

                ],
            }),
        ) file: Express.Multer.File,
        @Request() req,
    ) {
        console.log(file);

        await this.userService.addFileToUser(file, id);
    }
}




