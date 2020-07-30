import React from 'react';
import Main from './components/Main';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Switch, Route, Link} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Route children={(props) => (
        <Main {...props} />
        )}
      />
    </div>
  );
}

export default App;
