import { IsNotEmpty, isNotEmpty, Length } from "class-validator";


export class CreateQuestionDto{
   
    @IsNotEmpty({message:'you should write a question'})
    @Length(3)
    question:string;

    @IsNotEmpty()
    quizId:number;
}