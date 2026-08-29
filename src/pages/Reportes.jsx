import React from 'react';
import { Wrench, CheckCircle, Clock, DollarSign, Users, BookOpen } from 'lucide-react';
import { useApp } from '../context/AppContext';
import styles from './Reportes.module.css';

export const Reportes = () => {
  const { ingresos, clientes, historial } = useApp();

  const totalIngresos = ingresos.length;
  const pendientes = ingresos.filter((i) => i.estado === 'Pendiente').length;
  const enReparacion = ingresos.filter((i) => i.estado === 'En Reparación').length;
  const listos = ingresos.filter((i) => i.estado === 'Listo').length;
  const entregados = ingresos.filter((i) => i.estado === 'Entregado').length;

  const ingresosTotalesEstimados = ingresos.reduce(
    (acc, item) => acc + (Number(item.presupuesto) || 0),
    0
  );

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Reportes y Estadísticas</h1>
          <p className="page-subtitle">
            Resumen de rendimiento operacional de Electrónica Parsec
          </p>
        </div>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ color: '#0284c7', backgroundColor: '#e0f2fe' }}>
            <Wrench size={24} />
          </div>
          <div>
            <div className={styles.statValue}>{totalIngresos}</div>
            <div className={styles.statLabel}>Total Equipos Ingresados</div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ color: '#d97706', backgroundColor: '#fef3c7' }}>
            <Clock size={24} />
          </div>
          <div>
            <div className={styles.statValue}>{pendientes + enReparacion}</div>
            <div className={styles.statLabel}>En Taller (Pendiente/Proceso)</div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ color: '#059669', backgroundColor: '#d1fae5' }}>
            <CheckCircle size={24} />
          </div>
          <div>
            <div className={styles.statValue}>{listos + entregados}</div>
            <div className={styles.statLabel}>Reparaciones Finalizadas</div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ color: '#4f46e5', backgroundColor: '#e0e7ff' }}>
            <DollarSign size={24} />
          </div>
          <div>
            <div className={styles.statValue}>
              ${ingresosTotalesEstimados.toLocaleString('es-AR')}
            </div>
            <div className={styles.statLabel}>Presupuestos Totales</div>
          </div>
        </div>
      </div>

      <div className={styles.reportsGrid}>
        <div className={styles.sectionBox}>
          <h3 className={styles.boxTitle}>Estado de Reparaciones</h3>

          <div className={styles.statusRow}>
            <span>Pendientes de diagnóstico</span>
            <span className="badge badge-pendiente">{pendientes} equipos</span>
          </div>

          <div className={styles.statusRow}>
            <span>En Reparación activos</span>
            <span className="badge badge-en-reparacion">{enReparacion} equipos</span>
          </div>

          <div className={styles.statusRow}>
            <span>Listos para retiro</span>
            <span className="badge badge-listo">{listos} equipos</span>
          </div>

          <div className={styles.statusRow}>
            <span>Entregados a cliente</span>
            <span className="badge badge-entregado">{entregados} equipos</span>
          </div>
        </div>

        <div className={styles.sectionBox}>
          <h3 className={styles.boxTitle}>Resumen General de Base de Datos</h3>

          <div className={styles.statusRow}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Users size={18} color="#64748b" />
              <span>Clientes Registrados</span>
            </div>
            <strong>{clientes.length} clientes</strong>
          </div>

          <div className={styles.statusRow}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <BookOpen size={18} color="#64748b" />
              <span>Fallas en Historial Técnico</span>
            </div>
            <strong>{historial.length} soluciones</strong>
          </div>
        </div>
      </div>
    </div>
  );
};
