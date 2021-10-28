import { Link } from 'react-router-dom';
import Routes from '../../constants/Routes';
import './roulette.scss';
import { Wheel } from 'react-custom-roulette'
import { useEffect, useState } from 'react';
import questions from '../../constants/questions/questions.json';
import { IQuestion } from '../../components/Questions/Questions';
import Questions from '../../components/Questions/Questions';

import { useHistory } from 'react-router';
import UserContext from '../Register/UserContext';
import Database from '../../constants/firebase/database';
import DBRoutes from '../../constants/firebase/database/DBRoutes';
import Excel from '../../constants/excel';

export function shuffle(array: any[]) {
    array.sort(function () { return Math.random() - 0.5; });
    return array;
}

function getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min)) + min;
}

export interface ITest {
    ID: string,
    name: string,
    age: number,
    aciertos: number,
    errores: number,
    intentos: number,
    history: { id: number, title: string, value: boolean, answer: string, category: string }[]
}

const RouletteWheel = () => {

    const { useUser } = UserContext()
    const [user] = useUser()

    const [spin, setSpin] = useState(false);
    const [questionCorrect, setQuestionCorrect] = useState<Map<number, boolean>>(new Map());
    const [question, setQuestion] = useState<IQuestion | undefined>(undefined);
    const [preguntaIndex, setPreguntaIndex] = useState(0);

    const redirect = useHistory()

    const [history, setHistory] = useState<{ id: number, title: string, value: boolean, answer: string, category: string }[]>([]);

    const category = ['Anorexia de valores', 'Compradicción', 'Pánico a reusar, reparar y reducir'];

    const data = [
        { option: 'Anorexia', style: { backgroundColor: '#CA813D', textColor: 'white' } },
        { option: 'Compradiccion', style: { backgroundColor: '#60AF57', textColor: 'white' } },
        { option: 'Panico', style: { backgroundColor: '#00A79C', textColor: 'white' } },
    ]

    const pregunta = () => {
        setPreguntaIndex(getRandomInt(0, data.length));
    }

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

        }
        setQuestion(question);
    }

    const onNextPage = () => {
        const answersCorrect = history.filter(h => { if (h.value === true) { return h } })
        if (answersCorrect.length >= 3) {
            const RU = DBRoutes.USER;
            const UID = Database.generateUID([RU._THIS, RU.INFORMATION])
            const data: ITest = {
                ...user,
                ID: UID,
                aciertos: answersCorrect.length,
                errores: history.length - answersCorrect.length,
                intentos: history.length,
                history
            }



            Database.writeDatabase([RU._THIS, RU.INFORMATION, UID], data, () => {
                redirect.push(Routes.FINAL)
            })


        }
    }

    

    useEffect(() => {

        onNextPage()
    }, [history])


    return <div className="Index backgroundType2 backgroundImg" style={{ backgroundImage: 'url(/images/background3.svg)' }}>

        <div className="container_interaction">


            {question != undefined ?
                <Questions data={question} onResult={(dato) => {
                    setQuestion(undefined)

                    if (dato.value === true) {
                        const historyNew = new Map<number, boolean>();
                        questionCorrect.forEach((value, key) => {
                            historyNew.set(key, value);
                        })
                        historyNew.set(question.id, false);
                        setQuestionCorrect(historyNew)
                    }

                    setHistory([...history, dato])
                }} /> :
                <div className="containner_roulette">
                  {  /*<h1>{category[preguntaIndex]}</h1> */}
                    <Wheel
                        mustStartSpinning={spin}
                        prizeNumber={preguntaIndex}
                        data={data}
                        backgroundColors={['#3e3e3e', '#df3428']}
                        textColors={['#ffffff']}
                        onStopSpinning={() => {
                            setSpin(false)
                            onLoadQuestion(category[preguntaIndex])
                        }

                        }
                    />
                    <button onClick={() => {
                        pregunta()
                        setSpin(true)
                    }} className="btn" disabled={spin}>Girar</button>

                </div>

            }
        </div>

    </div>
}

export default RouletteWheel;