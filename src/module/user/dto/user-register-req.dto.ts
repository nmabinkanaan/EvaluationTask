import { IsEmail, IsNotEmpty, Length, Matches } from "class-validator";
import { MESSAGES, REGEX } from "src/app.utils";

export class UserRegisterRequestDto{


    @IsNotEmpty()
    name:string;

    @IsNotEmpty()
    @IsEmail()
    email:string;


    @IsNotEmpty()
    @Length(8,24)
    // @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, { message: 'Password should have 1 upper case, lowcase letter along with a number and special character.' })
    @Matches(REGEX.PASSWORD_RULE,{
        message:MESSAGES.PASSWORD_RULE_MESSAGE
    })
    password:string;

   // @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, { message: 'Password should have 1 upper case, lowcase letter along with a number and special character.' })
   @Matches(REGEX.PASSWORD_RULE,{
    message:MESSAGES.PASSWORD_RULE_MESSAGE
})
    @IsNotEmpty()
    @Length(8,24)
    confirm:string;
}