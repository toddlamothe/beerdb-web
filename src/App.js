import React from 'react';
import Main from './components/Main';
import About from './components/About.js'
import PageNotFound from './components/404.js'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Route, Switch, Redirect, useLocation} from 'react-router-dom';
import ReactGA from 'react-ga';
ReactGA.initialize('UA-177244569-1');
ReactGA.pageview(window.location.pathname + window.location.search);

function App() {
  const { pathname } = useLocation();
  

  return (
    <div className="App">
      <Switch>
        <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} />
        <Route exact path="/" children={(props) => (
          <Main {...props} />
          )}
        />
        <Route path="/about" children={(props) => (
          <About {...props} />
          )}
        />
        <Route component={PageNotFound} />
      </Switch>
    </div>
  );
}

export default App;
