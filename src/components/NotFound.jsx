import React from 'react';
import { Link, useRouteError } from 'react-router-dom';

const NotFound = () => {
  const error = useRouteError(); //Access error details if thrown by router.
  
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1 className="error-code">404</h1>
        <h2>Page Not Found</h2>
        <p>Oops! The page you are looking for does not exist.</p>
        
        {/* Display proper error details if available. */}
        {error && (
          <div className="error-details">
            <i>{error.statusText || error.message}</i>
          </div>
        )}
        
        <Link to="/" className="back-home-btn">Back to Home</Link>
      </div>
    </div>
  );
};

export default NotFound;