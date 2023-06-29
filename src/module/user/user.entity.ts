import { BaseEntity, BeforeInsert, Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import * as bcrypt from 'bcrypt';
 
@Entity({name:'users'})
 export class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @Column({
        unique:true,
    })
    email:string;

    @Column()
    password:string;

    @CreateDateColumn()
    createdAt:Date;

    @UpdateDateColumn()
    updatedAt: Date;


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
 }