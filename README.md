# Servidor de Colaboración en Tiempo Real

Servidor backend para aplicaciones de **colaboración en tiempo real**.

Este proyecto está construido con **Node.js, Express, Socket.IO, PostgreSQL, Redis y Docker**, y permite implementar funcionalidades como mensajería en tiempo real, autenticación con JWT, persistencia de mensajes y monitoreo de usuarios conectados.

------------------------------------------------------------

# Características

* Comunicación en tiempo real con Socket.IO
* Autenticación mediante JSON Web Tokens (JWT)
* Seguimiento de usuarios conectados (presencia)
* Mensajería basada en salas
* Persistencia de mensajes en PostgreSQL
* Redis Adapter para escalabilidad horizontal
* Infraestructura con Docker
* Arquitectura modular lista para producción

--------------------------------------------------------------------

# Tecnologías utilizadas

* Node.js
* Express
* Socket.IO
* PostgreSQL
* Redis
* Docker
* JWT (JSON Web Token)

---------------------------------------------------------

# Estructura del proyecto

```
real-time-collaboration-server
│
├── docker-compose.yml
├── Dockerfile
├── package.json
├── .env
│
└── src
    ├── app.js
    ├── server.js
    │
    ├── config
    │   ├── database.js
    │   └── redis.js
    │
    ├── middlewares
    │   └── auth.middleware.js
    │
    ├── services
    │   ├── message.service.js
    │   └── presence.service.js
    │
    ├── sockets
    │   └── socketHandler.js
    │
    └── utils
        └── jwtVerify.js
```

---

# Variables de entorno

Debes crear un archivo `.env` en la raíz del proyecto.

Ejemplo:

```
PORT=4000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=realtime_chat
REDIS_URL=redis://localhost:6379
JWT_SECRET=supersecretaccess
```

---

# Instalación

Clonar el repositorio:

```
git clone https://github.com/Lesf0215X/real-time-collaboration-server.git
cd real-time-collaboration-server
```

Instalar dependencias:

```
npm install
```

---

# Ejecutar con Docker (recomendado)

Iniciar todos los servicios:

```
docker compose up -d --build
```

Esto iniciará automáticamente:

* Servidor Node.js
* Base de datos PostgreSQL
* Servidor Redis

Verificar contenedores activos:

```
docker ps
```

---

# Ejecutar sin Docker

Debes tener **PostgreSQL y Redis instalados localmente**.

Luego iniciar el servidor:

```
npm run dev
```

o

```
npm start
```

---

# Endpoint HTTP

Para verificar que el servidor está funcionando:

```
GET /
```

Respuesta esperada:

```
Real-Time Collaboration Server is running
```

---

# Autenticación WebSocket

Los clientes deben conectarse usando un **token JWT**.

Ejemplo de payload del token:

```
{
  "id": "user1"
}
```

Ejemplo de conexión desde el cliente:

```
const socket = io("http://localhost:4000", {
  auth: {
    token: "JWT_TOKEN"
  }
})
```

---

# Eventos de Socket

## Unirse a una sala

Evento:

```
join_room
```

Payload:

```
room
```

---

## Salir de una sala

Evento:

```
leave_room
```

Payload:

```
room
```

---

## Enviar mensaje

Evento:

```
send_message
```

Payload:

```
{
  room: "room1",
  message: "Hola"
}
```

---

## Recibir mensaje

Evento:

```
receive_message
```

Retorna el mensaje guardado en la base de datos.

---

## Historial de mensajes

Evento:

```
room_history
```

Devuelve los mensajes almacenados previamente en PostgreSQL.

---

## Indicador de escritura

Evento:

```
typing
```

Notifica a otros usuarios de la sala que alguien está escribiendo.

---

## Usuarios conectados

Evento:

```
online_users
```

Devuelve la lista de usuarios actualmente conectados.

---

# Esquema de base de datos

Tabla de mensajes:

```
CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(255),
  room VARCHAR(255),
  message TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

# Redis Adapter

Redis se utiliza para permitir **escalabilidad horizontal** con múltiples instancias de Socket.IO.

Esto permite que el servidor funcione en varios nodos mientras mantiene sincronización en tiempo real entre ellos.

---

# Desarrollo

Ejecutar el servidor con recarga automática:

```
npm run dev
```

---

# Producción

Construir y ejecutar los contenedores:

```
docker compose up -d
```

---

# Autor

Luis E.S.F.
