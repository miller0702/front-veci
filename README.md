# Veci App - Aplicación de Recargas con React

## Tabla de Contenidos

- [Introducción](#introducción)
- [Características](#características)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Instalación](#instalación)
- [Uso](#uso)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Scripts Disponibles](#scripts-disponibles)

---

## Introducción

**Veci App** es una aplicación web basada en React que permite a los usuarios realizar recargas a móviles o servicios de forma eficiente. Los usuarios pueden iniciar sesión, seleccionar un proveedor de servicios, ingresar sus detalles y completar una recarga en unos pocos pasos.

El objetivo del proyecto es proporcionar una interfaz fácil de usar que facilite el proceso de recargas, integrando diferentes proveedores a través del API de Punto Red.

## Características

- Sistema de inicio de sesión para usuarios
- Recargas para servicios móviles y de utilidades
- Interfaz responsiva para dispositivos de escritorio y móviles
- Historial de transacciones para los usuarios
- Validación en tiempo real de los montos de recarga
- Manejo de errores y notificaciones

## Tecnologías Utilizadas

- **Frontend:**
  - React.js
  - React Router para la navegación
  - Context API para la gestión de estado
  - Axios para realizar peticiones a las APIs
  - Material-UI para el diseño de los componentes

- **Servidor Web:**
  
  - La aplicación se encuentra desplegada y en completo funcionamiento en render
  [Render](https://render.com)

  - Link del sitio VECI APP
  [Veci App](https://veciapp-p4yj.onrender.com)

   * Credenciales:
      user: ```bash user0147```
      password: ```bash #3Q34Sh0NlDS```    

## Instalación

Para ejecutar el proyecto localmente, sigue estos pasos:

### Prerrequisitos

Asegúrate de tener instalado lo siguiente:

- Node.js (>=18.x.x)
- npm (>=6.x.x)

### Clonar el Repositorio

```bash
git clone https://github.com/miller0702/front-veci.git
cd Veci Front
```

### Instalar Dependencias

Si usas npm:

```bash
npm install
```

## Uso

Para ejecutar la aplicación en modo desarrollo:

```bash
npm run dev
```

o producción

```bash
npm run build
```

Esto iniciará la aplicación en `http://localhost:3000`, donde podrás interactuar con la interfaz.

## Estructura del Proyecto

```bash
RecargasApp/
├── public/
├── src/
│   ├── components/      # Componentes reutilizables (Modales, Alertas, Layout, RecargaPage, etc.)
│   ├── context/         # Context API para la gestión de estado global
│   ├── services/        # Servicios de API (funciones Axios para peticiones al backend)
│   ├── styles/          # Archivos JSX o SCSS personalizados
│   └── utils/           # Funciones utilitarias (Colors.)
├── .gitignore           # Archivos ignorados por Git
├── package.json         # Metadatos del proyecto y dependencias
├── README.md            # Documentación del proyecto
└── ...
```

## Scripts Disponibles

En el directorio del proyecto, puedes ejecutar los siguientes scripts:

- **`npm run dev`** - Ejecuta la aplicación en modo desarrollo.
- **`npm run build`** - Construye la aplicación para producción en la carpeta `build`.