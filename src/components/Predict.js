import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Plot from 'react-plotly.js';
import axios from 'axios';
import Sidebar from "./Sidebar/Sidebar";
import { Alert } from '@mui/material';

const Predict = () => {
  const { itemId } = useParams();
  const [predictionData, setPredictionData] = useState(null);
  const [showWarning] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/predict/${itemId}`);
        setPredictionData(response.data);
      } catch (error) {
        console.error('Error fetching prediction data:', error);
        // Handle the error as needed
      }
    };

    fetchData();
  }, [itemId]);

  const formatDates = (dates) => {
    return dates.map(dateString => {
      const date = new Date(dateString);
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      return `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
    });
  };

  const renderPlot = () => {
    if (!predictionData) {
      return (
        <div style={{ textAlign: 'center', marginTop: '20px', fontWeight: 'bold' }}>
          {showWarning && (
            <Alert severity="info" style={{ marginBottom: '15px', background: 'pink', fontWeight: 'bold', width: '145%' }}>
              Loading... You must first go to the Dataset page, upload your Dataset, then press the Process button in the table, and then come to see the prediction result clearly.
            </Alert>
          )}
        </div>
      );
    }

    const { actual_dates, actual_orders, predicted_dates, predicted_orders } = predictionData;

    const formattedActualDates = formatDates(actual_dates);
    const formattedPredictedDates = formatDates(predicted_dates);

    const plotData = [
      {
        x: formattedActualDates,
        y: actual_orders,
        type: 'scatter',
        mode: 'lines+markers',
        name: 'Actual Orders',
      },
      {
        x: formattedPredictedDates,
        y: predicted_orders,
        type: 'scatter',
        mode: 'lines+markers',
        name: 'Predicted Orders',
      },
    ];

    const layout = {
      title: `Actual vs Predicted for Product ${itemId}`,
      width: 1150,
      height: 620,
      xaxis: {
        automargin: true,
        tickfont: {
          family: 'Open Sans, sans-serif',
          size: 13,
        },
      },
    };

    return <Plot data={plotData} layout={layout} />;
  };

  return (
    <div className='Predict'>
      <Sidebar />
      <div style={{ maxWidth: '800px', margin: '30px 320px' }}>
        {renderPlot()}
      </div>
    </div>
  );
};

export default Predict;
