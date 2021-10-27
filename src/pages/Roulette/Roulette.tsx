import { Link } from 'react-router-dom';
import Routes from '../../constants/Routes';
import './roulette.scss';
import { Wheel } from 'react-custom-roulette'
import { useState } from 'react';
import questions from '../../constants/questions/questions.json';
import { IQuestion } from '../../components/Questions/Questions';
import Questions from '../../components/Questions/Questions';

export function shuffle(array: any[]) {
    array.sort(function () { return Math.random() - 0.5; });
    return array;
}

const RouletteWheel = () => {
    const [spin, setSpin] = useState(false);
    const [questionCorrect, setQuestionCorrect] = useState<Map<number, boolean>>(new Map());
    const [question, setQuestion] = useState<IQuestion | undefined>(undefined);

    const onLoadQuestion = (category: string) => {
        var searching = true;
        var questionSelect = [] as IQuestion[];
        questionSelect = shuffle(questions.filter((q) => {
            if (category == q.category) {
                return q
            }
        }));
        var question = undefined;
        while (searching) {
            question = questionSelect[0];
            const questionCorrects = questionCorrect.get(question.id);
            if (questionCorrects == undefined || questionSelect.length == 0) {
                searching = false;
            } else {
                questionSelect.splice(0, 1);
                questionSelect = shuffle(questions);
            }
        }
        if (question) {
            question.answers = shuffle(question.answers);
            const history = new Map<number, boolean>();
            questionCorrect.forEach((value, key)=> {
                history.set(key, value);
            })
            history.set(question.id, false);
        }
        setQuestion(question);
    }

    const data = [
        { option: '0', style: { backgroundColor: 'green', textColor: 'black' } },
        { option: '1', style: { backgroundColor: 'white' } },
        { option: '2' },
    ]

    return <div className="Index backgroundType2 backgroundImg" style={{ backgroundImage: 'url(/images/background3.svg)' }}>

        <div className="container">
            <h2>Ingresa tus datos</h2>
            <Wheel
                mustStartSpinning={spin}
                prizeNumber={3}
                data={data}
                backgroundColors={['#3e3e3e', '#df3428']}
                textColors={['#ffffff']}
                onStopSpinning={() => {
                    setSpin(false)
                    onLoadQuestion("Pánico a reusar, reparar y reducir")
                }
                    
                }
            />
            <button onClick={() => setSpin(true)} className="btn">Girar</button>
            {question != undefined ?
                <Questions data={question} /> : <></>

            }
        </div>

    </div>
}

export default RouletteWheel;