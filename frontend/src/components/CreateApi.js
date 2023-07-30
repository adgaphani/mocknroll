import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const CreateApi = () => {
  const [properties, setProperties] = useState([{ name: '', type: 'string' }]);
  const [numRecords, setNumRecords] = useState(1);
  const [apiName, setApiName] = useState('');
  const [apiEndpoint, setApiEndpoint] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleAddProperty = () => {
    setProperties([...properties, { name: '', type: 'string' }]);
  };

  const handlePropertyChange = (index, key, value) => {
    const updatedProperties = [...properties];
    updatedProperties[index][key] = value;
    setProperties(updatedProperties);
  };

  const SERVER_URL = 'http://localhost:3500';

  const handleGenerateAPI = async () => {
    try {
      const data = {
        apiName,
        properties,
        numRecords,
      };
  
      // Post the data to the server
      await axios.post(`${SERVER_URL}/api/createApi`, data);
  
      // Construct the endpoint URL
      const apiEndpoint = `${SERVER_URL}/api/${apiName}`;
      setApiEndpoint(apiEndpoint);
  
      setErrorMessage(''); // Clear any previous error message on successful generation
    } catch (error) {
      console.error('Error generating API:', error);
      setApiEndpoint('');
      setErrorMessage('Error generating API. Please try again.'); // Set error message on API generation failure
    }
  };

  return (
    <div className="d-flex justify-content-center">
      <div className="card w-50">
      <div className="card-body shadow-card">
          {properties.map((property, index) => (
            <div key={index} className="form-group">
              <input
                type="text"
                className="form-control"
                value={property.name}
                placeholder="Property Name"
                onChange={(e) => handlePropertyChange(index, 'name', e.target.value)}
              />
              <select
                className="form-control"x
                value={property.type}
                onChange={(e) => handlePropertyChange(index, 'type', e.target.value)}
              >
                <option value="string">String</option>
                <option value="number">Number</option>
                {/* Add other JSON-supported types here */}
              </select>
            </div>
          ))}
          <button className="btn btn-primary" onClick={handleAddProperty}>Add Property</button>
          <br />
          <div className="form-group" style={{ margin: '2px' }}>
            <label className="form-label" style={{ margin: '2px' }}>
              Number of Records:
              <input
                type="number"
                className="form-control"
                value={numRecords}
                onChange={(e) => setNumRecords(parseInt(e.target.value))}
                style={{ margin: '2px' }}
              />
            </label>
          </div>
          <div className="form-group" style={{ margin: '2px' }}>
            <label className="form-label" style={{ margin: '2px' }}>
              API Name:
              <input
                type="text"
                className="form-control"
                value={apiName}
                onChange={(e) => setApiName(e.target.value)}
              />
            </label>
          </div>
          <button className="btn btn-success" onClick={handleGenerateAPI}>Create API</button>

          {errorMessage && <p className="text-danger">{errorMessage}</p>}

          {apiEndpoint && (
            <div className="alert alert-success" role="alert">
              <p>API created successfully!</p>
              <p>API Endpoint: {apiEndpoint}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateApi;
