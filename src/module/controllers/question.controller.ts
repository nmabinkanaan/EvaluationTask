import { Body, Get, Param, ParseIntPipe, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { Controller } from "@nestjs/common";
import { QuestionService } from "../services/question.service";
import { CreateQuestionDto } from "../quiz/dto/create-question.dto";
import { Question } from "../entities/question.entity";
import { QuizService } from "../services/quiz.service";

@Controller('questioncontroller')
export class questionController{
    constructor(private questionService: QuestionService,private quizService:QuizService){}





    @Post('/create')
    @UsePipes(ValidationPipe)
    async  saveQuestion(@Body() questionData:CreateQuestionDto):Promise<Question>{
        const quiz= await this.quizService.getQuizById(questionData.quizId)
        return await this.questionService.createQuestion(questionData,quiz);
    }


   
}