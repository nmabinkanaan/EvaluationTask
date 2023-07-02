import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Quiz } from "../entities/quiz.entity";
import { CreateQuizDto } from "../dto/CreateQuiz.dto";
import { QuizReposity } from "../repositories/quiz.repository";

@Injectable()
export class QuizService{
    // constructor(
    //     @InjectRepository (QuizReposity)private quizReposity: QuizReposity,
    // ){

    // }
    constructor(@InjectRepository(Quiz) private quizRepository: Repository<Quiz>){}
    
  
    async getAllQuiz(): Promise<Quiz[]> {
        return await this.quizRepository
          .createQueryBuilder('q')
          .leftJoinAndSelect('q.questions', 'qt')
          .getMany();
      }
  

    async getQuizById(id:number):Promise<Quiz>{
        return await this.quizRepository.findOne(
          {

            where:{
                id:id
            },
            relations:['questions']
          }
          
        );   
    }
    //i faces problems with find one method
    async createNewQuiz(quiz:CreateQuizDto){
        return await this.quizRepository.save(quiz);
    }
}