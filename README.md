# Veci App - Aplicación de Recargas con React

## Tabla de Contenidos

- [Introducción](#introducción)
- [Características](#características)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Instalación](#instalación)
- [Uso](#uso)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Variables de Entorno](#variables-de-entorno)
- [Scripts Disponibles](#scripts-disponibles)
- [Contribuciones](#contribuciones)
- [Licencia](#licencia)

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

- **Backend:**
  - Spring Boot
  - Java
  - MongoDB Atlas

## Instalación

Para ejecutar el proyecto localmente, sigue estos pasos:

### Prerrequisitos

Asegúrate de tener instalado lo siguiente:

- Node.js (>=18.x.x)
- npm (>=6.x.x)

### Clonar el Repositorio

```bash
git clone https://github.com/tu-usuario/RecargasApp.git
cd Veci Front
```

### Instalar Dependencias

Si usas npm:

```bash
npm install
```

O si prefieres yarn:

```bash
yarn install
```

## Uso

Para ejecutar la aplicación en modo desarrollo:

```bash
npm start
```

o

```bash
yarn start
```

Esto iniciará la aplicación en `http://localhost:3000`, donde podrás interactuar con la interfaz.

## Estructura del Proyecto

```bash
RecargasApp/
├── public/
├── src/
│   ├── components/      # Componentes reutilizables (botones, formularios, etc.)
│   ├── pages/           # Componentes de página (e.g., Inicio, Login, Recarga)
│   ├── context/         # Context API para la gestión de estado global
│   ├── services/        # Servicios de API (funciones Axios para peticiones al backend)
│   ├── styles/          # Archivos CSS o SCSS personalizados
│   └── utils/           # Funciones utilitarias (helpers, formateadores, etc.)
├── .env                 # Variables de entorno (agrega tus claves de API aquí)
├── .gitignore           # Archivos ignorados por Git
├── package.json         # Metadatos del proyecto y dependencias
├── README.md            # Documentación del proyecto
└── ...
```

## Variables de Entorno

Para ejecutar este proyecto, necesitarás configurar las siguientes variables de entorno en un archivo `.env` en la raíz del proyecto:

```bash
REACT_APP_API_URL=<URL_API>          # URL para la API de recargas
REACT_APP_STRIPE_KEY=<CLAVE_STRIPE>  # Clave de API para Stripe (o cualquier pasarela de pago)
```

## Scripts Disponibles

En el directorio del proyecto, puedes ejecutar los siguientes scripts:

- **`npm start`** - Ejecuta la aplicación en modo desarrollo.
- **`npm run build`** - Construye la aplicación para producción en la carpeta `build`.
- **`npm test`** - Ejecuta el test runner en modo interactivo.
- **`npm run lint`** - Ejecuta el linter para comprobar errores de estilo de código.

## Contribuciones

¡Las contribuciones son bienvenidas! Para contribuir a este proyecto:

1. Haz un fork del repositorio
2. Crea una nueva rama (`git checkout -b feature/mi-caracteristica`)
3. Realiza tus cambios
4. Haz commit de los cambios (`git commit -m 'Agregar mi característica'`)
5. Haz push de la rama (`git push origin feature/mi-caracteristica`)
6. Crea un Pull Request

Por favor, asegúrate de que tu código sigue el estilo del proyecto y está bien documentado.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.

---

Siente la libertad de ajustar las secciones según tus necesidades y características específicas del proyecto.