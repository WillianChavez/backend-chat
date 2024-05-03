# Backend para Aplicación de Chat con NestJS

Este es el repositorio del backend para una aplicación de chat desarrollada con NestJS. Proporciona la lógica del servidor necesaria para gestionar la autenticación de usuarios, el envío y recepción de mensajes, así como otras funcionalidades clave de la aplicación de chat.

## Tecnologías Utilizadas

- **NestJS**: Framework de Node.js utilizado para construir aplicaciones de servidor escalables y eficientes.
- **TypeScript**: Lenguaje de programación que añade tipos a JavaScript, utilizado para escribir el código del backend.
- **Socket.IO**: Biblioteca que permite la comunicación bidireccional en tiempo real entre el cliente y el servidor.
- **MongoDB**: Base de datos NoSQL utilizada para almacenar los datos de los usuarios y los mensajes del chat.
- **JWT (JSON Web Tokens)**: Para la autenticación basada en tokens.
- **bcrypt**: Para el cifrado de contraseñas almacenadas en la base de datos.

## Instalación

1. Clona este repositorio en tu máquina local utilizando Git:

   ```
   git clone git@github.com:WillianChavez/backend-chat.git
   ```

2. Navega al directorio del proyecto:

   ```
   cd backend-chat
   ```

3. Instala las dependencias utilizando npm:

   ```
   npm install
   ```

4. Configura las variables de entorno creando un archivo `.env` en el directorio raíz del proyecto y proporciona los valores necesarios para las siguientes variables:

   ```
   HOST=localhost
   PORT=8000
   APP_ENV=desarrollo
   SECRET_KEY=clave_secreta

   DB_HOST=0.0.0.0
   DB_PORT=5432
   DB_NAME=chat
   DB_USERNAME=postgres
   DB_PASSWORD=postgres
   DB_DIALECT=postgres

   APP_DEBUG=true
   ```

## Uso

1. Inicia el servidor en modo dev:

   ```
   npm run start:dev
   ```

2. El servidor estará escuchando en el puerto especificado en tu archivo `.env` (por defecto, el puerto 8000).

3. El backend proporciona endpoints RESTful para la gestión de usuarios y mensajes, así como un socket para la comunicación en tiempo real. Consulta la documentación de la API para obtener más detalles sobre cómo interactuar con el backend.

## Contribución

Si deseas contribuir a este proyecto, por favor sigue los siguientes pasos:

1. Haz un fork de este repositorio.
2. Crea una nueva rama para tu contribución: `git checkout -b mi-contribucion`.
3. Haz tus cambios y asegúrate de seguir las guías de estilo del código.
4. Haz commit de tus cambios: `git commit -am 'Añadiendo mi contribución'`.
5. Sube tus cambios a tu repositorio fork: `git push origin mi-contribucion`.
6. Crea un nuevo Pull Request en este repositorio.

Este proyecto fue desarrollado por el equipo de PDM Un(https://github.com/tu-usuario).
