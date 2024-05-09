import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SelectedCompanies from '../../components/SelectedCompanies.js';
import {getTopStocks} from '../../helpers/utilityFunctions.js'
import News from '../../components/News.js';
import TradingView from '../../components/TradingView.js';

const ShortTermComponent = () => {
  const [stocks, setStocks] = useState();
  const [topStocks,setTopStocks] = useState(null);
  const [companyData,setCompanydata] = useState(null);
  const [ohlc,setOHLC] = useState(null);
  const [selectedStock,setSelectedStock] = useState('BANK');
  const onCompanyClick = (ticker)=>{
    console.log(`onCompanyClick called : ${ticker}`);
    const fetchData = async ()=>{
      try {
        setSelectedStock(ticker); 
        const urlForIndicators = `http://localhost:5000/newsAndIndicators/${ticker}`;
        const resOfIndicators = await axios.get(urlForIndicators);
        setCompanydata(resOfIndicators.data);  
        const urlForOHLC = `http://localhost:5000/data/${ticker}.NS`;
        const resOfOHLC = await axios.get(urlForOHLC);
        // console.log( companyData.NEWS);
        setOHLC(resOfOHLC.data);
      } catch (error) {
        console.log('error in fetching stock data: ' + error);
      }
    }
    
    // console.log(url)
    fetchData();
  }

  useEffect(() => {
    // console.log("1st useEffect function called");
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/shortterm');
        setStocks(response.data);
        // console.log(stocks);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      
    };
    fetchData();
  }, []); // Empty dependency array to run the effect only once on mount
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
      <h1>Short Term Bullish Stocks</h1>
      {/* {console.log(stocks)} */}
      { topStocks ? (<>
        
        <SelectedCompanies topStocks={topStocks} onCompanyClick={onCompanyClick}></SelectedCompanies></>
      ) : (
        <p>...Selecting best companies for you !...</p>
      )}

<TradingView symbol={selectedStock}></TradingView>
      {
        companyData? (
          <>
            {/* <DynamicChart OHLC={ohlc} ADX = {companyData.ADX} BB={companyData.bb} WMA={companyData.WMA} RSI={companyData.RSI} TimeStamps={companyData.TimeStamp}></DynamicChart> */}
            <br></br>
            <News newsList={companyData.NEWS}></News>
          </>):(
          <>
            <p>...Loading company data...</p>
          </>)
      }

    </div>
  );
};

export default ShortTermComponent;
