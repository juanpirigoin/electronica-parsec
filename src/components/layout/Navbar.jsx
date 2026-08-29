import React from 'react';
import { NavLink } from 'react-router-dom';
import { Wrench, Users, BookOpen, BarChart3, Cpu } from 'lucide-react';
import styles from './Navbar.module.css';
import { useApp } from '../../context/AppContext';

export const Navbar = () => {
  const { usuario } = useApp();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.brand}>
        <div className={styles.brandIcon}>
          <Cpu size={22} />
        </div>
        <div>
          <div className={styles.brandTitle}>Parsec</div>
          <div className={styles.brandSubtitle}>Electrónica Parsec</div>
        </div>
      </div>

      <nav className={styles.nav}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${styles.navLink} ${isActive ? styles.active : ''}`
          }
        >
          <Wrench size={18} />
          <span>Ingresos de Artefactos</span>
        </NavLink>

        <NavLink
          to="/clientes"
          className={({ isActive }) =>
            `${styles.navLink} ${isActive ? styles.active : ''}`
          }
        >
          <Users size={18} />
          <span>Clientes</span>
        </NavLink>

        <NavLink
          to="/historial"
          className={({ isActive }) =>
            `${styles.navLink} ${isActive ? styles.active : ''}`
          }
        >
          <BookOpen size={18} />
          <span>Historial Técnico</span>
        </NavLink>

        <NavLink
          to="/reportes"
          className={({ isActive }) =>
            `${styles.navLink} ${isActive ? styles.active : ''}`
          }
        >
          <BarChart3 size={18} />
          <span>Reportes</span>
        </NavLink>
      </nav>

      <div className={styles.footer}>
        <div className={styles.userInfo}>{usuario.nombre}</div>
        <div>{usuario.taller} v1.0</div>
      </div>
    </aside>
  );
};
