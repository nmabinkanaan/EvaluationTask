import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/module/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private userService:UserService, private jwtService:JwtService){
        
    }

    async validateUserCreds(email:string,password:string):Promise<any>{
        const user=await this.userService.getUserByEmail(email);
        if (!user)throw new BadRequestException();

        //now we will check if the password is correct
        if (!(await bcrypt.compare(password,user.password)))
            throw new UnauthorizedException();


        return user;
        //if it pass the tow "if" it will return the user
    }
    generateToken(user: any) {
        return {
          access_token: this.jwtService.sign({
            name: user.name,
            sub: user.id,
            //this is the payload that will be signed
            //and this is what will be returning from jwt token
          }),
        };
      }
}
