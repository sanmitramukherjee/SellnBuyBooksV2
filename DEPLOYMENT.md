# Deployment Guide - Two Separate Deployments

## Overview
This guide covers deploying the SellnBuyBooks application with:
- **Backend**: Render (Node.js/Express API)
- **Frontend**: Vercel (React + Vite)

---

## Part 1: Backend Deployment (Render)

### Step 1: Prepare Backend
Your existing Render deployment should work with minimal changes.

**Environment Variables on Render:**
```
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secret_key
PORT=10000
CLIENT_URL=https://your-frontend-url.vercel.app
```

**Important Notes:**
- Render uses port 10000 by default (not 5000)
- Update `CLIENT_URL` after deploying frontend
- CORS is already configured to use `CLIENT_URL`

### Step 2: Update Backend CORS (if needed)
The backend `server.js` already has CORS configured:
```javascript
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));
```

### Step 3: Deploy Backend
1. Push your code to GitHub
2. In Render dashboard:
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`
3. Note your backend URL (e.g., `https://your-app.onrender.com`)

---

## Part 2: Frontend Deployment (Vercel)

### Step 1: Update API Configuration
Update `frontend/src/utils/api.js` to use environment variable:

```javascript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});
```

### Step 2: Create Vercel Configuration
Create `frontend/vercel.json`:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### Step 3: Deploy to Vercel
1. Install Vercel CLI (optional):
   ```bash
   npm i -g vercel
   ```

2. Deploy via Vercel Dashboard:
   - Import your GitHub repository
   - Framework Preset: **Vite**
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

3. Add Environment Variable:
   ```
   VITE_API_URL=https://your-backend.onrender.com
   ```

### Step 4: Update Backend with Frontend URL
Go back to Render and update:
```
CLIENT_URL=https://your-frontend.vercel.app
```

---

## Part 3: Verification Checklist

After both deployments:

### Backend (Render)
- [ ] Backend is running (check Render logs)
- [ ] MongoDB connection successful
- [ ] Environment variables set correctly
- [ ] `CLIENT_URL` points to Vercel frontend

### Frontend (Vercel)
- [ ] Build successful
- [ ] `VITE_API_URL` points to Render backend
- [ ] Can access the login page
- [ ] No CORS errors in browser console

### Full Flow Test
- [ ] Register new account
- [ ] Login works
- [ ] Can create a book listing
- [ ] Images upload successfully
- [ ] Can search books
- [ ] Purchase flow works
- [ ] Theme toggle works

---

## Troubleshooting

### CORS Errors
**Problem:** "CORS policy: No 'Access-Control-Allow-Origin' header"

**Solution:**
1. Check `CLIENT_URL` in Render matches your Vercel URL exactly
2. Ensure no trailing slash in URLs
3. Redeploy backend after changing `CLIENT_URL`

### API Not Found (404)
**Problem:** API calls return 404

**Solution:**
1. Verify `VITE_API_URL` in Vercel environment variables
2. Check it includes the full backend URL
3. Rebuild and redeploy frontend

### Images Not Loading
**Problem:** Book images don't display

**Solution:**
1. Check backend serves `/uploads` correctly
2. Verify image URLs in database are correct
3. Ensure Render has persistent storage (or use cloud storage like Cloudinary)

### Theme Not Persisting
**Problem:** Theme resets on page reload

**Solution:**
- This is a localStorage issue, should work fine in production
- Clear browser cache and try again

---

## Alternative: Vercel for Both

You can also deploy both on Vercel:

**Backend:**
- Root Directory: `backend`
- Framework: Other
- Build Command: `npm install`
- Output Directory: `.`

**Frontend:**
- Same as above

---

## Cost Breakdown

### Free Tier Limits:
- **Render**: Free tier sleeps after 15 min inactivity
- **Vercel**: 100GB bandwidth/month, unlimited deployments
- **MongoDB Atlas**: 512MB storage free

### Recommendations:
- Start with free tiers
- Upgrade Render to paid ($7/month) to prevent sleep
- Use Cloudinary for image storage (free tier: 25GB)

---

## Quick Deploy Commands

```bash
# Backend (if using Render CLI)
cd backend
render deploy

# Frontend (if using Vercel CLI)
cd frontend
vercel --prod
```

---

## Post-Deployment

### Update README
Add your live URLs:
```markdown
## Live Demo
- Frontend: https://your-app.vercel.app
- Backend API: https://your-api.onrender.com
```

### Monitor
- Render Dashboard: Check logs and metrics
- Vercel Dashboard: Check build logs and analytics
- MongoDB Atlas: Monitor database usage

---

## Need Help?

Common issues and solutions are in the Troubleshooting section above. If you encounter other issues:
1. Check Render logs
2. Check Vercel build logs
3. Check browser console for errors
4. Verify all environment variables are set correctly
