import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProjectList from './components/ProjectList';
import SamplePage from './components/SamplePage';
import Home from './components/Home';

function App() {
  return (
    <div className='App'>
      <Router>
        <Home />
        <Routes>
          <Route path="/" element={<ProjectList />} />
          <Route path='/samples/:project_name' element={<SamplePage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
