import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {getTopStocks} from '../../helpers/utilityFunctions.js'
import SelectedCompanies from '../../components/SelectedCompanies';
import DynamicChart from '../../components/DynamicChart.js';
import ohlcPrices from '../../helpers/indicatorsData.js'
import News from '../../components/News.js';
const MidTermComponent = () => {
  const [res, setRes] = useState(null);
  const [stocks, setStocks] = useState();
  const [topStocks,setTopStocks] = useState(null);
  const [companyData,setCompanydata] = useState(null);
  const [ohlc,setOHLC] = useState(null);


  const onCompanyClick = (ticker)=>{
    console.log(`onCompanyClick called : ${ticker}`);
    const fetchData = async ()=>{
      try {
        const urlForIndicators = `http://localhost:5000/newsAndIndicators/${ticker}`;
        const resOfIndicators = await axios.get(urlForIndicators);
        setCompanydata(resOfIndicators.data);  
        const urlForOHLC = `http://localhost:5000/data/${ticker}.NS`;
        const resOfOHLC = await axios.get(urlForOHLC);
        console.log( companyData.NEWS);
        setOHLC(resOfOHLC.data);
      } catch (error) {
        console.log('error in fetching stock data')
      }
    }
    
    // console.log(url)
    fetchData();
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/midterm');
        setStocks(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); 
  useEffect(()=>{
    // console.log("2nd useEffect function called");
    try {
      // setTopStocks(getTopStocks(response.data));
      setTopStocks(getTopStocks(stocks));
      // console.log(topStocks);
    } catch (error) {
      console.log(error);
    }
  },[stocks]);
  
  return (
    <div>
      <h1>Mid Term Bullish Stocks</h1>
      {/* {console.log(stocks)} */}
      { topStocks ? (<>
        
        <SelectedCompanies topStocks={topStocks} onCompanyClick={onCompanyClick}></SelectedCompanies></>
      ) : (
        <p>...Selecting best companies for you !...</p>
      )}
      {
        companyData? (
          <>
            <DynamicChart OHLC={ohlcPrices} ADX = {companyData.ADX} BB={companyData.bb} WMA={companyData.WMA} RSI={companyData.RSI} NEWS = {companyData.NEWS} TimeStamps={companyData.TimeStamp}></DynamicChart>
            <News newsList={companyData.NEWS}></News>
          </>):(
          <>
            <p>...Loading company data...</p>
          </>)
      }

    </div>
  );
};

export default MidTermComponent;
