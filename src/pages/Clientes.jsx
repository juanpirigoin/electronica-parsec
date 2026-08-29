import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Phone, Mail, MapPin } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Modal } from '../components/common/Modal';
import styles from './Clientes.module.css';

export const Clientes = () => {
  const { clientes, addCliente, updateCliente, deleteCliente, ingresos } = useApp();

  const [busqueda, setBusqueda] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCliente, setEditingCliente] = useState(null);

  const initialFormState = {
    nombre: '',
    telefono: '',
    email: '',
    direccion: ''
  };

  const [formData, setFormData] = useState(initialFormState);

  const handleOpenModal = (cliente = null) => {
    if (cliente) {
      setEditingCliente(cliente);
      setFormData(cliente);
    } else {
      setEditingCliente(null);
      setFormData(initialFormState);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCliente(null);
    setFormData(initialFormState);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingCliente) {
      updateCliente(editingCliente.id, formData);
    } else {
      addCliente(formData);
    }
    handleCloseModal();
  };

  const handleDelete = (id) => {
    // Verificar si el cliente tiene ingresos asociados
    const tieneIngresos = ingresos.some((ing) => ing.clienteId === id);
    if (tieneIngresos) {
      alert('No se puede eliminar el cliente porque tiene ingresos de servicio asociados.');
      return;
    }

    if (window.confirm('¿Está seguro de eliminar este cliente?')) {
      deleteCliente(id);
    }
  };

  const clientesFiltrados = clientes.filter((item) => {
    return (
      item.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      item.telefono.includes(busqueda) ||
      item.email.toLowerCase().includes(busqueda.toLowerCase())
    );
  });

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Directorio de Clientes</h1>
          <p className="page-subtitle">
            Administración de datos de contacto e historial de clientes
          </p>
        </div>
        <button className="btn btn-primary" onClick={() => handleOpenModal()}>
          <Plus size={18} />
          Nuevo Cliente
        </button>
      </div>

      <div className={styles.controls}>
        <input
          type="text"
          placeholder="Buscar cliente por nombre, teléfono o email..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className={styles.searchInput}
        />
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Nombre / Razón Social</th>
              <th>Contacto</th>
              <th>Email</th>
              <th>Dirección</th>
              <th>Fecha Registro</th>
              <th>Equipos Atendidos</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clientesFiltrados.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', color: '#64748b', padding: '2rem' }}>
                  No se encontraron clientes registrados.
                </td>
              </tr>
            ) : (
              clientesFiltrados.map((item) => {
                const totalEquipos = ingresos.filter((ing) => ing.clienteId === item.id).length;
                return (
                  <tr key={item.id}>
                    <td style={{ fontWeight: '600' }}>{item.nombre}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <Phone size={14} color="#64748b" />
                        {item.telefono}
                      </div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <Mail size={14} color="#64748b" />
                        {item.email || '-'}
                      </div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <MapPin size={14} color="#64748b" />
                        {item.direccion || '-'}
                      </div>
                    </td>
                    <td>{item.fechaRegistro || '-'}</td>
                    <td>
                      <span className="badge" style={{ backgroundColor: '#f1f5f9', color: '#334155' }}>
                        {totalEquipos} equipo(s)
                      </span>
                    </td>
                    <td>
                      <div className={styles.actionsCell}>
                        <button
                          className={styles.iconBtn}
                          title="Editar Cliente"
                          onClick={() => handleOpenModal(item)}
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          className={`${styles.iconBtn} ${styles.iconBtnDanger}`}
                          title="Eliminar Cliente"
                          onClick={() => handleDelete(item.id)}
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Formulario Cliente */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingCliente ? 'Editar Cliente' : 'Registrar Nuevo Cliente'}
      >
        <form onSubmit={handleSubmit}>
          <div className={styles.formGrid}>
            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label>Nombre / Razón Social</label>
              <input
                type="text"
                placeholder="Ej. Juan Pérez"
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label>Teléfono de Contacto</label>
              <input
                type="text"
                placeholder="Ej. 11-4567-8901"
                value={formData.telefono}
                onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label>Correo Electrónico</label>
              <input
                type="email"
                placeholder="Ej. cliente@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label>Dirección</label>
              <input
                type="text"
                placeholder="Ej. Av. Corrientes 1234, CABA"
                value={formData.direccion}
                onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
              />
            </div>
          </div>

          <div className={styles.formActions}>
            <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary">
              {editingCliente ? 'Guardar Cambios' : 'Registrar Cliente'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
