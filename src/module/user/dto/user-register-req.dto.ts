import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, Length, Matches } from "class-validator";
import { MESSAGES, REGEX } from "src/app.utils";

export class UserRegisterRequestDto{

    @ApiProperty({
        description: 'The name of the User',
        example: 'Nouf Alkanaan',
      })
    @IsNotEmpty()
    name:string;

    @ApiProperty({
        description: 'The email address of the User',
        example: 'Nouf.k@gmail.com',
      })
    @IsNotEmpty()
    @IsEmail()
    email:string;

    @ApiProperty({
        description: 'The password of the User',
        example: 'Password@123',
      })
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

@ApiProperty({
    description: 'Confirm the password',
    example: 'Password@123',
  })
    @IsNotEmpty()
    @Length(8,24)
    confirm:string;
}