# 🔧 COMMAND REFERENCE - COPY & PASTE READY

## 🚀 COMPLETE SETUP (Copy and Paste)

### Windows PowerShell
```powershell
# 1. Navigate to backend folder
cd backend

# 2. Install dependencies
npm install

# 3. Copy environment template
Copy-Item .env.example .env

# 4. Open and edit .env file
notepad .env

# 5. In a NEW PowerShell window, start MongoDB (if local)
mongod

# 6. Back in original window, start the server
npm run dev

# Expected output:
# MongoDB connected successfully
# Devfusion backend listening on port 4000
```

### Linux/Mac Terminal
```bash
# 1. Navigate to backend folder
cd backend

# 2. Install dependencies
npm install

# 3. Copy environment template
cp .env.example .env

# 4. Edit the config file
nano .env
# or: vim .env

# 5. In a NEW terminal, start MongoDB (if local)
mongod

# 6. Back in original terminal, start the server
npm run dev

# Expected output:
# MongoDB connected successfully
# Devfusion backend listening on port 4000
```

---

## 📝 ENVIRONMENT FILE SETUP

### For Local MongoDB
```
MONGO_URI=mongodb://localhost:27017/devfusion
PORT=4000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### For MongoDB Atlas
```
MONGO_URI=mongodb+srv://username:password@cluster0.abcdefg.mongodb.net/devfusion?retryWrites=true&w=majority
PORT=4000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

---

## 🧪 TESTING COMMANDS

### Test 1: Health Check
```bash
curl http://localhost:4000/health
# Expected: {"status":"ok","database":"MongoDB"}
```

### Test 2: Get All Deliveries
```bash
curl http://localhost:4000/api/deliveries
# Expected: [] (or array of deliveries if data exists)
```

### Test 3: Get Dashboard
```bash
curl http://localhost:4000/api/deliveries/dashboard
# Expected: {activeDeliveries, completedDeliveries, followUps, avgEta, ...}
```

### Test 4: Get Earnings
```bash
curl http://localhost:4000/api/deliveries/earnings
# Expected: {highlights: [...], incentives: [...]}
```

### Test 5: Get History
```bash
curl http://localhost:4000/api/deliveries/history
# Expected: [] (or delivered/returned deliveries)
```

### Test 6: Create Location Update
```bash
curl -X POST http://localhost:4000/api/location-updates \
  -H "Content-Type: application/json" \
  -d '{
    "deliveryId": "DL001",
    "latitude": 28.6139,
    "longitude": 77.2090,
    "displayName": "Delhi",
    "formattedAddress": "New Delhi, India"
  }'
# Expected: {"success":true}
```

### Test 7: Update Delivery Status
```bash
curl -X PATCH http://localhost:4000/api/deliveries/DL001/status \
  -H "Content-Type: application/json" \
  -d '{"status":"Delivered"}'
# Expected: {id, customer, address, ..., status: "Delivered"}
```

---

## 🗄️ MONGODB COMMANDS

### Check MongoDB Status
```bash
mongosh
show dbs
use devfusion
show collections
db.deliveries.count()
db.locationupdates.count()
exit
```

### View Sample Delivery
```bash
mongosh
use devfusion
db.deliveries.findOne()
exit
```

### Delete All Data (Start Fresh)
```bash
mongosh
use devfusion
db.deliveries.deleteMany({})
db.locationupdates.deleteMany({})
exit
```

---

## 🆘 TROUBLESHOOTING COMMANDS

### Kill Process on Port 4000
```bash
# Windows PowerShell
Get-Process -Id (Get-NetTCPConnection -LocalPort 4000).OwningProcess | Stop-Process

# Linux/Mac
lsof -i :4000 | grep LISTEN | awk '{print $2}' | xargs kill -9
```

### Restart MongoDB
```bash
# Stop and start fresh (Windows)
powershell -Command "Stop-Process -Name mongod; Start-Process mongod"

# Linux/Mac
brew services restart mongodb-community
```

### Clear Node Modules (If Issues)
```bash
# Remove old dependencies
rm -r node_modules package-lock.json

# Reinstall fresh
npm install
```

### Check Node Version
```bash
node --version
npm --version
```

---

## 📦 DEPENDENCY MANAGEMENT

### Install Specific Package
```bash
npm install express mongoose
```

### Update Dependencies
```bash
npm update
```

### List Installed Packages
```bash
npm list
```

### Check Outdated Packages
```bash
npm outdated
```

---

## 🚀 RUNNING THE SERVER

### Development Mode (Auto-restart on changes)
```bash
npm run dev
```

### Production Mode (No auto-restart)
```bash
npm start
```

### Run with Debug Logging
```bash
DEBUG=* npm run dev
```

---

## 📚 FILE NAVIGATION

### View Directory Structure
```bash
# Linux/Mac
tree src

# Windows PowerShell
Get-ChildItem -Recurse src | Format-Table FullName
```

### View File Contents
```bash
# View package.json
cat package.json

# View .env
cat .env

# View server.js
cat src/server.js
```

### Edit Files
```bash
# Windows
notepad .env
code src/server.js

# Linux/Mac
nano .env
code src/server.js
```

---

## 🔄 GIT COMMANDS (Optional)

### Initialize Git
```bash
git init
git add .
git commit -m "MongoDB migration complete"
```

### View Changes
```bash
git status
git diff
```

### Push to Repository
```bash
git remote add origin https://github.com/yourusername/devfusion.git
git branch -M main
git push -u origin main
```

---

## 🚀 DEPLOYMENT COMMANDS

### Deploy to Heroku
```bash
# Login
heroku login

# Create app
heroku create your-app-name

# Set MongoDB URI
heroku config:set MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/devfusion

# Deploy
git push heroku main

# View logs
heroku logs --tail
```

### Deploy to Railway
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Create project
railway init

# Set variables
railway variable add MONGO_URI=<your-mongodb-uri>

# Deploy
railway up
```

---

## 📊 MONITORING COMMANDS

### Check Server Logs
```bash
# View recent logs
npm run dev

# Check MongoDB logs
tail -f /var/log/mongodb/mongod.log  # Linux/Mac
```

### Monitor Process
```bash
# Windows PowerShell
Get-Process node

# Linux/Mac
ps aux | grep node
```

### Check Memory Usage
```bash
# Windows
wmic process list brief

# Linux/Mac
top
```

---

## 🔐 SECURITY COMMANDS

### Generate Random JWT Secret
```bash
# Linux/Mac
openssl rand -base64 32

# Windows PowerShell
[Convert]::ToBase64String((1..32 | ForEach-Object { [byte](Get-Random -Maximum 256) }))
```

### Secure .env File (Linux/Mac)
```bash
chmod 600 .env
```

---

## 📋 QUICK REFERENCE SHORTCUTS

### One-Line Complete Setup
```bash
npm install && cp .env.example .env && npm run dev
```

### Reset Everything
```bash
rm -rf node_modules package-lock.json && npm install
```

### Full System Check
```bash
node --version && npm --version && mongosh --version
```

### Clean Logs (Linux/Mac)
```bash
clear
# or
cls  # Windows
```

---

## 🎯 COMMON WORKFLOWS

### Daily Development
```bash
# Terminal 1: MongoDB
mongod

# Terminal 2: Backend
cd backend
npm run dev

# Terminal 3: Frontend (if needed)
cd ../frontend
npm run dev
```

### Testing New Endpoint
```bash
# Make change to src/
# Server auto-restarts (npm run dev watches files)
# Test with curl:
curl http://localhost:4000/api/endpoint
```

### Add New Controller
```bash
# 1. Create file: src/controllers/newController.js
# 2. Add functions
# 3. Create routes: src/routes/new.js
# 4. Import in server.js
# 5. Test with curl
```

---

## 📞 SUPPORT RESOURCES

### MongoDB Help
```
Docs: https://docs.mongodb.com/
Mongoose: https://mongoosejs.com/
Atlas: https://www.mongodb.com/cloud/atlas
```

### Express Help
```
Docs: https://expressjs.com/
Guide: https://expressjs.com/en/guide/routing.html
```

### Node.js Help
```
Docs: https://nodejs.org/docs/
NPM: https://www.npmjs.com/
```

---

## ✅ COMPLETION CHECKLIST

After running all commands:

- [ ] npm install succeeded
- [ ] .env file created
- [ ] MongoDB running
- [ ] npm run dev succeeded
- [ ] Health check returns ok
- [ ] All test commands pass
- [ ] Frontend connects
- [ ] No console errors

---

## 🎯 YOU'RE READY!

Copy the appropriate setup commands for your OS above and you're ready to go!

**Questions?** Check the documentation files or run:
```bash
npm list
npm help
```

**Happy coding! 🚀**
