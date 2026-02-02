import React from 'react';
import { Link, useRouteError } from 'react-router-dom';

const NotFound = () => {
  const error = useRouteError(); //Access error details if thrown by router.
  
  return (
    <div className="not-found">
      <h2>404 - Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>
      {/* Display proper error details if available.*/}
      {error && <p><i>{error.statusText || error.message}</i></p>}
      <Link to="/">Go back Home</Link>
    </div>
  );
};

export default NotFound;