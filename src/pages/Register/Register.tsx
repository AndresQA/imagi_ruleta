import { useState} from 'react';
import { Link } from 'react-router-dom';
import Routes from '../../constants/Routes';
import './register.scss';


const Register = () => {
    const[name, setName]=useState('')
    const[age, setAge]=useState('')

    return <div className="Index backgroundImg" style={{ backgroundImage: 'url(/images/background2.svg)' }}>

        <div className="container">
            <h2>Ingresa tus datos</h2>
            <div className="register_inputs">
                <input onChange={(e)=> setName(e.target.value)} placeholder="Nombre" type="text" />
                <input onChange={(e)=> setAge(e.target.value)} placeholder="Edad" type="number" />
            </div>
            <Link to={Routes.ROULETTE}>
                <button className="btn">Jugar</button>
            </Link>
        </div>

    </div>
}

export default Register;