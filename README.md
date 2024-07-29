# lexart-fs-software-test - Proyecto Fullstack

Este es un proyecto fullstack que simula un sistema de administración para celulares smartphones con un front-end desarrollado en React y un back-end en Node.js utilizando Express, Sequelize y PostgreSQL.
Tambien incluye documentación del backend con Swagger e implementación de Web Sockets con Socket.io

## Importante a tener en cuenta.

La primer petición que se realice al backend por ejemplo el inicio de sesión, puede demorar hasta 1 minuto en caso de que el servidor haya estado sin uso, esto se debe a que el servidor se encuentra alojado en la capa gratuita de [https://render.com](https://render.com)

Una vez el servidor se pone en funcionamiento el resto de peticiones funciona con normalidad.

### Acceso mediante Deploy

Frontend: [https://lexart-fs-software-test-kcbo.vercel.app](https://lexart-fs-software-test-kcbo.vercel.app) ---> Usuario: *admin@tests.com*
contraseña: *admintests123*

Backend: [https://lexart-fs-software-test-backend.onrender.com](https://lexart-fs-software-test-backend.onrender.com)

### Acceso a documentación 

Docs: [https://lexart-fs-software-test-backend.onrender.com/api-docs]( https://lexart-fs-software-test-backend.onrender.com/api-docs)

## Instalación local

### Requisitos

- Node.js (v14 o superior)
- npm (v6 o superior)
- PostgreSQL (v12 o superior)

## Instrucciones para levantar el proyecto

### 1. Clonar el repositorio

```sh 
git clone https://github.com/Augustofrx/lexart-fs-software-test
cd lexart-fs-software-test
```

### 2. Configuración del backend

```sh 
cd backend
npm install
 ```

### 2.2 Configurar variables de entorno

Crea un archivo .env en la carpeta backend y agrega las siguientes variables de entorno:

```sh 
DB_HOST=localhost
DB_PORT=5432
DB_USER=tu_usuario
DB_PASS=tu_contraseña
DB_NAME=tu_base_de_datos
JWT_SECRET=tu_secreto_jwt
 ```

Asegúrate de reemplazar los valores con la configuración de tu base de datos PostgreSQL y tu secreto JWT.

### 2.3 Iniciar el servidor

Para iniciar el servidor en modo desarrollo (con nodemon):

```sh 
npm run dev
 ```

Para iniciar el servidor en modo producción:

```sh 
npm start
 ```

### 3. Configuración del front-end

Situado en tu carpeta raiz

```sh 
cd ./frontend
npm install
 ```

### 3.1 Iniciar la aplicación


```sh 
npm start
 ```

### 4. Uso de la aplicación

Accede a la aplicación frontend en tu navegador en http://localhost:3000.

La aplicación hará llamadas al servidor back-end en http://localhost:3001.

