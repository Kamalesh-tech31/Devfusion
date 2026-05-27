# SQLite to MongoDB Migration Guide

## Overview
This guide explains the complete migration from SQLite (better-sqlite3) to MongoDB with Mongoose.

## What Changed

### 1. Database Layer
- **Before**: SQLite with `better-sqlite3` driver
- **After**: MongoDB with Mongoose ODM

### 2. Project Structure
```
backend/
├── src/
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── controllers/
│   │   ├── deliveryController.js
│   │   └── locationController.js
│   ├── middleware/
│   │   └── errorHandler.js
│   ├── models/
│   │   ├── Delivery.js
│   │   └── LocationUpdate.js
│   ├── routes/
│   │   ├── deliveries.js
│   │   └── locations.js
│   ├── utils/
│   │   └── constants.js
│   └── server.js              # Entry point
├── package.json
├── .env.example
└── MONGODB_SETUP.md           # MongoDB setup instructions
```

### 3. API Endpoints (Unchanged)
All existing endpoints remain the same:
- `GET /health` - Health check
- `GET /api/deliveries` - All deliveries
- `GET /api/deliveries/dashboard` - Dashboard data
- `GET /api/deliveries/history` - History deliveries
- `GET /api/deliveries/earnings` - Earnings data
- `PATCH /api/deliveries/:id/status` - Update status
- `POST /api/location-updates` - Create location update
- `GET /api/location-updates/latest` - Latest location update

## Setup Instructions

### Step 1: Install Dependencies
```bash
cd backend
npm install
```

### Step 2: Setup MongoDB
**Option A: Local MongoDB**
1. Install MongoDB Community Edition from https://www.mongodb.com/try/download/community
2. Start MongoDB service:
   - Windows: `mongod`
   - macOS: `brew services start mongodb-community`
   - Linux: `sudo systemctl start mongod`

**Option B: MongoDB Atlas (Cloud)**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a cluster
4. Create a database user (Database Access)
5. Whitelist your IP (Network Access)
6. Get the connection string
7. Add connection string to `.env`

### Step 3: Configure Environment
1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Update `.env` with your MongoDB URI:
   ```
   MONGO_URI=mongodb://localhost:27017/devfusion
   ```
   or for MongoDB Atlas:
   ```
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/devfusion?retryWrites=true&w=majority
   ```

### Step 4: Run the Server
```bash
npm run dev
```

Server should start on `http://localhost:4000`

## Database Schema

### Collections

#### 1. Delivery
```javascript
{
  _id: ObjectId,
  id: String (unique),
  customer: String,
  address: String,
  city: String,
  eta: String,
  status: String (enum),
  priority: String (enum),
  contact: String,
  location: String,
  lastUpdated: String,
  createdAt: Date,
  updatedAt: Date
}
```

**Valid Status Values**: 'Pending', 'Out for Delivery', 'Delivered', 'Failed Attempt', 'Returned'

#### 2. LocationUpdate
```javascript
{
  _id: ObjectId,
  deliveryId: String (indexed),
  latitude: Number,
  longitude: Number,
  source: String,
  displayName: String,
  formattedAddress: String,
  city: String,
  state: String,
  country: String,
  postalCode: String,
  timestamp: String,
  createdAt: Date,
  updatedAt: Date
}
```

## Migration from SQLite to MongoDB

### Data Migration Steps (if you have existing SQLite data)

1. **Export SQLite Data**:
   ```bash
   sqlite3 data/devfusion.db ".mode json" "SELECT * FROM deliveries;" > deliveries.json
   sqlite3 data/devfusion.db ".mode json" "SELECT * FROM location_updates;" > location_updates.json
   ```

2. **Transform and Import to MongoDB**:
   Use MongoDB Import Tool or manually import via MongoDB Compass:
   ```bash
   mongoimport --uri "mongodb://localhost:27017/devfusion" --collection deliveries --file deliveries.json
   mongoimport --uri "mongodb://localhost:27017/devfusion" --collection locationupdates --file location_updates.json
   ```

3. **Verify Data**:
   ```bash
   mongosh
   use devfusion
   db.deliveries.count()
   db.locationupdates.count()
   ```

## Key Changes in Code

### Before (SQLite)
```javascript
const db = require('better-sqlite3')('data/devfusion.db');
const rows = db.prepare('SELECT * FROM deliveries').all();
db.prepare('UPDATE deliveries SET status = ? WHERE id = ?').run(status, id);
```

### After (MongoDB)
```javascript
const Delivery = require('./models/Delivery');
const deliveries = await Delivery.find().lean();
await Delivery.findOneAndUpdate({ id }, { status }, { new: true });
```

## Troubleshooting

### "MongoDB connection failed"
- Ensure MongoDB is running
- Check `MONGO_URI` in `.env`
- For Atlas, verify IP whitelist

### "Cannot find module 'mongoose'"
- Run `npm install` again
- Delete `node_modules` and `package-lock.json`, then reinstall

### Port already in use
- Change `PORT` in `.env` to a different port
- Or kill existing process: `lsof -i :4000 | kill -9`

### Validation errors
- Check required fields in models
- Ensure status values are valid (Pending, Out for Delivery, etc.)

## Frontend Configuration

Update your frontend API calls if needed. The backend endpoints remain the same, so no changes required if you were using the old endpoints.

## Performance Tips

1. **Indexes**: Deliveries already have index on `id`, location updates on `deliveryId`
2. **Lean Queries**: Using `.lean()` for read-only operations (faster)
3. **Connection Pooling**: Mongoose handles connection pooling automatically
4. **Error Handling**: Centralized error handler in middleware

## Next Steps

1. Test all API endpoints with Postman or curl
2. Update frontend base URL if needed (default: http://localhost:4000)
3. Deploy to production with MongoDB Atlas
4. Remove old `server.js` and `data/` folder when confident

## Support

For MongoDB issues:
- Docs: https://docs.mongodb.com/
- Mongoose: https://mongoosejs.com/docs/

For this project issues:
- Check logs in terminal
- Verify `.env` configuration
- Ensure MongoDB is running
