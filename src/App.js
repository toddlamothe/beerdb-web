import React from 'react';
import Main from './components/Main';
import About from './components/About.js'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Route, Switch} from 'react-router-dom';
import ReactGA from 'react-ga';
ReactGA.initialize('UA-177244569-1');
ReactGA.pageview(window.location.pathname + window.location.search);

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" children={(props) => (
          <Main {...props} />
          )}
        />
        <Route path="/about" children={(props) => (
          <About {...props} />
          )}
        />


      </Switch>
    </div>
  );
}

export default App;
