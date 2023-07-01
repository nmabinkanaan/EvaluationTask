import { Controller, Post, UseGuards , Request} from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {

    @UseGuards(LocalAuthGuard)
    //LocalAuthGuard if the strategy we difind
    //in local strategy it will do validate method
    //it validate method will validate the user based on
    //validate cred method in auth.service
    @Post('login')
    async login(@Request() req):Promise<any>{
        return req.user;

    }
}
