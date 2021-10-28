import { useState } from 'react';
import './questions.scss';
export interface IQuestion {
    id: number,
    category: string,
    title: string,
    answers: { title: string, value: boolean }[]
}
//style={{ background: option.value ? "green" : "" }}
const Questions = ({ data, onResult }: { data: IQuestion, onResult: (state: { id: number, title: string, value: boolean, answer: string, category: string }) => void }) => {
    const {
        title, answers
    } = data;
    const onValidate = (state: { title: string, value: boolean }) => {
        console.log(state);
        onResult({
            id: data.id,
            title: data.title,
            value: state.value,
            answer: state.title, category: data.category
        })
    }
    return <div>
        <h2 className="question_title">{title}</h2>
        {answers.map((option, index) => {
            return <p className="question"  key={index} onClick={() => onValidate(option)}>{option.title}</p>
        })}
    </div>
}

export default Questions;