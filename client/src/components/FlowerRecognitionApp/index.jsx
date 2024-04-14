import React, { useState } from 'react';
import axios from 'axios';

const FlowerRecognitionApp = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [classificationResult, setClassificationResult] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select an image.');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await axios.post('http://localhost:5000/predict', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setClassificationResult(`The image belongs to ${response.data.flower_name} with a score of ${response.data.probability.toFixed(2)}%`);
    } catch (error) {
      console.error('Prediction failed:', error);
      setClassificationResult('Prediction failed. Please try again.');
    }
  };

  return (
    <div>
      <h1>Flower Recognition App</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {classificationResult && <p>{classificationResult}</p>}
    </div>
  );
};

export default FlowerRecognitionApp;
