import './index.scss';
import { Link } from 'react-router-dom';
import Routes from '../../constants/Routes';

const Index = () => {
    return <div className="Index backgroundImg" style={{ backgroundImage: 'url(/images/background.svg)' }}>

        <div className="container">
            <img className="logo" src="/images/logo.png" alt="logo" />
            <Link to={Routes.REGISTER}>
                <button className="btn">Empezar</button>
            </Link>
        </div>

    </div>
}

export default Index;