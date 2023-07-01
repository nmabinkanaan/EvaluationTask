import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmConfig } from './config/typeorm.config';
import { QuestionService } from './module/quiz/services/question.service';
import { QuizModule } from './module/quiz/quiz.module';
import { QuizcontrollerController } from './module/quiz/controllers/quizcontroller.controller';
import { UserModule } from './module/user/user.module';
import { AuthModule } from './module/auth/auth/auth.module';

@Module({
  imports: [QuizModule , TypeOrmModule.forRoot(typeOrmConfig), UserModule,AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
