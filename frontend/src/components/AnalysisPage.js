// AnalysisPage.js

import React from 'react';
import { useParams } from 'react-router-dom';

const AnalysisPage = () => {
  const { project_name, sample_name } = useParams();

  return (
    <div>
      <h1>Analysis for Sample: {sample_name}</h1>
      {/* Placeholder for displaying analysis types and maps */}
      <p>Analysis Type 1: Map 1</p>
      <p>Analysis Type 2: Map 2</p>
      <p>Analysis Type 3: Map 3</p>
      <p>Analysis Type 4: Map 4</p>
    </div>
  );
};

export default AnalysisPage;
