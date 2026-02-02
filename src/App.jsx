import React from 'react';
import Header from './components/Header';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <>
      <Header />
      <main className="main-content">
        <Outlet />
      </main>
      <footer className="footer">© 2026 ShoppyGlobe</footer>
    </>
  );
}

export default App;