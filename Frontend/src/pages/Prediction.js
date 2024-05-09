import React from 'react';
import Chart from 'react-apexcharts';
import Layout from '../components/layouts/Layout';

const Prediction = () => {
  // Mock data for demonstration
  const series = [
    {
      name: 'Actual Prices',
      data: [30, 40, 35, 50, 49, 60, 70, 91, 125,110,118,128,141,123,111,105]
    },
    {
      name: 'Predicted Prices',
      data: [null, null, null, null, null, null, null,null,null,null,null,null,null,null,null, 100, 130, 150,125,155,160,149,170]
    }
  ];

  const options = {
    chart: {
      type: 'line',
      height:400 //height donot have any difference apparently!
    },
    xaxis: {
      title:{text:'date'},
      categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28]
    },
    yaxis: {
      title: {
        text: 'Price'
      }
    }
  };

  return (
    <Layout>
    <div>
      <Chart options={options} series={series} type="line" height={400} />
    </div>
    </Layout>
  );
};

export default Prediction;
