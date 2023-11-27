import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProjectList from './components/ProjectList';
import SamplePage from './components/SamplePage';
import AnalysisPage from './components/AnalysisPage';
import Home from './components/Home';
import ImageComponent from './components/ImageComponent';
import CSVComponent from './components/CSVComponent';

function App() {
  return (
    <div className='App'>
      <Router>
        <Home />
        <Routes>
          <Route path="/" element={<ProjectList />} />
          <Route path='/:project_name/samples' element={<SamplePage />} />
          <Route path='/:project_name/:sample_name/Analysis' element={<AnalysisPage />} />
          <Route path='/image-test' element={<ImageComponent imagePath={'project_1/sample_1/AxioScope/21_GR_14Y_XPL_Cleavage_Zoning.jpg'} />} />
          <Route path='/csv-test' element={<CSVComponent />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
