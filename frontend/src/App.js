import logo from './logo.svg';
import './App.css';

/*function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;*/

import React from 'react';
import ProjectsList from './components/ProjectList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Electron Microscope Lab</h1>
      </header>
      <main>
        <ProjectsList />
        {/* You can add more components here for different sections of your app */}
      </main>
    </div>
  );
}

export default App;

