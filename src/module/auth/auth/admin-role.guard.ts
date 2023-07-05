

import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { UserRoles } from 'src/module/user/enums/user.enum';
import { UserService } from 'src/module/user/user.service';
import type { Request } from 'express';
import { User } from 'src/module/user/user.entity';
import { JwtAuthGuard } from './jwt-auth.guard';

@Injectable()
export class AdminRoleGuard implements CanActivate {

  @Inject()
  private userService: UserService;


  async canActivate(context: ExecutionContext) {
    // console.log('hi');
    //const request = context.switchToHttp().getRequest();

    const request: Request = context.switchToHttp().getRequest();

    // const authoirization = request.headers['authorization'];

    // if (!authoirization) {
    //   throw new ForbiddenException();
    // }

    // console.log('Decoded AUTH', Buffer.from(authoirization).toString('utf-8'));

    // throw new NotImplementedException()
    // request.user =


    //console.log(request?.user)

    if (!request?.user) {
      return false;
    }

    console.log(request.user);
    console.log('hi2');
    //even though we know the user object is with the request
    //it is safest to ckeck and put question mark
    const { id } = request.user as User;;
    //because in auth.service.ts we are sening the name and id 
    //we are not sending the role
    //so we have to get the id
    //even though we can send the role but we dont
    //want to send a lot of info 

    const user = await this.userService.getUserById(id);

    return user.role === UserRoles.ADMIN;
    //the safest way is to say the user can not do anything
    //unless there a request and we check the request
  }
}