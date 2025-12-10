# SellnBuyBooks - Modern Book Marketplace

A modern, full-stack book marketplace application built with React + Vite frontend and Node.js + Express backend.

## 🚀 Features

- ✅ **Modern UI** - Dark theme with glassmorphism, gradients, and smooth animations
- ✅ **Image Upload** - Upload book images with live preview
- ✅ **Complete Book Details** - Title, author, description, condition, price, and more
- ✅ **Dummy Payment** - 3-second payment simulation for purchases
- ✅ **Purchase History** - Track all your book purchases
- ✅ **Sold Status** - Books marked as sold after purchase
- ✅ **Authentication** - Secure login and registration
- ✅ **Responsive Design** - Works on desktop, tablet, and mobile

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- PowerShell execution policy set to allow scripts

## 🚀 Deployment

This project uses **two separate deployments**:
- **Backend**: Render (Node.js API)
- **Frontend**: Vercel (React + Vite)

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deploy:
1. **Backend** (Render):
   - Root Directory: `backend`
   - Environment: `MONGO_URI`, `JWT_SECRET`, `PORT`, `CLIENT_URL`

2. **Frontend** (Vercel):
   - Root Directory: `frontend`
   - Environment: `VITE_API_URL`
   - Build: `npm run build`
   - Output: `dist`

## 🛠️ Setup Instructions

### 1. Enable PowerShell Scripts (Required for Windows)

Run PowerShell as Administrator and execute:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_secret_key_here
CLIENT_URL=http://localhost:3000
```

Start the backend server:

```bash
npm start
```

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

## 🎯 Usage

1. **Register/Login** - Create an account or login
2. **Browse Books** - View available books on the Buy page
3. **Sell Books** - List your books with images and details
4. **Purchase Books** - Buy books with dummy payment simulation
5. **View History** - Check your purchase history

## 🎨 Design Features

- **Dark Theme** - Easy on the eyes
- **Glassmorphism** - Modern frosted glass effects
- **Gradient Accents** - Vibrant color gradients
- **Smooth Animations** - Fade-ins, hover effects, and transitions
- **Custom Components** - Reusable, styled components
- **Responsive Layout** - Mobile-first design

## 📁 Project Structure

```
SellnBuyBooks/
├── backend/
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   ├── middleware/      # Auth middleware
│   ├── public/          # Old HTML files (deprecated)
│   ├── uploads/         # Uploaded images
│   └── server.js        # Express server
├── frontend/
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Page components
│   │   ├── context/     # Auth context
│   │   ├── utils/       # API utilities
│   │   └── App.jsx      # Main app component
│   ├── index.html
│   └── vite.config.js
└── README.md
```

## 🔧 Troubleshooting

### PowerShell Script Execution Error

If you see "running scripts is disabled", run PowerShell as Administrator:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Port Already in Use

If port 5000 or 3000 is in use, change the port in:
- Backend: `.env` file
- Frontend: `vite.config.js`

### MongoDB Connection Error

Ensure MongoDB is running and the connection string in `.env` is correct.

## 🎉 What's New

### Backend Fixes
- ✅ Added missing fields to Book model (description, condition, purchaseDate, info, phone, isSold)
- ✅ Fixed form field mapping between frontend and backend
- ✅ Implemented 3-second dummy payment simulation
- ✅ Added sold status tracking
- ✅ Prevented duplicate purchases
- ✅ Better error messages

### Frontend Overhaul
- ✅ Complete React + Vite rebuild
- ✅ Modern design system with CSS variables
- ✅ Glassmorphism and gradient effects
- ✅ Image upload with live preview
- ✅ Book details modal
- ✅ Loading states and animations
- ✅ Responsive layout
- ✅ Protected routes with authentication

## 📝 License

MIT License
