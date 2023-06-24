import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmConfig } from './config/typeorm.config';
import { QuestionService } from './module/services/question.service';
import { QuizModule } from './module/quiz/quiz.module';
import { QuizcontrollerController } from './module/controllers/quizcontroller.controller';

@Module({
  imports: [QuizModule , TypeOrmModule.forRoot(typeOrmConfig)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
