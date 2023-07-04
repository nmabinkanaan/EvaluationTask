import { Controller, Post, UseGuards, Request, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }
    @UseGuards(LocalAuthGuard)
    //LocalAuthGuard if the strategy we difind
    //in local strategy it will do validate method
    //it validate method will validate the user based on
    //validate cred method in auth.service
    @Post('login')
    // async login(@Request() req):Promise<any>{
    //     return req.user;
    // }
    async login(@Request() req): Promise<any> {
        return this.authService.generateToken(req.user);
    }

    //@ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get('user')
    async user(@Request() req): Promise<any> {
        return req.user;
    }
}
