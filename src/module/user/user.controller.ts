import { Body, Controller, Post, ValidationPipe } from "@nestjs/common";
import { ApiBadRequestResponse, ApiCreatedResponse, ApiTags } from "@nestjs/swagger";
import { UserRegisterRequestDto } from "./dto/user-register-req.dto";
import { User } from "./user.entity";
import { UserService } from "./user.service";


@ApiTags('user')
@Controller('user')
export class UserController{
    constructor(private userService:UserService){}


@Post('/register')
@ApiCreatedResponse({
    description: 'Created user object as response',
    type: User,
  })
  @ApiBadRequestResponse({ description: 'User cannot register. Try again!' })
async doUserRegistration(@Body(ValidationPipe)userRegister:UserRegisterRequestDto):Promise<User>{
    
   return await this.userService.doUserRegistration(userRegister);
}
}