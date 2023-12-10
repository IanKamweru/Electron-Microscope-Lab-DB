import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProjectList from './components/ProjectList';
import SamplePage from './components/SamplePage';
import AnalysisPage from './components/AnalysisPage';
import Base from './components/Base';
import ImageComponent from './components/ImageComponent';

function App() {
  return (
    <div className='App'>
      <Router>
        <Base />
        <Routes>
          <Route path="/" element={<ProjectList />} />
          <Route path='/:project_name/samples' element={<SamplePage />} />
          <Route path='/:project_name/:sample_name/Analysis' element={<AnalysisPage />} />
          <Route path='/image-test' element={<ImageComponent imagePath={'project_1/sample_1/AxioScope/21_GR_14Y_XPL_Cleavage_Zoning.jpg'} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
