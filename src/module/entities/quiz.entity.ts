import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Question } from "./question.entity";

@Entity('quizes')
// this should be the name of the table

export class Quiz extends BaseEntity {
    // any entity should extends the base entity 
    @PrimaryGeneratedColumn(
        { comment: 'thie quiz unique modifirer' }
    )
    id: number

    @Column({
        type: 'varchar',
    })
    title: string;

    @Column({
        type: 'text'
    })
    description: string;

    @Column({
        type: 'boolean',
        default: 1,
    })
    isActive: boolean;

    @OneToMany(()=> Question,(question)=>question.quiz)
    questions:Question[];
    //here we are denfing one field in side quiz entity that is question field
    //which consist of array of questions
}