import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionRepository } from '../repositories/question.repository';
import { QuestionService } from '../services/question.service';
import { Quiz } from '../entities/quiz.entity';
import { questionController } from '../controllers/question.controller';
import { Question } from '../entities/question.entity';
import { QuizReposity } from '../repositories/quiz.repository';
import { QuizService } from '../services/quiz.service';
import { QuizcontrollerController } from '../controllers/quizcontroller.controller';


@Module({
    controllers:[QuizcontrollerController,questionController],
    imports:[TypeOrmModule.forFeature([QuizReposity,QuestionRepository]),TypeOrmModule.forFeature([Quiz,Question])],
    providers:[QuizService,QuestionService],
})
export class QuizModule {}
