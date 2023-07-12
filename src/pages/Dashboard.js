import React from 'react';
import VisualChart from 'components/VisualChart';

export const data = {
  labels: ['Income', 'Expense'],
  datasets: [
    {
      label: 'Amount ₹',
      data: [10000, 1000],
      backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)'],
      borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
      borderWidth: 1
    }
  ]
};
function Dashboard() {
  return (
    <>
      <h1>test</h1>
      <VisualChart data={data} />
    </>
  );
}

export default Dashboard;
