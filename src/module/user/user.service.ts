import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ILike, Repository } from "typeorm";
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
        // const { search } = filterUserByName;

        //might as well just make it private not let
        return this.getAllUsers(filterUserByName.search);
        //we gonna store all task in this variable and then apply filtering
        // if (search)
        // users = (await users).filter(user =>
        //     user.name.includes(search)
        // )
    }

    // async getAllUsers(): Promise<User[]> {
    //     return await this.quizRepository
    //       .createQueryBuilder('q')
    //       .getMany();
    //   }
    async getAllUsers(search?: string): Promise<User[]> {
        try {
            return await this.quizRepository
                // .createQueryBuilder('q')
                // .getMany();
                .find({
                    where: {
                        name: ILike(`%${search}%`)
                    }
                })
        } catch (error) {
            console.error('error while finding users', error);
            throw new BadRequestException('error while finding users');
        }
    }
    async getUserByEmail(email: string): Promise<User | undefined> {
        return User.findOne({ where: { email } });
    }

    async getUserById(id: number): Promise<User | undefined> {
        return User.findOne({ where: { id } });
    }
}