import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Quiz } from "../entities/quiz.entity";
import { CreateQuizDto } from "../quiz/dto/CreateQuiz.dto";
import { QuizReposity } from "../repositories/quiz.repository";

@Injectable()
export class QuizService{
    // constructor(
    //     @InjectRepository (QuizReposity)private quizReposity: QuizReposity,
    // ){

    // }
    constructor(@InjectRepository(Quiz) private quizRepository: Repository<Quiz>){}
    
    getAllQuiz():any{
        return [1,2,3,'from service'];
    }
    // {
    //     where: {
    //         id: id,
    //     },
    // },{relation:['questions']}
    

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