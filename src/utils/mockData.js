export const MOCK_CLIENTES = [
  {
    id: 'cli-1',
    nombre: 'Juan Pérez',
    telefono: '11-4567-8901',
    email: 'juan.perez@example.com',
    direccion: 'Av. Corrientes 1234, CABA',
    fechaRegistro: '2026-08-10'
  },
  {
    id: 'cli-2',
    nombre: 'María González',
    telefono: '11-9876-5432',
    email: 'maria.gonzalez@example.com',
    direccion: 'Calle San Martín 456, Lanús',
    fechaRegistro: '2026-08-15'
  },
  {
    id: 'cli-3',
    nombre: 'Laboratorios Tech SRL',
    telefono: '11-3333-4444',
    email: 'contacto@techsrl.com',
    direccion: 'Av. Belgrano 789, CABA',
    fechaRegistro: '2026-08-20'
  }
];

export const MOCK_INGRESOS = [
  {
    id: 'ING-1001',
    clienteId: 'cli-1',
    clienteNombre: 'Juan Pérez',
    equipo: 'Televisor Smart TV 55"',
    marca: 'Samsung',
    modelo: 'UN55NU7100',
    numeroSerie: 'SN-99887711',
    fallaReportada: 'Enciende pantalla con sonido pero sin imagen (backlight fallado).',
    imageUrl: '', // Campo para pegar link de imagen
    estado: 'En Reparación', // Pendiente, En Reparación, Listo, Entregado
    presupuesto: 45000,
    fechaIngreso: '2026-08-25',
    observaciones: 'Incluye control remoto y cable de alimentación original.'
  },
  {
    id: 'ING-1002',
    clienteId: 'cli-2',
    clienteNombre: 'María González',
    equipo: 'Notebook Pavilion 15',
    marca: 'HP',
    modelo: '15-cw1004la',
    numeroSerie: '5CD987654',
    fallaReportada: 'No carga la batería y se apaga intempestivamente al mover la bisagra.',
    imageUrl: '',
    estado: 'Pendiente',
    presupuesto: 28000,
    fechaIngreso: '2026-08-28',
    observaciones: 'Se entrega sin cargador.'
  },
  {
    id: 'ING-1003',
    clienteId: 'cli-3',
    clienteNombre: 'Laboratorios Tech SRL',
    equipo: 'Amplificador de Audio Profesional',
    marca: 'Yamaha',
    modelo: 'P5000S',
    numeroSerie: 'YMH-33441',
    fallaReportada: 'Canal B entra en protección térmica inmediatamente al subir volumen.',
    imageUrl: '',
    estado: 'Listo',
    presupuesto: 62000,
    fechaIngreso: '2026-08-21',
    observaciones: 'Transistores de salida reemplazados.'
  }
];

export const MOCK_HISTORIAL = [
  {
    id: 'HIS-001',
    marca: 'Samsung',
    modelo: 'UN55NU7100',
    fallaTipo: 'Sin Imagen / Pantalla Negra',
    diagnosticoFalla: 'Regleta LED de retroiluminación en cortocircuito (LEDs de 6V quemados).',
    solucion: 'Reemplazo kit completo de tiras LED de aluminio y ajuste de corriente de fuente al 80%.',
    componentesReemplazados: 'Kit Tiras LED Samsung UN55NU7100 (2 tiras 40 LEDs)',
    imageUrl: '', // Campo para link de diagrama o circuito
    fechaRegistro: '2026-07-12'
  },
  {
    id: 'HIS-002',
    marca: 'HP',
    modelo: '15-cw1004la',
    fallaTipo: 'No Encendido / Carga',
    diagnosticoFalla: 'Pin de carga DC Jack fracturado internamente y fusible SMD abierto.',
    solucion: 'Reemplazo de conector DC Jack con cable harness y cambio de fusible SMD de 5A.',
    componentesReemplazados: 'DC Jack HP Pavilion 15, Fusible SMD 0805 5A',
    imageUrl: '',
    fechaRegistro: '2026-07-28'
  }
];
