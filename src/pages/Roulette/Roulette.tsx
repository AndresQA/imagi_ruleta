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
    const [iconResult, setIconResult] = useState<string | undefined>(undefined);

    const redirect = useHistory()

    const [history, setHistory] = useState<{ id: number, title: string, value: boolean, answer: string, category: string }[]>([]);

    const category = [{ name: 'Anorexia de valores', img: "/images/icons/Anorexia_de_valores.svg" }, { name: 'Compradicción', img: "/images/icons/Compradiccion.svg" }, { name: 'Pánico a reusar, reparar y reducir', img: "/images/icons/Panico.svg" }];

    const data = [
        { option: '', style: { backgroundColor: '#CA813D', textColor: 'white' } },
        { option: '', style: { backgroundColor: '#60AF57', textColor: 'white' } },
        { option: '', style: { backgroundColor: '#00A79C', textColor: 'white' } },
    ]

    const pregunta = () => {
        setPreguntaIndex(getRandomInt(0, data.length));
    }

    const onLoadQuestion = ({name, img}:{name: string, img:string}) => {
        var searching = true;
        var questionSelect = [] as IQuestion[];
        questionSelect = shuffle(questions.filter((q) => {
            if (name == q.category) {
                return q
            }
        }));
        var question = undefined as IQuestion | undefined;
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
        setIconResult(img);
        setTimeout(() => {
            setQuestion(question);
            
        }, 2000)
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


    return <div className="Index backgroundType2 backgroundImg" style={{ backgroundImage: 'url(/images/fondo-08.svg)' }}>

        <div className="container_interaction">


            {question != undefined ?
                <Questions data={question} onResult={(dato) => {
                    setQuestion(undefined)
                    setIconResult(undefined)

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
                        outerBorderWidth={3}
                        radiusLineWidth={3}
                        onStopSpinning={() => {
                            setSpin(false)
                            onLoadQuestion(category[preguntaIndex])
                        }

                        }
                    />
                    {iconResult == undefined ? <></> :

                        <img src={iconResult} className="roulette_icon" alt="" />
                    }
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