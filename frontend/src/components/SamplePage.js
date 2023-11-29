import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { getSamplesByProject } from '../api/apiClient';
import SampleForm from './SampleForm';
import './SamplePage.css';

const SamplePage = () => {
    const { project_name } = useParams();
    const [samples, setSamples] = useState([]);
    const [isSampleFormOpen, setSampleFormOpen] = useState(false);

  useEffect(() => {
    // Fetch samples for the selected project when the component mounts
    async function fetchSamples() {
      try {
        const samplesData = await getSamplesByProject(project_name);
        setSamples(samplesData);
      } catch (error) {
        console.error('Error fetching samples:', error);
      }
    }

    fetchSamples();
  }, [project_name]);

    return (
        <div className='center'>
          <button className='btn addSampleButton' onClick={() => setSampleFormOpen(true)}>
            Add Sample
          </button>
          <SampleForm isOpen={isSampleFormOpen} onClose={() => setSampleFormOpen(false)} />
          
            <div className='table-container'>
                <table className="table">
                <thead>
                    <tr>
                    <th>Sample Name</th>
                    <th>Sampling Locality</th>
                    <th>Date Sampled</th>
                    <th>Student Samplers</th>
                    <th>Notes</th>
                    </tr>
                </thead>
                <tbody>
                    {samples.map((sample) => (
                    <tr key={sample.sample_name}>
                        <td>
                            <Link to={`/${project_name}/${sample.sample_name}/Analysis`}>{sample.sample_name}</Link>
                        </td>
                        <td>{sample.sampling_locality}</td>
                        <td>{new Date(sample.year_sampled).toLocaleDateString()}</td>
                        <td>{sample.student_samplers.map((sampler) => (<p>{sampler}</p>))}</td>
                        <td>{sample.notes}</td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
        </div>
    );

};

export default SamplePage;
