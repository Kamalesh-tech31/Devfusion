# MongoDB Connection Examples

## 1. Local MongoDB (default)
MONGO_URI=mongodb://localhost:27017/devfusion

## 2. MongoDB Atlas Cloud
# Create a cluster at https://www.mongodb.com/cloud/atlas
# Format: mongodb+srv://<username>:<password>@<cluster>.<region>.mongodb.net/<database>?retryWrites=true&w=majority
# Example:
MONGO_URI=mongodb+srv://user:password@cluster0.1234abc.mongodb.net/devfusion?retryWrites=true&w=majority

## 3. MongoDB with Authentication (Local)
MONGO_URI=mongodb://username:password@localhost:27017/devfusion

## Connection String Components:
# - username: MongoDB user
# - password: MongoDB password
# - cluster: MongoDB Atlas cluster name
# - region: MongoDB Atlas region (e.g., mongodb.net)
# - database: Database name (devfusion)

## To get your MongoDB Atlas connection string:
# 1. Go to https://www.mongodb.com/cloud/atlas
# 2. Create a project and cluster
# 3. Add a database user (Database Access)
# 4. Whitelist your IP (Network Access)
# 5. Click "Connect" → "Connect your application"
# 6. Copy the connection string and replace <username>, <password>, etc.
