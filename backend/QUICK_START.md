# 🚀 QUICK START - 5 MINUTES TO RUNNING

Just follow these 5 steps to get your backend running with MongoDB.

## Step 1: Open Terminal/PowerShell
```
Navigate to: c:\Users\ashva\OneDrive\Desktop\Dev\Devfusion\backend
```

## Step 2: Install Dependencies
```bash
npm install
```

**⏱️ Takes ~2 minutes**

---

## Step 3: Start MongoDB (Choose One)

### Option A: Local MongoDB (Simplest)
```bash
# Install MongoDB from: https://www.mongodb.com/try/download/community
# Then in a separate terminal/PowerShell, run:
mongod
```

### Option B: MongoDB Atlas (Cloud - No Installation)
1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up (free)
3. Create cluster (click "Create" button)
4. Create database user (Database Access → Add Database User)
5. Whitelist your IP (Network Access → Add IP Address → Use current IP)
6. Connect (Click "Connect" → "Connect your application")
7. Copy connection string

---

## Step 4: Configure Backend

### Option A: Local MongoDB
```bash
# Create .env file
cp .env.example .env

# Edit .env and set:
MONGO_URI=mongodb://localhost:27017/devfusion
PORT=4000
FRONTEND_URL=http://localhost:3000
```

### Option B: MongoDB Atlas
```bash
# Create .env file
cp .env.example .env

# Edit .env and set:
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/devfusion?retryWrites=true&w=majority
PORT=4000
FRONTEND_URL=http://localhost:3000
```

---

## Step 5: Start Server
```bash
npm run dev
```

**Expected Output:**
```
MongoDB connected successfully
Devfusion backend listening on port 4000
Frontend URL: http://localhost:3000
```

---

## ✅ Done! Your Backend is Running

**Server URL**: http://localhost:4000

### Test It
```bash
# In a new terminal, test the API:
curl http://localhost:4000/health

# Should return:
# {"status":"ok","database":"MongoDB"}
```

---

## 📱 Use With Frontend

Your frontend should already work! Just make sure:
- Frontend is on `http://localhost:3000`
- Backend is on `http://localhost:4000`
- FRONTEND_URL in .env matches your frontend URL

---

## 🆘 Having Issues?

### "MongoDB connection failed"
- Make sure MongoDB is running (`mongod`)
- Check MONGO_URI in .env
- For Atlas, verify username/password and IP whitelist

### "Port 4000 already in use"
```bash
# Change PORT in .env to 5000 or 8000
PORT=5000
```

### "Cannot find module 'mongoose'"
```bash
# Reinstall dependencies
npm install
```

---

## 📚 Full Documentation

See these files for detailed info:
- **MIGRATION_GUIDE.md** - Complete setup guide
- **MONGODB_SETUP.md** - MongoDB setup details
- **README_NEW.md** - Full project documentation
- **MIGRATION_COMPLETE.md** - What was migrated

---

## 🎉 Success!

You now have a modern, scalable backend running on MongoDB!

**Next Steps:**
1. Test API endpoints
2. Connect frontend
3. Deploy to production

Enjoy! 🚀
