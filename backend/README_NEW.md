# Devfusion Backend - MongoDB Edition

A modern Express.js backend with MongoDB and Mongoose for the Devfusion delivery management system.

## ✨ Features

- ✅ MongoDB database with Mongoose ODM
- ✅ RESTful API with proper MVC architecture
- ✅ Async/await error handling
- ✅ Environment-based configuration
- ✅ CORS support for frontend integration
- ✅ Comprehensive logging and error handling
- ✅ Production-ready structure

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── controllers/
│   │   ├── deliveryController.js # Delivery CRUD operations
│   │   └── locationController.js # Location update operations
│   ├── middleware/
│   │   └── errorHandler.js       # Global error handler
│   ├── models/
│   │   ├── Delivery.js           # Delivery schema
│   │   └── LocationUpdate.js     # Location update schema
│   ├── routes/
│   │   ├── deliveries.js         # Delivery endpoints
│   │   └── locations.js          # Location update endpoints
│   ├── utils/
│   │   └── constants.js          # Enums and constants
│   └── server.js                 # Express app & entry point
├── .env.example                  # Environment template
├── .gitignore                    # Git ignore file
├── MIGRATION_GUIDE.md            # Migration from SQLite to MongoDB
├── MIGRATION_SUMMARY.md          # Summary of changes
├── MONGODB_SETUP.md              # MongoDB setup guide
├── package.json                  # Dependencies
├── setup.sh                      # Linux/Mac setup script
└── setup.bat                     # Windows setup script
```

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd backend
npm install
```

Or use the setup script:
- **Windows**: `setup.bat`
- **Linux/Mac**: `bash setup.sh`

### 2. Configure MongoDB

#### Option A: Local MongoDB
```bash
# Install MongoDB from: https://www.mongodb.com/try/download/community

# Start MongoDB
mongod
```

#### Option B: MongoDB Atlas (Cloud)
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get connection string
4. Add to `.env`

### 3. Setup Environment Variables

```bash
cp .env.example .env
```

Edit `.env`:
```
MONGO_URI=mongodb://localhost:27017/devfusion
PORT=4000
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
```

### 4. Start the Server

```bash
npm run dev
```

Server starts on `http://localhost:4000`

## 📚 API Endpoints

### Health Check
- `GET /health` - Server status

### Deliveries
- `GET /api/deliveries` - Get all deliveries
- `GET /api/deliveries/dashboard` - Dashboard data
- `GET /api/deliveries/history` - Completed deliveries
- `GET /api/deliveries/earnings` - Earnings data
- `PATCH /api/deliveries/:id/status` - Update status

### Location Updates
- `POST /api/location-updates` - Create location update
- `GET /api/location-updates/latest?deliveryId=XXX` - Latest location
- `GET /api/location-updates?deliveryId=XXX` - All location updates

## 📊 Database Schema

### Delivery Collection
```javascript
{
  _id: ObjectId,
  id: String,           // Unique delivery ID
  customer: String,     // Customer name
  address: String,      // Delivery address
  city: String,         // City
  eta: String,          // Estimated time of arrival
  status: String,       // enum: ['Pending', 'Out for Delivery', 'Delivered', 'Failed Attempt', 'Returned']
  priority: String,     // enum: ['Low', 'Medium', 'High', 'Urgent']
  contact: String,      // Contact number
  location: String,     // Current location
  lastUpdated: String,  // Last update timestamp
  createdAt: Date,      // Auto-generated
  updatedAt: Date       // Auto-generated
}
```

### LocationUpdate Collection
```javascript
{
  _id: ObjectId,
  deliveryId: String,       // Reference to delivery
  latitude: Number,         // Latitude coordinate
  longitude: Number,        // Longitude coordinate
  source: String,           // Data source (manual, GPS, etc.)
  displayName: String,      // Location display name
  formattedAddress: String, // Full address
  city: String,             // City
  state: String,            // State/Province
  country: String,          // Country
  postalCode: String,       // Postal code
  timestamp: String,        // Update timestamp
  createdAt: Date,          // Auto-generated
  updatedAt: Date           // Auto-generated
}
```

## 🔧 Configuration

### Environment Variables
```
# MongoDB
MONGO_URI=mongodb://localhost:27017/devfusion

# Server
PORT=4000
NODE_ENV=development

# Frontend
FRONTEND_URL=http://localhost:3000

# Database
DATABASE_NAME=devfusion
```

### Valid Status Values
- `Pending` - Awaiting pickup
- `Out for Delivery` - Currently being delivered
- `Delivered` - Successfully delivered
- `Failed Attempt` - Delivery failed
- `Returned` - Order returned

## 📝 Models & Controllers

### DeliveryController
- `getAllDeliveries()` - Fetch all deliveries
- `getActiveDeliveries()` - Active deliveries only
- `getHistoryDeliveries()` - Completed deliveries
- `getDashboard()` - Dashboard analytics
- `getEarnings()` - Earnings data
- `updateDeliveryStatus()` - Update status with validation

### LocationController
- `createLocationUpdate()` - Record new location
- `getLatestLocationUpdate()` - Most recent location
- `getLocationUpdates()` - All location history

## 🛠️ Development

### Running in Development Mode
```bash
npm run dev
```

Uses `node --watch` for auto-restart on file changes.

### Running in Production Mode
```bash
npm start
```

## 🧪 Testing API Endpoints

### Using curl
```bash
# Get all deliveries
curl http://localhost:4000/api/deliveries

# Get dashboard data
curl http://localhost:4000/api/deliveries/dashboard

# Update delivery status
curl -X PATCH http://localhost:4000/api/deliveries/DL001/status \
  -H "Content-Type: application/json" \
  -d '{"status":"Out for Delivery"}'

# Create location update
curl -X POST http://localhost:4000/api/location-updates \
  -H "Content-Type: application/json" \
  -d '{
    "deliveryId": "DL001",
    "latitude": 28.6139,
    "longitude": 77.2090,
    "displayName": "New Delhi",
    "formattedAddress": "New Delhi, India"
  }'
```

### Using Postman
1. Import API endpoints into Postman
2. Create requests for each endpoint
3. Test with various payloads

## 📖 Migration from SQLite

Migrating from SQLite to MongoDB? See:
- [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md) - Step-by-step guide
- [MIGRATION_SUMMARY.md](./MIGRATION_SUMMARY.md) - What changed
- [MONGODB_SETUP.md](./MONGODB_SETUP.md) - MongoDB setup

## 🐛 Troubleshooting

### MongoDB Connection Failed
- Ensure MongoDB is running: `mongod`
- Check `MONGO_URI` in `.env`
- For Atlas: Verify IP whitelist and credentials

### Port Already in Use
```bash
# Linux/Mac: Kill process on port 4000
lsof -i :4000 | grep LISTEN | awk '{print $2}' | xargs kill -9

# Windows: Use Task Manager or
netstat -ano | findstr :4000
```

### Module Not Found Errors
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

## 📦 Dependencies

- **express** - Web framework
- **mongoose** - MongoDB ODM
- **mongodb** - MongoDB driver
- **cors** - Cross-origin resource sharing
- **dotenv** - Environment variables

## 🚀 Deployment

### Deploy to Heroku
```bash
heroku create your-app-name
git push heroku main
heroku config:set MONGO_URI=your_atlas_connection_string
```

### Deploy to other platforms
- Ensure MongoDB Atlas cluster is created
- Set environment variables on deployment platform
- Run `npm install` and `npm start`

## 📄 License

MIT

## 👥 Support

For issues or questions:
1. Check MIGRATION_GUIDE.md
2. Review error logs in terminal
3. Verify MongoDB connection
4. Check .env configuration

## 🔗 Useful Links

- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [Express.js Guide](https://expressjs.com/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
