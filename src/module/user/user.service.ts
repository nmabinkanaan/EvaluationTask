import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserRegisterRequestDto } from "./dto/user-register-req.dto";
import { FilterUserByNameDto } from "./dto/user-search.dto";
import { User } from "./user.entity";




@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private quizRepository: Repository<User>) { }


    async doUserRegistration(userRegister: UserRegisterRequestDto): Promise<User> {


        const user = new User();
        user.name = userRegister.name;
        user.email = userRegister.email;
        user.password = userRegister.password;
        return await user.save();
    }
    async getUserWithFilters(filterUserByName: FilterUserByNameDto) {
        const { search } = filterUserByName;

        //might as well just make it private not let
        let users = this.getAllUsers();
        //we gonna store all task in this variable and then apply filtering
        if (search)
            users = (await users).filter(user =>
                user.name.includes(search)
            )
        return users;

    }

    // async getAllUsers(): Promise<User[]> {
    //     return await this.quizRepository
    //       .createQueryBuilder('q')
    //       .getMany();
    //   }
    getAllUsers(): Promise<any> {
        return this.quizRepository
            .createQueryBuilder('q')
            .getMany();
    }
    async getUserByEmail(email: string): Promise<User | undefined> {
        return User.findOne({ where: { email } });
    }
}