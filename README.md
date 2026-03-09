# Real-Time Collaboration Server

Backend para colaboración en tiempo real que soporta **chat, presencia de usuarios, notificaciones y activity events** utilizando WebSockets.

El sistema está diseñado con una arquitectura escalable usando **Redis Pub/Sub**, persistencia con **PostgreSQL** y autenticación basada en **JWT**.

---

## Características

* Autenticación mediante JWT
* Chat en tiempo real
* Rooms (canales de conversación)
* Historial de mensajes
* Presence system (usuarios online/offline)
* Typing indicators
* Notificaciones en vivo
* Arquitectura escalable con Redis Pub/Sub
* Persistencia de datos con PostgreSQL
* Contenerización con Docker

---

## Tecnologías utilizadas

* Node.js
* Express
* Socket.IO
* Redis
* PostgreSQL
* Docker
* JWT (JSON Web Tokens)

---

## Arquitectura del sistema

El sistema sigue una arquitectura **event-driven** basada en WebSockets.

Client
↓
WebSocket Connection
↓
Real-Time Server
↓
Redis Pub/Sub (para escalabilidad)
↓
PostgreSQL (persistencia de mensajes)

### Flujo de eventos

1. Usuario se autentica mediante la Auth API y obtiene un JWT.
2. El cliente establece conexión WebSocket enviando el token.
3. El servidor valida el JWT durante el handshake.
4. El usuario puede:

   * unirse a rooms
   * enviar mensajes
   * recibir notificaciones
5. Los mensajes se guardan en PostgreSQL y se distribuyen en tiempo real.

---

## Estructura del proyecto

src

config

* database.js
* redis.js

services

* message.service.js
* presence.service.js

sockets

* socketHandler.js

utils

* jwtVerify.js

server.js
app.js

---

## Variables de entorno

Crear un archivo `.env`:

PORT=4000
JWT_SECRET=your_secret_key

DB_HOST=postgres
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=realtime_chat

REDIS_URL=redis://redis:6379

---

## Instalación

Clonar repositorio:

git clone https://github.com/tuusuario/real-time-collaboration-server.git

Entrar al proyecto:

cd real-time-collaboration-server

Instalar dependencias:

npm install

---

## Ejecutar en desarrollo

npm run dev

Servidor disponible en:

http://localhost:4000

---

## Ejecutar con Docker

Construir y levantar servicios:

docker-compose up

Esto iniciará:

* Node server
* PostgreSQL
* Redis

---

## Eventos WebSocket

### Conexión

El cliente debe enviar el JWT en el handshake.

```javascript
const socket = io("http://localhost:4000", {
  auth: {
    token: JWT_TOKEN
  }
})
```

---

### Unirse a room

```
socket.emit("join_room", "room1")
```

---

### Enviar mensaje

```
socket.emit("send_message", {
  room: "room1",
  message: "Hola mundo"
})
```

---

### Escuchar mensajes

```
socket.on("receive_message", (data) => {
  console.log(data)
})
```

---

### Usuarios online

```
socket.on("online_users", (users) => {
  console.log(users)
})
```

---

### Typing indicator

```
socket.emit("typing", "room1")
```

---

### Notificaciones

```
socket.on("notification", (data) => {
  console.log(data)
})
```

---

## Posibles mejoras

* Rate limiting en eventos WebSocket
* Persistencia de notificaciones
* Sistema de permisos en rooms
* Escalado horizontal con Kubernetes
* Monitoring con Prometheus/Grafana

---

## Autor
 Luis E. S. F.
