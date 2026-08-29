import React, { useState } from 'react';
import { Plus, Edit2, Trash2, BookOpen, ExternalLink } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Modal } from '../components/common/Modal';
import styles from './HistorialTecnico.module.css';

export const HistorialTecnico = () => {
  const { historial, addHistorial, updateHistorial, deleteHistorial } = useApp();

  const [busqueda, setBusqueda] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);

  const initialFormState = {
    marca: '',
    modelo: '',
    fallaTipo: '',
    diagnosticoFalla: '',
    solucion: '',
    componentesReemplazados: '',
    imageUrl: '' // Campo para link de diagrama o foto
  };

  const [formData, setFormData] = useState(initialFormState);

  const handleOpenModal = (record = null) => {
    if (record) {
      setEditingRecord(record);
      setFormData(record);
    } else {
      setEditingRecord(null);
      setFormData(initialFormState);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingRecord(null);
    setFormData(initialFormState);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingRecord) {
      updateHistorial(editingRecord.id, formData);
    } else {
      addHistorial(formData);
    }
    handleCloseModal();
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Está seguro de eliminar este registro del historial técnico?')) {
      deleteHistorial(id);
    }
  };

  const historialFiltrado = historial.filter((item) => {
    const q = busqueda.toLowerCase();
    return (
      item.marca.toLowerCase().includes(q) ||
      item.modelo.toLowerCase().includes(q) ||
      item.fallaTipo.toLowerCase().includes(q) ||
      item.diagnosticoFalla.toLowerCase().includes(q) ||
      item.solucion.toLowerCase().includes(q)
    );
  });

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Historial Técnico y Soluciones</h1>
          <p className="page-subtitle">
            Base de conocimiento de fallas frecuentes, soluciones y diagramas por modelo
          </p>
        </div>
        <button className="btn btn-primary" onClick={() => handleOpenModal()}>
          <Plus size={18} />
          Nuevo Registro Técnico
        </button>
      </div>

      <div className={styles.controls}>
        <input
          type="text"
          placeholder="Buscar por marca, modelo, síntoma de falla o solución..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className={styles.searchInput}
        />
      </div>

      {historialFiltrado.length === 0 ? (
        <div style={{ textAlign: 'center', color: '#64748b', padding: '3rem', backgroundColor: 'white', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
          No se encontraron registros en la base de conocimiento técnico.
        </div>
      ) : (
        <div className={styles.historyGrid}>
          {historialFiltrado.map((item) => (
            <div key={item.id} className={styles.card}>
              <div>
                <div className={styles.cardHeader}>
                  <div className={styles.modelTitle}>
                    {item.modelo}
                  </div>
                  <span className={styles.brandBadge}>{item.marca}</span>
                </div>

                <div className={styles.sectionTitle}>Síntoma / Falla</div>
                <div className={styles.cardText} style={{ fontWeight: '600', color: '#0f172a' }}>
                  {item.fallaTipo}
                </div>

                <div className={styles.sectionTitle}>Diagnóstico Técnico</div>
                <div className={styles.cardText}>{item.diagnosticoFalla}</div>

                <div className={styles.sectionTitle}>Solución Aplicada</div>
                <div className={styles.cardText}>{item.solucion}</div>

                {item.componentesReemplazados && (
                  <>
                    <div className={styles.sectionTitle}>Componentes Reemplazados</div>
                    <div className={styles.componentsText}>{item.componentesReemplazados}</div>
                  </>
                )}

                {item.imageUrl && (
                  <>
                    <div className={styles.sectionTitle}>Esquema / Diagrama</div>
                    <a
                      href={item.imageUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontSize: '0.8rem', color: '#3b82f6', display: 'inline-flex', alignItems: 'center', gap: '0.2rem' }}
                    >
                      <ExternalLink size={12} /> Ver enlace de imagen o circuito
                    </a>
                  </>
                )}
              </div>

              <div className={styles.cardFooter}>
                <span className={styles.dateText}>Registrado: {item.fechaRegistro || '-'}</span>
                <div className={styles.cardActions}>
                  <button
                    className={styles.iconBtn}
                    title="Editar Registro"
                    onClick={() => handleOpenModal(item)}
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    className={`${styles.iconBtn} ${styles.iconBtnDanger}`}
                    title="Eliminar Registro"
                    onClick={() => handleDelete(item.id)}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Formulario Historial Técnico */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingRecord ? 'Editar Registro Técnico' : 'Agregar Solución Técnica al Historial'}
      >
        <form onSubmit={handleSubmit}>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label>Marca</label>
              <input
                type="text"
                placeholder="Ej. Samsung, HP, Sony"
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
                required
              />
            </div>

            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label>Tipo de Falla / Síntoma</label>
              <input
                type="text"
                placeholder="Ej. Sin Imagen / Pantalla Negra"
                value={formData.fallaTipo}
                onChange={(e) => setFormData({ ...formData, fallaTipo: e.target.value })}
                required
              />
            </div>

            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label>Diagnóstico Causa Raíz</label>
              <textarea
                rows="2"
                placeholder="Detalle causa eléctrica o mecánica de la falla..."
                value={formData.diagnosticoFalla}
                onChange={(e) => setFormData({ ...formData, diagnosticoFalla: e.target.value })}
                required
              />
            </div>

            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label>Solución Efectuada</label>
              <textarea
                rows="3"
                placeholder="Procedimiento de reparación realizado..."
                value={formData.solucion}
                onChange={(e) => setFormData({ ...formData, solucion: e.target.value })}
                required
              />
            </div>

            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label>Componentes / Repuestos Reemplazados</label>
              <input
                type="text"
                placeholder="Ej. Kit Tiras LED, Cap 1000uF 25V, Transistor IRF640..."
                value={formData.componentesReemplazados}
                onChange={(e) => setFormData({ ...formData, componentesReemplazados: e.target.value })}
              />
            </div>

            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label>Link de Esquema / Imagen de Circuito (URL)</label>
              <input
                type="url"
                placeholder="https://ejemplo.com/diagrama-circuito.jpg"
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
          </div>

          <div className={styles.formActions}>
            <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary">
              {editingRecord ? 'Guardar Cambios' : 'Guardar Registro'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
