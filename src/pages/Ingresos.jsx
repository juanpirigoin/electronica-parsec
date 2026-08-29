import React, { useState } from 'react';
import { Plus, Search, Edit2, Trash2, FileText, Image as ImageIcon } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Modal } from '../components/common/Modal';
import { generarRemitoPDF } from '../services/pdfService';
import styles from './Ingresos.module.css';

export const Ingresos = () => {
  const { ingresos, clientes, addIngreso, updateIngreso, deleteIngreso } = useApp();

  const [busqueda, setBusqueda] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('Todos');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIngreso, setEditingIngreso] = useState(null);

  // Form State
  const initialFormState = {
    clienteId: '',
    clienteNombre: '',
    equipo: '',
    marca: '',
    modelo: '',
    numeroSerie: '',
    fallaReportada: '',
    imageUrl: '', // Campo para link de imagen
    estado: 'Pendiente',
    presupuesto: 0,
    observaciones: ''
  };

  const [formData, setFormData] = useState(initialFormState);

  const handleOpenModal = (ingreso = null) => {
    if (ingreso) {
      setEditingIngreso(ingreso);
      setFormData(ingreso);
    } else {
      setEditingIngreso(null);
      setFormData({
        ...initialFormState,
        clienteId: clientes[0]?.id || '',
        clienteNombre: clientes[0]?.nombre || ''
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingIngreso(null);
    setFormData(initialFormState);
  };

  const handleClienteChange = (e) => {
    const selectedId = e.target.value;
    const selectedClient = clientes.find((c) => c.id === selectedId);
    setFormData({
      ...formData,
      clienteId: selectedId,
      clienteNombre: selectedClient ? selectedClient.nombre : ''
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingIngreso) {
      updateIngreso(editingIngreso.id, formData);
    } else {
      addIngreso(formData);
    }
    handleCloseModal();
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Está seguro de eliminar esta orden de ingreso?')) {
      deleteIngreso(id);
    }
  };

  // Filtrado de la lista
  const ingresosFiltrados = ingresos.filter((item) => {
    const coincideBusqueda =
      item.id.toLowerCase().includes(busqueda.toLowerCase()) ||
      item.clienteNombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      item.equipo.toLowerCase().includes(busqueda.toLowerCase()) ||
      item.modelo.toLowerCase().includes(busqueda.toLowerCase());

    const coincideEstado =
      filtroEstado === 'Todos' || item.estado === filtroEstado;

    return coincideBusqueda && coincideEstado;
  });

  const getBadgeClass = (estado) => {
    switch (estado) {
      case 'Pendiente':
        return 'badge-pendiente';
      case 'En Reparación':
        return 'badge-en-reparacion';
      case 'Listo':
        return 'badge-listo';
      case 'Entregado':
        return 'badge-entregado';
      default:
        return '';
    }
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Ingresos de Artefactos</h1>
          <p className="page-subtitle">
            Gestión y seguimiento de equipos ingresados al taller
          </p>
        </div>
        <button className="btn btn-primary" onClick={() => handleOpenModal()}>
          <Plus size={18} />
          Nuevo Ingreso
        </button>
      </div>

      <div className={styles.controls}>
        <div className={styles.searchGroup}>
          <input
            type="text"
            placeholder="Buscar por N° Orden, cliente, equipo o modelo..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className={styles.searchInput}
          />
          <select
            value={filtroEstado}
            onChange={(e) => setFiltroEstado(e.target.value)}
            className={styles.selectFilter}
          >
            <option value="Todos">Todos los Estados</option>
            <option value="Pendiente">Pendiente</option>
            <option value="En Reparación">En Reparación</option>
            <option value="Listo">Listo</option>
            <option value="Entregado">Entregado</option>
          </select>
        </div>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>N° Orden</th>
              <th>Fecha</th>
              <th>Cliente</th>
              <th>Artefacto / Modelo</th>
              <th>Estado</th>
              <th>Presupuesto</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {ingresosFiltrados.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', color: '#64748b', padding: '2rem' }}>
                  No se encontraron ingresos registrados.
                </td>
              </tr>
            ) : (
              ingresosFiltrados.map((item) => (
                <tr key={item.id}>
                  <td style={{ fontWeight: '600' }}>{item.id}</td>
                  <td>{item.fechaIngreso}</td>
                  <td>{item.clienteNombre}</td>
                  <td>
                    <div><strong>{item.equipo}</strong></div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                      {item.marca} {item.modelo}
                    </div>
                  </td>
                  <td>
                    <span className={`badge ${getBadgeClass(item.estado)}`}>
                      {item.estado}
                    </span>
                  </td>
                  <td>${Number(item.presupuesto).toLocaleString('es-AR')}</td>
                  <td>
                    <div className={styles.actionsCell}>
                      <button
                        className={styles.iconBtn}
                        title="Generar Remito PDF"
                        onClick={() => generarRemitoPDF(item)}
                      >
                        <FileText size={18} />
                      </button>
                      <button
                        className={styles.iconBtn}
                        title="Editar Ingreso"
                        onClick={() => handleOpenModal(item)}
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        className={`${styles.iconBtn} ${styles.iconBtnDanger}`}
                        title="Eliminar Ingreso"
                        onClick={() => handleDelete(item.id)}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Formulario Ingreso */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingIngreso ? `Editar Ingreso ${editingIngreso.id}` : 'Registrar Nuevo Ingreso'}
      >
        <form onSubmit={handleSubmit}>
          <div className={styles.formGrid}>
            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label>Cliente</label>
              <select
                value={formData.clienteId}
                onChange={handleClienteChange}
                required
              >
                <option value="">Seleccionar Cliente...</option>
                {clientes.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.nombre} ({c.telefono})
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.formGroup}>
              <label>Artefacto / Nombre Equipo</label>
              <input
                type="text"
                placeholder="Ej. Televisor Smart TV 55"
                value={formData.equipo}
                onChange={(e) => setFormData({ ...formData, equipo: e.target.value })}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label>Marca</label>
              <input
                type="text"
                placeholder="Ej. Samsung"
                value={formData.marca}
                onChange={(e) => setFormData({ ...formData, marca: e.target.value })}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label>Modelo</label>
              <input
                type="text"
                placeholder="Ej. UN55NU7100"
                value={formData.modelo}
                onChange={(e) => setFormData({ ...formData, modelo: e.target.value })}
              />
            </div>

            <div className={styles.formGroup}>
              <label>N° Serie</label>
              <input
                type="text"
                placeholder="Ej. SN-99887711"
                value={formData.numeroSerie}
                onChange={(e) => setFormData({ ...formData, numeroSerie: e.target.value })}
              />
            </div>

            <div className={styles.formGroup}>
              <label>Estado</label>
              <select
                value={formData.estado}
                onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
              >
                <option value="Pendiente">Pendiente</option>
                <option value="En Reparación">En Reparación</option>
                <option value="Listo">Listo</option>
                <option value="Entregado">Entregado</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label>Presupuesto Estimado ($)</label>
              <input
                type="number"
                min="0"
                value={formData.presupuesto}
                onChange={(e) => setFormData({ ...formData, presupuesto: Number(e.target.value) })}
              />
            </div>

            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label>Falla Reportada</label>
              <textarea
                rows="3"
                placeholder="Detalle la falla reportada por el cliente..."
                value={formData.fallaReportada}
                onChange={(e) => setFormData({ ...formData, fallaReportada: e.target.value })}
                required
              />
            </div>

            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label>Link de Imagen del Artefacto (URL)</label>
              <input
                type="url"
                placeholder="https://ejemplo.com/imagen-artefacto.jpg"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              />
              {formData.imageUrl && (
                <img
                  src={formData.imageUrl}
                  alt="Vista previa"
                  className={styles.imagePreview}
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              )}
            </div>

            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label>Observaciones Adicionales</label>
              <input
                type="text"
                placeholder="Ej. Incluye cargador, detalles estéticos..."
                value={formData.observaciones}
                onChange={(e) => setFormData({ ...formData, observaciones: e.target.value })}
              />
            </div>
          </div>

          <div className={styles.formActions}>
            <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary">
              {editingIngreso ? 'Guardar Cambios' : 'Registrar Ingreso'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
