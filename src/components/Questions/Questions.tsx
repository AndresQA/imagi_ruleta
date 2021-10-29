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
        setTimeout(() => {
            onResult({
                id: data.id,
                title: data.title,
                value: state.value,
                answer: state.title, category: data.category
            })
        }, 2000)
    }
    const [select, setSelect] = useState<undefined | number>(undefined);

    const getColor = (status: boolean, index: number) => {
        if (index == select) {
            if (status == true) {
                return "#3D974F"
            } else {
                return "#973C41"
            }
        }
        return undefined
    }

    return <div>
        <h2 className="question_title">{title}</h2>
        {answers.map((option, index) => {
            return <p className="question" style={{ background: getColor(option.value, index) }} key={index} onClick={() => {
                if (select == undefined) {
                    setSelect(index)
                    onValidate(option)
                }
            }}>{option.title}</p>
        })}
    </div>
}

export default Questions;