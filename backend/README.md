# Devfusion Backend

## Setup

1. Install dependencies
   ```bash
   npm install
   ```

2. Start the server
   ```bash
   npm start
   ```

3. For development with auto-reload
   ```bash
   npm run dev
   ```

## API overview

- `GET /health`
- `GET /api/dashboard`
- `GET /api/deliveries`
- `GET /api/history`
- `GET /api/earnings`
- `PATCH /api/deliveries/:id/status`
- `POST /api/location-updates`
- `GET /api/location-updates/latest?deliveryId=...`

## Environment

- `PORT` (default: `4000`)
- `FRONTEND_URL` (default: `http://localhost:3000`)
- `DATABASE_PATH` (default: `./data/devfusion.db`)
