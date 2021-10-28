import { useState } from 'react';
import Routes from '../../constants/Routes';
import './final.scss';


const Final = () => {
    const [screen, setScreen] = useState(0)

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
                        <button className="btn" >Girar</button>
                    </a>
                </div>
            </div>

            break;
        default:
            break;
    }
    return <div></div>
}

export default Final;