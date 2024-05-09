

export const getTopStocks = (data) => {
    // Extract the data object from the response
  
    // Convert the data object to an array of objects with keys and values
    const dataArray = Object.entries(data).map(([key, value]) => ({ stock: key, value }));
  
    // Sort the array based on the values in descending order
    dataArray.sort((a, b) => b.value - a.value);
  
    // Get the top 5 stocks from the sorted array
    const topStocks = dataArray.slice(0, 5);    
    return topStocks;
  }

  export const convertToXYData = (TimeStamps, Indicator) => {
    const convertedData = TimeStamps.map((timestamp, index) => {
      
        return {
          x: new Date(timestamp).getTime(),
          y: Indicator[index],
        };
      
    }).filter(item => item !== null);

    console.log(convertedData);
    return convertedData;
    // Here you can use `convertedData` in your React component or set it in state
  };