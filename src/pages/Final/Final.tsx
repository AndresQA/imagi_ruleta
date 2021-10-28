import { useState } from 'react';
import Excel from '../../constants/excel';
import Database from '../../constants/firebase/database';
import DBRoutes from '../../constants/firebase/database/DBRoutes';
import Routes from '../../constants/Routes';
import { ITest } from '../Roulette/Roulette';
import './final.scss';


const Final = () => {
    const [screen, setScreen] = useState(0)

    const onDescargar = () => {
        const RU = DBRoutes.USER;
        Database.readBrachOnlyDatabaseVal([RU._THIS, RU.INFORMATION], (testsSnap) => {
            const tests = Object.values(testsSnap) as  ITest[]; 	
            generateExcel(tests)
        })

    }

    const generateExcel = (registros: ITest[]) => {
        var matrix = [] as (string | number)[][]


        const titulares = ["ORDEN", "NOMBRE", "EDAD", "ERRORES", "INTENTOS", "CATEGORIA", "PREGUNTA", "RESPUESTA", "CORRECTA"]
        matrix.push(titulares)

        registros.forEach(({ name, age, intentos, errores, history }, index) => {


            history.forEach((({ title, answer, value, category }) => {
                var fila = [] as (string | number)[]

                fila.push(index)
                fila.push(name)
                fila.push(age)
                fila.push(errores)
                fila.push(intentos)
                fila.push(category)
                fila.push(title)
                fila.push(answer)
                fila.push(value ? "VERDADERO" : "FALSO")

                matrix.push(fila)
            }))

        })
        const excel = new Excel();
        excel.crearHoja('Resultados');
        excel.cargarMatrix('Resultados', matrix);
        excel.guardar('Estudio.xlsx');

    }

    switch (screen) {
        case 0:
            return <div className="Index backgroundType2 backgroundImg" style={{ backgroundImage: 'url(/images/background3.svg)' }}>
                <div className="container">
                    <h2>ENHORABUENA</h2>
                    <p>Ahora podrás usar el conocimiento adquirido y podras seguir ayudando a nuestro mundo.</p>
                    <button onClick={() => setScreen(1)} className="btn">Siguiente</button>
                </div>
            </div>

            break;
        case 1:
            return <div className="Index backgroundType2 backgroundImg" style={{ backgroundImage: 'url(/images/background3.svg)' }}>
                <div className="container">
                    <h2>para mayor información</h2>
                    <p>Visita las siguientes fundaciones</p>
                    <div className="container_fundaciones">
                        <a href="https://www.fundacionfarallones.org/" target="_blank">
                            <img src="/images/farallones.png" alt="Fundacion Farallones" />
                        </a>
                        <a href="https://fserambiente.org/" target="_blank">
                            <img src="/images/serambiente.png" alt="Fundación Ser Ambiente" />
                        </a>
                    </div>
                    <a href={Routes.INDEX}>
                        <button className="btn" >Volver</button>
                    </a>
                    <button onClick={onDescargar} className="btn" >Descargar</button>
                </div>
            </div>

            break;
        default:
            break;
    }
    return <div></div>
}

export default Final;