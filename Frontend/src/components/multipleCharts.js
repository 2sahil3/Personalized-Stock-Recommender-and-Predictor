import Chart from 'react-apexcharts';
import React, { useState, useEffect } from "react";


const CandlestickChart = ({candleStickData, }) => {
  const [selectedIndicators, setSelectedIndicators] = useState(["Close Price"]);

  const adxData = [110,120,130,135,130,122,121,110,111,100];
  const MA = [
    {
      x: new Date('2022-01-01').getTime(),
      y: null,
    },
    {
      x: new Date('2022-01-02').getTime(),
      y: 145,
    },
    {
      x: new Date('2022-01-03').getTime(),
      y: 155,
    },
    {
      x: new Date('2022-01-04').getTime(),
      y: 165,
    },
    {
      x: new Date('2022-01-05').getTime(),
      y: 155,
    },
    {
      x: new Date('2022-01-06').getTime(),
      y: 145,
    },
    {
      x: new Date('2022-01-07').getTime(),
      y: 140,
    },
    {
      x: new Date('2022-01-08').getTime(),
      y: 130,
    },
    {
      x: new Date('2022-01-09').getTime(),
      y: 123,
    },
    {
      x: new Date('2022-01-10').getTime(),
      y: 110,
    },
  ]
  const OHLC = [
    {
      x: new Date('2022-01-01').getTime(),
      y: [120, 150, 100, 110],
    },
    {
      x: new Date('2022-01-02').getTime(),
      y: [140, 160, 120, 150],
    },
    {
      x: new Date('2022-01-03').getTime(),
      y: [130, 170, 120, 160],
    },
    {
      x: new Date('2022-01-04').getTime(),
      y: [160, 180, 140, 170],
    },
    {
      x: new Date('2022-01-05').getTime(),
      y: [150, 170, 130, 160],
    },
    {
      x: new Date('2022-01-06').getTime(),
      y: [120, 150, 100, 110],
    },
    {
      x: new Date('2022-01-07').getTime(),
      y: [120, 150, 100, 110],
    },
    {
      x: new Date('2022-01-08').getTime(),
      y: [120, 150, 100, 110],
    },
    {
      x: new Date('2022-01-09').getTime(),
      y: [120, 150, 100, 110],
    },
    {
      x: new Date('2022-01-10').getTime(),
      y: [120, 150, 100, 110],
    },
  ]

  //original
  const [chartData,setChartData] = useState({
    options: {
      chart: {
        type: 'line',
        height: 350,
      },
      xaxis: {
        type: 'datetime',
        categories: [
          new Date('2022-01-01').getTime(),
          new Date('2022-01-02').getTime(),
          new Date('2022-01-03').getTime(),
          new Date('2022-01-04').getTime(),
          new Date('2022-01-05').getTime(),
          new Date('2022-01-06').getTime(),
          new Date('2022-01-07').getTime(),
          new Date('2022-01-08').getTime(),
          new Date('2022-01-09').getTime(),
          new Date('2022-01-10').getTime(),
          new Date('2022-01-11').getTime(),
          new Date('2022-01-12').getTime(),
          new Date('2022-01-13').getTime(),
        ],
      },
      yaxis: {
              labels: {
                formatter: function (val) {
                  return val.toFixed(2); // Adjust decimal places as needed
                },
              },
            },
      tooltip: {
        x: {
          format: 'dd/MM/yy',
        },
      },
    },
    series: [
      {
        name: 'Candlestick',
        type: 'candlestick',
        data: OHLC,
        yaxis:0,
      },
      
    ],
  });

  const handleIndicatorChange = (indicator) => {
    if (selectedIndicators.includes(indicator)) {
      setSelectedIndicators(
        selectedIndicators.filter((item) => item !== indicator)
      );
    } else {
      setSelectedIndicators([...selectedIndicators, indicator]);
    }
  };

  useEffect(() => {
    const updatedSeries = [];

    if (selectedIndicators.includes("Close Price")) {
      updatedSeries.push({
        name: "Close Price",
        type:'candlestick',
        data: OHLC,
        yaxis:0, // Dummy data, replace with actual data
      });
    }

    if (selectedIndicators.includes("MA")) {
      updatedSeries.push({
        name: "ADX",
        type:'line',
        data: MA,
        yaxis:0,
      });
    }

    setChartData((prevState) => ({ ...prevState, series: updatedSeries }));
  }, [selectedIndicators]);

//{
//   name: 'Moving Average',
//   type: 'line',
//   data: MA,
//   yaxis: 0,
// },


  return (
    <div>
    <div>
        <input
          type="checkbox"
          id="closePriceCheckbox"
          checked={selectedIndicators.includes("Close Price")}
          onChange={() => handleIndicatorChange("Close Price")}
        />
        <label htmlFor="closePriceCheckbox">Close Price</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="adxCheckbox"
          checked={selectedIndicators.includes("MA")}
          onChange={() => handleIndicatorChange("MA")}
        />
        <label htmlFor="adxCheckbox">MA</label>
      </div>
      <h2>Candlestick Chart with Moving Average Line</h2>
      <Chart options={chartData.options} series={chartData.series} type="line" height={350} />
    </div>
  );
};

export default CandlestickChart;
