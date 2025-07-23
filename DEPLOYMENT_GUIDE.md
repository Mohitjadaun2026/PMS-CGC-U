# Render Deployment Guide for Job Portal

## Prerequisites
1. GitHub account with your project repository
2. MongoDB Atlas account (for cloud database)
3. Render account

## Step 1: Prepare MongoDB Atlas

1. **Create MongoDB Atlas Account**: Go to https://cloud.mongodb.com/
2. **Create a Cluster**: 
   - Choose FREE tier (M0 Sandbox)
   - Select your preferred region
   - Create cluster
3. **Get Connection String**:
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/placement`)
   - Replace `<password>` with your actual password

## Step 2: Deploy Backend to Render

1. **Push Code to GitHub** (if not already done):
   ```bash
   git add .
   git commit -m "Prepare for Render deployment"
   git push origin main
   ```

2. **Create New Web Service on Render**:
   - Go to https://render.com/
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select your repository

3. **Configure Backend Service**:
   ```
   Name: job-portal-backend
   Region: Oregon (US West) or closest to you
   Branch: main
   Root Directory: backend
   Runtime: Node
   Build Command: npm install
   Start Command: npm start
   ```

4. **Add Environment Variables**:
   ```
   MONGODB_URI = your_mongodb_atlas_connection_string
   PORT = 10000
   NODE_ENV = production
   ```

5. **Deploy**: Click "Create Web Service"

## Step 3: Deploy Frontend to Render

1. **Update Frontend Environment**:
   - After backend is deployed, copy your backend URL (e.g., https://job-portal-backend.onrender.com)
   - Update `frontend/.env.production`:
     ```
     VITE_API_URL=https://your-backend-app-name.onrender.com
     ```

2. **Create New Static Site on Render**:
   - Click "New +" → "Static Site"
   - Connect same GitHub repository
   - Select your repository

3. **Configure Frontend Service**:
   ```
   Name: job-portal-frontend
   Branch: main
   Root Directory: frontend
   Build Command: npm install && npm run build
   Publish Directory: dist
   ```

4. **Add Environment Variables** (if needed):
   ```
   VITE_API_URL = https://your-backend-app-name.onrender.com
   ```

5. **Deploy**: Click "Create Static Site"

## Step 4: Update CORS in Backend

After frontend is deployed, update the CORS configuration in your backend `server.js`:

```javascript
app.use(cors({
  origin: [
    'http://localhost:3000', 
    'http://localhost:5173', 
    'https://your-frontend-app-name.onrender.com'  // Add your actual frontend URL
  ],
  credentials: true
}));
```

Then commit and push the changes to trigger a redeploy.

## Step 5: Testing

1. **Test Backend**: Visit your backend URL + `/api/jobs` (e.g., https://your-backend.onrender.com/api/jobs)
2. **Test Frontend**: Visit your frontend URL and test job posting/viewing functionality

## Important Notes

1. **Free Tier Limitations**:
   - Services sleep after 15 minutes of inactivity
   - First request after sleep may take 30+ seconds
   - Consider upgrading for production use

2. **File Uploads**: 
   - Uploaded files are stored in Render's ephemeral storage
   - Files may be lost on service restarts
   - Consider using cloud storage (AWS S3, Cloudinary) for production

3. **Database Connection**:
   - Make sure MongoDB Atlas allows connections from anywhere (0.0.0.0/0) or add Render's IP ranges

## Troubleshooting

1. **Build Fails**: Check logs in Render dashboard
2. **API Not Working**: Verify environment variables and CORS settings
3. **Database Connection Issues**: Check MongoDB Atlas network access and connection string

## Example URLs Structure
- Backend: `https://job-portal-backend.onrender.com`
- Frontend: `https://job-portal-frontend.onrender.com`
- API Endpoint: `https://job-portal-backend.onrender.com/api/jobs`
