import { BadRequestException, HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ILike, Repository } from "typeorm";
import { UserRegisterRequestDto } from "./dto/user-register-req.dto";
import { FilterUserByNameDto } from "./dto/user-search.dto";
import { User } from "./user.entity";
import { Express } from 'express';
import { S3Service } from "src/s3/s3.service";




@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private UserReposity: Repository<User>,
                private s3Service:S3Service
    ) { }


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
    //     return await this.UserReposity
    //       .createQueryBuilder('q')
    //       .getMany();
    //   }
    async getAllUsers(search?: string): Promise<User[]> {
        try {
            return await this.UserReposity
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

    //async addFileToUser(file: Express.Multer.File, id: number=0, email: string) {
        async addFileToUser(file: Express.Multer.File, id: number=0) {
        const user = await this.UserReposity.findOne({ where: { id } });
    
           
         
        
        //.findOne({ where: { id } });
        // findOneOrFail(
        //    {where: { 'id' }:}
        //   relations: ['user'],
        // }
        // {

            // where:{
            //     id:id
            // },
            // relations:['user']
          
        
    
        // if (user.email !== email) {
        //   throw new HttpException(
        //     "rge",
        //     400,
        //   );
        // }
        const bucketKey = `${file.fieldname}${Date.now()}`;
        const fileUrl = await this.s3Service.uploadFile(file, bucketKey);
    
        await this.UserReposity.update({ id }, { image: fileUrl });
      }
}