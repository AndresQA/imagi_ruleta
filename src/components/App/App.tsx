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

const App = withRouter(({ location }) => {
  return (
     
        <TransitionGroup className="App">
          <CSSTransition timeout={900} key={location.key} classNames="slide">
            <Switch location={location}>
              <Route exact path={Routes.INDEX} component={Index} />
              <Route exact path={Routes.REGISTER} component={Register} />
              <Route exact path={Routes.ROULETTE} component={RouletteWheel} />
              <Route exact path={Routes.FINAL} component={Final} />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      
  );
})

export default App;
