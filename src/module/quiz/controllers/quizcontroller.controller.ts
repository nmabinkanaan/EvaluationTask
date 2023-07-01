import { Body, Controller, Get, HttpCode, Param, ParseIntPipe, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { Quiz } from '../entities/quiz.entity';
import { CreateQuizDto } from '../dto/CreateQuiz.dto';
import { QuizService } from '../services/quiz.service';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('quiz')
@Controller('quizcontroller')
export class QuizcontrollerController {
    constructor(private quizService: QuizService) {}

    @Get('/')
    getAllQuiz():any{
        return this.quizService.getAllQuiz();
    }

    @Post('/create')
    @HttpCode(200)
    //ever post method is 201 but we have changed it
    //to 200 
    // i checked postman to see the change
    @UsePipes(ValidationPipe)
    //using validation pipe make the validation in dto works
  async  createQuiz(@Body() quizData:CreateQuizDto){
        return await this.quizService.createNewQuiz(quizData);
    }
     @Get('/:id')
    async getQuizById(@Param('id',ParseIntPipe) id:number):Promise<Quiz>{
        return await this.quizService.getQuizById(id);
    }

}
