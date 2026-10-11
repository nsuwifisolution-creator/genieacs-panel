# GenieACS Panel Backend

Express.js backend for GenieACS Panel management system.

## Setup

```bash
cp .env.example .env
npm install
npm run dev
```

## Environment variables

- `PORT`: API port (default: 5000)
- `NODE_ENV`: development or production
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: JWT signing secret (generate with: openssl rand -base64 64)
- `GENIEACS_NBI_URL`: GenieACS NBI endpoint
- `DEFAULT_ADMIN_EMAIL`: Initial admin email
- `DEFAULT_ADMIN_PASSWORD`: Initial admin password

## API routes

### Auth
- `POST /api/auth/login`
- `GET /api/auth/me`

### Devices
- `GET /api/devices`
- `GET /api/devices/:id`

### Tasks
- `GET /api/tasks`
- `POST /api/tasks/:id`
- `POST /api/tasks/:id/retry`

### Presets
- `GET /api/presets`
- `POST /api/presets`
- `PUT /api/presets/:id`
- `DELETE /api/presets/:id`

### Users
- `GET /api/users` (admin only)
- `POST /api/users` (admin only)

### Logs
- `GET /api/logs/services/:service`
- `GET /api/logs/system`
