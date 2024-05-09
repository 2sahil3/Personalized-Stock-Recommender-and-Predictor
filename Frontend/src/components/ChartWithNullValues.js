import React from 'react';
import Chart from 'react-apexcharts';

const LineChartWithNullValues = () => {
  const options = {
    series: [{
      name: 'series1',
      data: [10,20,30,10,22,34]
    }, {
      name: 'series2',
      data: [null,null,55,49,30,20]
    }],
    chart: {
      type: 'line',
      height: 350,
      zoom: {
        enabled: false
      },
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth'
    },
    title: {
      text: 'Line with Null Values',
      align: 'left'
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'],
        opacity: 0.5
      },
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    },
    tooltip: {
      x: {
        format: 'dd/MM/yy HH:mm'
      },
      y: {
        formatter: function (value, { series, seriesIndex, dataPointIndex, w }) {
          if (value === null) {
            return 'No data';
          } else {
            return value;
          }
        }
      }
    }
  };

  return (
    <div id="chart">
      <Chart options={options} series={options.series} type="line" height={350} />
    </div>
  );
}

export default LineChartWithNullValues;
