/* eslint-disable react/prop-types */
import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

function VisualChart({ data }) {
  return (
    <div style={{ height: '500px', width: '500px', margin: 'auto' }}>
      <Pie data={data} />
    </div>
  );
}

export default VisualChart;
