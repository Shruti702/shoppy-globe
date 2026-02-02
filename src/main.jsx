import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store';
import App from './App';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

//Lazy loading components.
const ProductList = lazy(() => import('./components/ProductList'));
const ProductDetail = lazy(() => import('./components/ProductDetail'));
const Cart = lazy(() => import('./components/Cart'));
const Checkout = lazy(() => import('./components/Checkout'));
const NotFound = lazy(() => import('./components/NotFound'));

//Define Routes using the modern Data Router.
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    //Handle errors at the root level using Suspense for the lazy NotFound component.
    errorElement: <Suspense fallback={<div>Loading...</div>}><NotFound /></Suspense>,
    children: [
      {
        path: "/",
        //Suspense displays the fallback UI while the lazy component fetches.
        element: <Suspense fallback={<div>Loading Products...</div>}><ProductList /></Suspense>,
      },
      {
        path: "/product/:id", //Dynamic Route: ":id" will be captured by useParams hook.
        element: <Suspense fallback={<div>Loading Details...</div>}><ProductDetail /></Suspense>,
      },
      {
        path: "/cart",
        element: <Suspense fallback={<div>Loading Cart...</div>}><Cart /></Suspense>,
      },
      {
        path: "/checkout",
        element: <Suspense fallback={<div>Loading Checkout...</div>}><Checkout /></Suspense>,
      },
      {
        //Wildcard route (*) catches any undefined paths that slip through.
        path: "*",
        element: <Suspense fallback={<div>Loading...</div>}><NotFound /></Suspense>,
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/*Provider makes the Redux store available to the entire app component tree.*/}
    <Provider store={store}>
      {/*RouterProvider injects the routing logic configured above.*/}
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);