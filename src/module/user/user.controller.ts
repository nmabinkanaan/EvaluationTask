import { Body, Controller, Get, Post, Query, UseGuards, ValidationPipe } from "@nestjs/common";
import { ApiBadRequestResponse, ApiCreatedResponse, ApiSecurity, ApiTags } from "@nestjs/swagger";
import { AdminRoleGuard } from "../auth/auth/admin-role.guard";
import { JwtAuthGuard } from "../auth/auth/jwt-auth.guard";
import { UserRegisterRequestDto } from "./dto/user-register-req.dto";
import { FilterUserByNameDto } from "./dto/user-search.dto";
import { User } from "./user.entity";
import { UserService } from "./user.service";


@ApiTags('user')
@Controller('user')
//@UseGuards(JwtAuthGuard)

export class UserController {
    constructor(private userService: UserService) { }


    @ApiCreatedResponse({
        description: 'return list of all users as response',
        type: User,
    })
    // @Get('/')
    // getAllQuiz(): any {
    //     return this.userService.getAllUsers();
    // }

    //this end point will allow the admin to search based on specific name 
    //and if the admin did not provide any name it will return all the users
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
}