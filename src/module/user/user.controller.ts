import { Body, Controller, Get, Post, Query, ValidationPipe } from "@nestjs/common";
import { ApiBadRequestResponse, ApiCreatedResponse, ApiTags } from "@nestjs/swagger";
import { UserRegisterRequestDto } from "./dto/user-register-req.dto";
import { FilterUserByNameDto } from "./dto/user-search.dto";
import { User } from "./user.entity";
import { UserService } from "./user.service";


@ApiTags('user')
@Controller('user')
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
    @Get('/')
    async getAllQuiz(@Query() filterUserByName: FilterUserByNameDto): Promise<any> {
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