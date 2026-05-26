require('dotenv').config();

const express = require('express');
const cors = require('cors');
const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = Number(process.env.PORT || 4000);
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';
const DATABASE_PATH = process.env.DATABASE_PATH || path.join(__dirname, 'data', 'devfusion.db');

fs.mkdirSync(path.dirname(DATABASE_PATH), { recursive: true });

const db = new Database(DATABASE_PATH);
db.pragma('journal_mode = WAL');

const validStatuses = ['Pending', 'Out for Delivery', 'Delivered', 'Failed Attempt', 'Returned'];
const legacyDeliveryIds = ['#DL001', '#DL002', '#DL003', '#DL004', '#DL005', '#DL006', '#DL007'];

function initializeDatabase() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS deliveries (
      id TEXT PRIMARY KEY,
      customer TEXT NOT NULL,
      address TEXT NOT NULL,
      city TEXT NOT NULL,
      eta TEXT NOT NULL,
      status TEXT NOT NULL,
      priority TEXT NOT NULL,
      contact TEXT NOT NULL,
      location TEXT NOT NULL,
      last_updated TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS location_updates (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      delivery_id TEXT NOT NULL,
      latitude REAL NOT NULL,
      longitude REAL NOT NULL,
      source TEXT NOT NULL,
      display_name TEXT NOT NULL,
      formatted_address TEXT NOT NULL,
      city TEXT NOT NULL,
      state TEXT NOT NULL,
      country TEXT NOT NULL,
      postal_code TEXT NOT NULL,
      timestamp TEXT NOT NULL,
      FOREIGN KEY (delivery_id) REFERENCES deliveries(id)
    );
  `);

  const legacyRows = db.prepare(
    `SELECT id FROM deliveries WHERE id IN (${legacyDeliveryIds.map(() => '?').join(', ')})`
  ).all(...legacyDeliveryIds);

  if (legacyRows.length > 0) {
    db.prepare(
      `DELETE FROM location_updates WHERE delivery_id IN (${legacyDeliveryIds.map(() => '?').join(', ')})`
    ).run(...legacyDeliveryIds);
    db.prepare(
      `DELETE FROM deliveries WHERE id IN (${legacyDeliveryIds.map(() => '?').join(', ')})`
    ).run(...legacyDeliveryIds);
  }
}

function serializeDelivery(row) {
  return {
    id: row.id,
    customer: row.customer,
    address: row.address,
    city: row.city,
    eta: row.eta,
    status: row.status,
    priority: row.priority,
    contact: row.contact,
    location: row.location,
    lastUpdated: row.last_updated,
  };
}

function getAllDeliveries() {
  const rows = db.prepare('SELECT * FROM deliveries ORDER BY id ASC').all();
  return rows.map(serializeDelivery);
}

function getActiveDeliveries() {
  return getAllDeliveries().filter((delivery) => delivery.status !== 'Delivered' && delivery.status !== 'Returned');
}

function getHistoryDeliveries() {
  return getAllDeliveries().filter((delivery) => delivery.status === 'Delivered' || delivery.status === 'Returned');
}

function getDashboardResponse() {
  const deliveries = getAllDeliveries();
  const activeDeliveries = getActiveDeliveries();
  const completedDeliveries = deliveries.filter((item) => item.status === 'Delivered').length;
  const followUps = deliveries.filter((item) => item.status === 'Failed Attempt').length;
  const avgEta = activeDeliveries[0]?.eta || 'N/A';

  return {
    activeDeliveries: activeDeliveries.length,
    completedDeliveries,
    followUps,
    avgEta,
    routeUpdates: activeDeliveries.length,
    activeRoutes: activeDeliveries,
  };
}

function getEarningsResponse() {
  const deliveries = getAllDeliveries();
  const deliveredCount = deliveries.filter((item) => item.status === 'Delivered').length;

  return {
    highlights: [
      {
        title: 'Today\'s Earnings',
        value: `₹${(deliveredCount * 450).toLocaleString('en-IN')}`,
        description: deliveredCount >= 2 ? '+12% from yesterday' : 'Keep the route pace steady',
      },
      {
        title: 'Weekly Earnings',
        value: `₹${(deliveredCount * 1800).toLocaleString('en-IN')}`,
        description: `${deliveredCount} deliveries completed`,
      },
      {
        title: 'Monthly Earnings',
        value: `₹${(deliveredCount * 6200).toLocaleString('en-IN')}`,
        description: deliveredCount === 0 ? 'No premium routes yet' : `${deliveredCount} premium routes`,
      },
    ],
    incentives: [],
  };
}

initializeDatabase();
app.use(cors({ origin: FRONTEND_URL }));
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok', database: DATABASE_PATH });
});

app.get('/api/dashboard', (req, res) => {
  res.json(getDashboardResponse());
});

app.get('/api/deliveries', (req, res) => {
  res.json(getAllDeliveries());
});

app.get('/api/history', (req, res) => {
  res.json(getHistoryDeliveries());
});

app.get('/api/earnings', (req, res) => {
  res.json(getEarningsResponse());
});

app.patch('/api/deliveries/:id/status', (req, res) => {
  const { status } = req.body;

  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: 'Please provide a valid delivery status.' });
  }

  const updated = db.prepare(`
    UPDATE deliveries
    SET status = ?, last_updated = ?
    WHERE id = ?
  `).run(status, 'Just now', req.params.id);

  if (updated.changes === 0) {
    return res.status(404).json({ error: 'Delivery not found.' });
  }

  const delivery = db.prepare('SELECT * FROM deliveries WHERE id = ?').get(req.params.id);
  res.json(serializeDelivery(delivery));
});

app.post('/api/location-updates', (req, res) => {
  const payload = req.body;

  if (
    !payload.deliveryId ||
    payload.latitude === undefined ||
    payload.longitude === undefined ||
    !payload.displayName ||
    !payload.formattedAddress
  ) {
    return res.status(400).json({ error: 'Missing location details.' });
  }

  const exists = db.prepare('SELECT 1 FROM deliveries WHERE id = ?').get(payload.deliveryId);

  if (!exists) {
    return res.status(404).json({ error: 'Delivery not found.' });
  }

  const insert = db.prepare(`
    INSERT INTO location_updates (
      delivery_id,
      latitude,
      longitude,
      source,
      display_name,
      formatted_address,
      city,
      state,
      country,
      postal_code,
      timestamp
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  insert.run(
    payload.deliveryId,
    Number(payload.latitude),
    Number(payload.longitude),
    payload.source || 'manual',
    payload.displayName,
    payload.formattedAddress,
    payload.city || 'Unknown city',
    payload.state || 'Unknown state',
    payload.country || 'Unknown country',
    payload.postalCode || 'N/A',
    payload.timestamp || new Date().toLocaleString()
  );

  res.status(201).json({ success: true });
});

app.get('/api/location-updates/latest', (req, res) => {
  const { deliveryId } = req.query;

  if (!deliveryId) {
    return res.status(400).json({ error: 'deliveryId is required.' });
  }

  const latest = db.prepare(`
    SELECT * FROM location_updates
    WHERE delivery_id = ?
    ORDER BY id DESC
    LIMIT 1
  `).get(String(deliveryId));

  if (!latest) {
    return res.status(404).json({ error: 'No location update found.' });
  }

  res.json(latest);
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Devfusion backend listening on port ${PORT}`);
});
