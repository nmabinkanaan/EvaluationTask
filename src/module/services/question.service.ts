import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Quiz } from "../entities/quiz.entity";
import { CreateQuestionDto } from "../quiz/dto/create-question.dto";
import { Question } from "../entities/question.entity";

@Injectable()
export class QuestionService{
    constructor(@InjectRepository(Question) private qustionRepository: Repository<Question>){

    }

    async createQuestion(question: CreateQuestionDto, quiz:Quiz): 
    Promise<Question>{
        const newQuestion =await this.qustionRepository.save({
            question:question.question,
        });
        quiz.questions=[...quiz.questions,newQuestion];
        await quiz.save();
        return newQuestion;
       
    }

}