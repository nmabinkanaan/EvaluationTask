

import { EntityRepository, Repository } from "typeorm";
import { User } from "./user.entity";


@EntityRepository(User)
export class UserReposity extends Repository<User>{

}

