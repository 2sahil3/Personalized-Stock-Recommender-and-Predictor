import React from "react";
import Chart from "react-apexcharts";
const data = {
  series: [
    {
      data: [
        ],
    }
  ],
  options: {
    chart: {
      type: "candlestick",
      height: 350,
    },
    
    xaxis: {
      title:{text:'date'},
      type: "datetime",
    },
    yaxis: {
      title: {
        text: 'Price'
      },
      tooltip: {
        enabled: true,
      },
    },
  },
};

const convertDate = (data) =>{
  const formattedData = data.map(item => ({
    x: new Date(item.x),
    y: item.y,
  }));

  return formattedData;
}

function Charting(prices) {
  
  data.series[0].data = prices.prices;
  console.log(data.series);
  return (
    <div>
      <Chart
        type="candlestick"
        height={400}
        options={data.options}
        series={data.series}
      />
    </div>
  );
}
export default Charting;