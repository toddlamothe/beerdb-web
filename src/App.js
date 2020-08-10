import React from 'react';
import Main from './components/Main';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Route} from 'react-router-dom';

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
