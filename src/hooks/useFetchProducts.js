import { useState, useEffect } from 'react';

const useFetchProducts = (url) => {
  //Initialized state to hold the product list.
  const [data, setData] = useState([]);

  useEffect(() => {
    //Defined the async fetch function.
    const fetchData = async () => {
      //Basic fetch without error handling (added in next commit).
      const response = await fetch(url);
      const result = await response.json();
      
      //Update state with the 'products' array from the API response.
      setData(result.products); 
    };

    //Call the function
    fetchData();
  }, [url]); //Re-run if the URL changes.

  //Return the data so components can use it.
  return { data };
};

export default useFetchProducts;