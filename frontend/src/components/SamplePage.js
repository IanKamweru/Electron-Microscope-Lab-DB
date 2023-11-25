import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSamplesByProject } from '../api/apiClient';

const SamplePage = () => {
    const { project_name } = useParams();
    const [samples, setSamples] = useState([]);

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
            <div className='table-container'>
                <table className="table">
                <thead>
                    <tr>
                    <th>Sample Name</th>
                    <th>Sampling Locality</th>
                    <th>Year Sampled</th>
                    <th>Student Samplers</th>
                    <th>Notes</th>
                    </tr>
                </thead>
                <tbody>
                    {samples.map((sample) => (
                    <tr key={sample.sample_name}>
                        <td>{sample.sample_name}</td>
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
