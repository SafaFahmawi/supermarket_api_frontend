import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import axios from 'axios';
import Sidebar from '../Sidebar/Sidebar';
import { Alert } from '@mui/material';

const Graphs = () => {
  const [plotData, setPlotData] = useState(null);
  const [showWarning, setShowWarning] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/orders');

        const formattedActualDates = formatDates(response.data.actual_dates);
        const formattedPredictedDates = formatDates(response.data.predicted_dates);

        setPlotData({
          ...response.data,
          actual_dates: formattedActualDates,
          predicted_dates: formattedPredictedDates,
        });

        // Hide the warning after 3 seconds (adjust the time as needed)
        setTimeout(() => {
          setShowWarning(false);
        }, 3000);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const formatDates = (dates) => {
    return dates.map(dateString => {
      const date = new Date(dateString);
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      return ` ${date.getDate()}  ${monthNames[date.getMonth()]}, ${date.getFullYear()}`;
    });
  };

  return (
    <div className='Graphs'>
      <Sidebar />
      <div style={{ maxWidth: '800px', margin: '30px 320px' }}>
        {plotData ? (
          <Plot
            data={[
              {
                x: plotData.actual_dates,
                y: plotData.actual_orders,
                name: 'Actual Orders',
              },
              {
                x: plotData.predicted_dates,
                y: plotData.predicted_orders,
                name: 'Predicted Orders',
              },
            ]}
            layout={{
              title: 'Actual vs Predicted Orders',
              width: 1150,
              height: 620,
              xaxis: {
                automargin: true,
                tickfont: {
                  family: 'Open Sans, sans-serif',
                  size: 13,
                },
              },
            }}
          />
        ) : (
          <div style={{ textAlign: 'center', marginTop: '20px', fontWeight: "bold" }}>
            {showWarning && (
              <Alert severity="info" style={{ marginBottom: "15px", background: "pink", fontWeight: "bold", width: "145%"}}>
                Loading... You must first go to the Dataset page, upload your Dataset, then press the Process button in the table, and then come to see the prediction result clearly.
              </Alert>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Graphs;