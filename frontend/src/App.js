import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProjectList from './components/ProjectList';
import SamplePage from './components/SamplePage';
import AnalysisPage from './components/AnalysisPage';
import Home from './components/Home';

function App() {
  return (
    <div className='App'>
      <Router>
        <Home />
        <Routes>
          <Route path="/" element={<ProjectList />} />
          <Route path='/:project_name/samples' element={<SamplePage />} />
          <Route path='/:project_name/:sample_name/Analysis' element={<AnalysisPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
