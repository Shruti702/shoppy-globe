import React from 'react';
import Header from './components/Header';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <>
      <Header />
      <main className="main-content">
        {/*The Outlet component acts as a placeholder.*/}
        <Outlet />
      </main>
      {/*Footer displayed at the bottom of the layout.*/}
      <footer className="footer">© 2026 ShoppyGlobe</footer>
    </>
  );
}

export default App;