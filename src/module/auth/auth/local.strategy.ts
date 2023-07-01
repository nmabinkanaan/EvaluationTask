import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
//import { Strategy } from "passport";
import {Strategy} from 'passport-local'
import { AuthService } from "./auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(private authService:AuthService){
     super();   
     //super function will be used to take consumer key and consumer secre
     //to pass to the strategy
     //and that is what happen inside the super function

    }
    async validate(email:string,password:string){
        const user=await this.authService.validateUserCreds(email,password);
        if(!user)throw new UnauthorizedException();
        //if there is no user it will throw an exception
        //other wise it will return the user object
        return user;

    }
}