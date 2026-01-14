# WhatsDemo

MVP visual de chat estilo WhatsApp para demos. Incluye editor de perfil, mensajes, player de reproducción e importación JSON. Listo para desplegar en Dokploy usando Docker Compose.

## Requisitos

- Node.js 20+
- npm 10+

## Desarrollo local (Vite)

```bash
npm install
npm run dev
```

Luego abre `http://localhost:5173`.

## Build

```bash
npm run build
```

El build se genera en `dist/`.

## Docker

```bash
docker compose up --build
```

La app quedará disponible en `http://localhost:8080`.

## Deploy en Dokploy

1. Conecta este repositorio en Dokploy.
2. Dokploy detectará el `docker-compose.yml` y construirá la imagen automáticamente.
3. Publica el servicio (por defecto expone el puerto 8080).

No necesitas configuraciones adicionales: el deploy se basa únicamente en el `docker-compose.yml` incluido en el repo.
