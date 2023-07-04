

import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserRoles } from 'src/module/user/enums/user.enum';
import { UserService } from 'src/module/user/user.service';

@Injectable()
export class AdminRoleGuard implements CanActivate {
  constructor(private userService: UserService) {}
 
  async canActivate(context: ExecutionContext) {
    // const request = context.switchToHttp().getRequest();
    // //the request will have the user object in it 
    // //it will be done bu the passport

    // if (request?.user) {
    //   const { id } = request.user;
    //   //because in auth.service.ts we are sening the name and id 
    //   //we are not sending the role
    //   //so we have to get the id
    //   //even though we can send the role but we dont
    //   //want to send a lot of info 
    
    //   const user = await this.userService.getUserById(id);
    //   return user.role === UserRoles.ADMIN;
    // }

    return false;
  }
}