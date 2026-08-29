import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Ingresos } from './pages/Ingresos';
import { Clientes } from './pages/Clientes';
import { HistorialTecnico } from './pages/HistorialTecnico';
import { Reportes } from './pages/Reportes';
import './styles/global.css';

export function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <div className="app-container">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Ingresos />} />
              <Route path="/clientes" element={<Clientes />} />
              <Route path="/historial" element={<HistorialTecnico />} />
              <Route path="/reportes" element={<Reportes />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
