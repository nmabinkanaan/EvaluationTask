import { BaseEntity, BeforeInsert, Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import * as bcrypt from 'bcrypt';
import { ApiProperty } from "@nestjs/swagger";
import { UserRoles } from "./enums/user.enum";
import { NumberCapability } from "aws-sdk/clients/pinpointsmsvoicev2";
 
@Entity({name:'users'})
 export class User extends BaseEntity{
    @ApiProperty({ description: 'Primary key as User ID', example: 1 })
    @PrimaryGeneratedColumn('uuid')
    id:number;

    @ApiProperty({ description: 'User name', example: 'Nouf Kanaan' })
    @Column()
    name:string;

    @ApiProperty({
        description: 'User email address',
        example: 'Nouf.k@gmail.com',
      })
    @Column({
        unique:true,
    })
    email:string;
    @ApiProperty({ description: 'Hashed user password' })
    @Column()
    password:string;

    @ApiProperty({ description: 'When user was created' })
    @CreateDateColumn()
    createdAt:Date;

    @ApiProperty({ description: 'When user was updated' })
    @UpdateDateColumn()
    updatedAt: Date;

    @ApiProperty({
      description: 'user role',
    })
    @Column({type:'enum', enum:UserRoles,default:UserRoles.MEMBER})
    role:UserRoles;

    //here i will put a decorator to encrypt the password before 
    //saving it in the database
    //this way is called "hook" and its better than encrypting the password 
    //in creating the user object in user.service.ts
    @BeforeInsert()
    //this method will ensure that the password wont be created or
    //saved in the database unless its decrypted
    async setPassword(password:string){
        const salt =await bcrypt.genSalt();
       //first i created the salt
      this.password=await bcrypt.hash(password || this.password, salt);
      
        //and this is the ecrypted version of the password 
       
        
    }
    @Column({nullable:true})
    image:string;
 }