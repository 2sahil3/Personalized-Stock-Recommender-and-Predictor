import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import {convertToXYData} from './../helpers/utilityFunctions.js'
const convertTimeStamps = (timeStamps) => {
  const result = timeStamps.map((timestamp) => {
    
    // return timestamp.toLocaleDateString('en-GB');
    return new Date(timestamp).getTime();
  });
  return result;
};

const removeNANBeforeParse = (strObject) =>{
  const sanitizedString = strObject.replace(/NaN/g, 'null');
  return sanitizedString;
}

const DynamicChart = ({ ADX, BB, OHLC, RSI, WMA, TimeStamps }) => {
  let categories = [];
  let upperBand = [];
  let lowerBand = [];
  let wma_13 = [];
  let wma_55 = [];
  let rsi = [];
  let convertedData = [];
  // Dummy data for ADX and Bollinger Bands
  const adxData = [null, 30, 28, 26, 34, 36, 40, 37, 43, 48];
  const upperBandData = [115, 120, 113, 109, 124, 117, 111, 100, 111, 140];
  const lowerBandData = [80, 83, 79, 90, 95, 100, 80, 82, 90, 111];

  // original data fetched from companyData
  try {
    const adx = JSON.parse(ADX);
    const bb = JSON.parse(removeNANBeforeParse(BB));
    upperBand = bb.Upper_Band;
    lowerBand = bb.Lower_Band;
    // console.log(upperBand);
    rsi = JSON.parse(RSI);
    const wma = JSON.parse(WMA);
    wma_13 = wma.WMA_13;
    wma_55 = wma.WMA_55;
    const timeStampsArray = JSON.parse(TimeStamps);
    categories = convertTimeStamps(timeStampsArray);
    convertedData = convertToXYData(timeStampsArray,rsi);
    
  } catch (error) {
    console.log(error);
  }

  // const adx = companyData
  console.log("-------");
  // console.log(TimeStamps);
  // console.log( OHLC);
  console.log("adx: ");
  console.log(rsi);
  console.log("Converted Data : ")
  console.log(convertedData);
  // console.log(ADX);
  // console.log(BB);
  // console.log(NEWS);
  // console.log(RSI);
  // console.log(WMA);
  // console.log(timeStamps);
  // console.log(OHLC);
  console.log("---------");

  const [selectedIndicators, setSelectedIndicators] = useState(["Close Price"]);
  const [chartData, setChartData] = useState({
    options: {
      chart: {
        type: "line",
        height: 350,
        toolbar: {
          show: true,
          offsetX: 0,
          offsetY: 0,
          tools: {
            download: true,
            selection: true,
            zoom: false,
            zoomin: true,
            zoomout: true,
            pan: true,
          },
          autoSelected: 'pan'
        },
      },
      grid: {
        row: {
            colors: ['#e5e5e5'],
            opacity: 0.4
        }, 
        column: {
            colors: ['#e5e5e5'],
            opacity: 0.4
        }, 
        xaxis: {
          lines: {
            show: true
          }
        },
      },

      tooltip: {
        x: {
          format: "dd/MM/yy",
        },
        y: {
          formatter: function (
            value,
            { series, seriesIndex, dataPointIndex, w }
          ) {
            if (value === null) {
              console.log(`null value encountered : ${series}`);
              return "No data";
            } else {
              return value.toFixed(2);
            }
          },
        },
      },
      xaxis: {
        type: 'datetime',
        categories: categories,
      },
      yaxis: {
        labels: {
          formatter: function (value) {
            return value.toFixed(2);
          },
        },
        tooltip: {
          enabled: true,
        },
      },
      
    },
    series: [
      {
        name: "candlestick",
        type: 'candlestick',
        data:OHLC,
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

  // Update chart data based on selected indicators
  useEffect(() => {
    const updatedSeries = [];

    if (selectedIndicators.includes("Close Price")) {
      updatedSeries.push({
        name: "Close Price",
        type:'candlestick',
        data: OHLC,
        yaxis:0, 
      });
    }

    if (selectedIndicators.includes("ADX")) {
      updatedSeries.push({
        name: "ADX",
        type:'line',
        data: convertedData,
        yaxis:0,
      });
    }

    if (selectedIndicators.includes("Upper Band")) {
      updatedSeries.push({
        name: "Upper Band",
        type:'line',
        data: upperBandData,
        yaxis:0,
      });
    }

    if (selectedIndicators.includes("Lower Band")) {
      updatedSeries.push({
        name: "Lower Band",
        type:'line',
        data: lowerBand,
        yaxis:0,
      });
    }
    if (selectedIndicators.includes("RSI")) {
      updatedSeries.push({
        name: "RSI",
        type:'line',
        data: rsi,
        yaxis:0,
      });
    }

    setChartData((prevState) => ({ ...prevState, series: updatedSeries }));
  }, [selectedIndicators]);

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
          checked={selectedIndicators.includes("ADX")}
          onChange={() => handleIndicatorChange("ADX")}
        />
        <label htmlFor="adxCheckbox">ADX</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="rsiCheckbox"
          checked={selectedIndicators.includes("RSI")}
          onChange={() => handleIndicatorChange("RSI")}
        />
        <label htmlFor="rsiCheckbox">RSI</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="upperBandCheckbox"
          checked={selectedIndicators.includes("Upper Band")}
          onChange={() => handleIndicatorChange("Upper Band")}
        />
        <label htmlFor="upperBandCheckbox">Upper Band</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="lowerBandCheckbox"
          checked={selectedIndicators.includes("Lower Band")}
          onChange={() => handleIndicatorChange("Lower Band")}
        />
        <label htmlFor="lowerBandCheckbox">Lower Band</label>
      </div>
      <Chart
        options={chartData.options}
        series={chartData.series}
        type="line"
        height={350}
      />
    </div>
  );
};

export default DynamicChart;
