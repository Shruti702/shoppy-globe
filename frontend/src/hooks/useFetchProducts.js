import { useState, useEffect } from 'react';

//Custom hook.
const useFetchProducts = (url) => {
  //Initialized state to hold the product list.
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    //Defined the async fetch function.
    const fetchData = async () => {
      try {
        //Basic fetch without error handling.
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        const result = await response.json();
        //Update state with the 'products' array from the API response.
        setData(result.products); // DummyJSON returns.
      }
      catch(err){
        setError(err.message); //Handle errors gracefully. 
      }
      finally {
        setLoading(false);
      }
    };

     //Call the function.
    fetchData();
  }, [url]); //Re-run if the URL changes.

  return { data, loading, error };
};

export default useFetchProducts;