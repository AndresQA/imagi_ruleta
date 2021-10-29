import React from 'react';
import './App.css';
import './animation.scss';
import { Route, Switch, withRouter } from 'react-router';
import Index from '../../pages/Index/Index';
import Register from '../../pages/Register/Register';
import RouletteWheel from '../../pages/Roulette/Roulette';
import Final from '../../pages/Final/Final';
import Routes from '../../constants/Routes';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Header from '../Header/Header';
import Results from '../../pages/Results/Results';

const App = withRouter(({ location }) => {
  return (
        
        <TransitionGroup className="App">
          <Header/>
          <CSSTransition timeout={900} key={location.key} classNames="slide">
            <Switch location={location}>
              <Route exact path={Routes.INDEX} component={Index} />
              <Route exact path={Routes.REGISTER} component={Register} />
              <Route exact path={Routes.ROULETTE} component={RouletteWheel} />
              <Route exact path={Routes.FINAL} component={Final} />
              <Route exact path={Routes.RESULTS} component={Results} />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      
  );
})

export default App;
