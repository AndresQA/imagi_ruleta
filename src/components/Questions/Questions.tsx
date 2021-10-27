import { useState } from 'react';
import './questions.scss';
export interface IQuestion{
    id: number,
    category: string,
    title: string,
    answers: {title: string, value: boolean}[]
}

const Questions = ({data}: {data:IQuestion}) => {
    const {
        title, answers
    } = data;
    const onValidate = (state: boolean)=>{
        console.log(state);
    }
    return <div>
        <h2 className="question_title">{title}</h2>
        {answers.map((option, index)=>{
            return <p className="question" key={index} onClick={()=>onValidate(option.value)}>{option.title}</p>
        })}
    </div>
}

export default Questions;