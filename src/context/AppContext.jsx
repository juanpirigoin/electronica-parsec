import React, { createContext, useContext, useState, useEffect } from 'react';
import { MOCK_CLIENTES, MOCK_INGRESOS, MOCK_HISTORIAL } from '../utils/mockData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Configuración / Usuario
  const [usuario] = useState({
    nombre: 'Técnico Principal',
    taller: 'Electrónica Parsec',
    rol: 'Administrador'
  });

  // Clientes State
  const [clientes, setClientes] = useState(() => {
    const saved = localStorage.getItem('parsec_clientes');
    return saved ? JSON.parse(saved) : MOCK_CLIENTES;
  });

  // Ingresos (Ordenes de reparación) State
  const [ingresos, setIngresos] = useState(() => {
    const saved = localStorage.getItem('parsec_ingresos');
    return saved ? JSON.parse(saved) : MOCK_INGRESOS;
  });

  // Historial Técnico State
  const [historial, setHistorial] = useState(() => {
    const saved = localStorage.getItem('parsec_historial');
    return saved ? JSON.parse(saved) : MOCK_HISTORIAL;
  });

  // Persistir en LocalStorage
  useEffect(() => {
    localStorage.setItem('parsec_clientes', JSON.stringify(clientes));
  }, [clientes]);

  useEffect(() => {
    localStorage.setItem('parsec_ingresos', JSON.stringify(ingresos));
  }, [ingresos]);

  useEffect(() => {
    localStorage.setItem('parsec_historial', JSON.stringify(historial));
  }, [historial]);

  // CRUD CLIENTES
  const addCliente = (clienteData) => {
    const newCliente = {
      ...clienteData,
      id: `cli-${Date.now()}`,
      fechaRegistro: new Date().toISOString().split('T')[0]
    };
    setClientes((prev) => [newCliente, ...prev]);
  };

  const updateCliente = (id, updatedData) => {
    setClientes((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updatedData } : c))
    );
  };

  const deleteCliente = (id) => {
    setClientes((prev) => prev.filter((c) => c.id !== id));
  };

  // CRUD INGRESOS
  const addIngreso = (ingresoData) => {
    const newIngreso = {
      ...ingresoData,
      id: `ING-${Math.floor(1000 + Math.random() * 9000)}`,
      fechaIngreso: new Date().toISOString().split('T')[0]
    };
    setIngresos((prev) => [newIngreso, ...prev]);
  };

  const updateIngreso = (id, updatedData) => {
    setIngresos((prev) =>
      prev.map((ing) => (ing.id === id ? { ...ing, ...updatedData } : ing))
    );
  };

  const deleteIngreso = (id) => {
    setIngresos((prev) => prev.filter((ing) => ing.id !== id));
  };

  // CRUD HISTORIAL TÉCNICO
  const addHistorial = (historialData) => {
    const newRecord = {
      ...historialData,
      id: `HIS-${Math.floor(100 + Math.random() * 900)}`,
      fechaRegistro: new Date().toISOString().split('T')[0]
    };
    setHistorial((prev) => [newRecord, ...prev]);
  };

  const updateHistorial = (id, updatedData) => {
    setHistorial((prev) =>
      prev.map((h) => (h.id === id ? { ...h, ...updatedData } : h))
    );
  };

  const deleteHistorial = (id) => {
    setHistorial((prev) => prev.filter((h) => h.id !== id));
  };

  return (
    <AppContext.Provider
      value={{
        usuario,
        clientes,
        addCliente,
        updateCliente,
        deleteCliente,
        ingresos,
        addIngreso,
        updateIngreso,
        deleteIngreso,
        historial,
        addHistorial,
        updateHistorial,
        deleteHistorial
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp debe ser usado dentro de un AppProvider');
  }
  return context;
};
