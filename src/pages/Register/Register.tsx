import { useState } from 'react';
import { Link } from 'react-router-dom';
import Routes from '../../constants/Routes';
import './register.scss';
import UserContext from './UserContext';
import { useHistory } from 'react-router';

const Register = () => {

    const history = useHistory();
    const { useUser } = UserContext()
    const [, setUser] = useUser()

    const [name, setName] = useState('');
    const [age, setAge] = useState(0);


    const onSubmit = () => {
        setUser({ name, age })
        history.push(Routes.ROULETTE)
    }

    return <div className="Index backgroundImg" style={{ backgroundImage: 'url(/images/fondo-07.svg)' }}>

        <div className="container">
            <h2>Ingresa tus datos</h2>
            <div className="register_inputs">
                <input onChange={(e) => setName(e.target.value)} placeholder="Nombre" type="text" />
                <input onChange={(e) => setAge(parseInt(e.target.value))} placeholder="Edad" type="number" />
            </div>

            <button className="btn" onClick={onSubmit}>Jugar</button>

        </div>

    </div>
}

export default Register;