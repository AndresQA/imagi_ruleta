import Excel from "../../constants/excel";
import Database from "../../constants/firebase/database";
import DBRoutes from "../../constants/firebase/database/DBRoutes";
import { ITest } from "../Roulette/Roulette";

const onDescargar = () => {
    const RU = DBRoutes.USER;
    Database.readBrachOnlyDatabaseVal([RU._THIS, RU.INFORMATION], (testsSnap) => {
        const tests = Object.values(testsSnap) as ITest[];
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


const Results = () => {
    return <div className="Index backgroundType2 backgroundImg" style={{ backgroundImage: 'url(/images/fondo-09.svg)' }}>
        <button onClick={onDescargar} className="btn" >Descargar</button>
    </div>
}

export default Results;