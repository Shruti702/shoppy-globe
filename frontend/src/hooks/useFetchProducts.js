import { useState, useEffect } from 'react';

const useFetchProducts = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching from:", url); // <--- DEBUG LOG 1
        const response = await fetch(url);
        
        console.log("Response Status:", response.status); // <--- DEBUG LOG 2
        
        if (!response.ok) {
           // Throw specific error based on status
           throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        
        const result = await response.json();
        console.log("Data received:", result); // <--- DEBUG LOG 3
        
        // Handle if backend sends { products: [...] } or just [...]
        setData(result.products || result); 
      }
      catch(err){
        console.error("Fetch Error:", err.message); // <--- DEBUG LOG 4
        setError(err.message);
      }
      finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useFetchProducts;