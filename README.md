# Heal App - Mental Health Tracking Application

A mental health tracking application with features for tracking mood, journal, habits, and sleep.

## 🚀 Features

- **Mood Tracking**: Track daily mood with scores and notes
- **Journal**: Write journal entries with suggested prompts
- **Habits**: Manage and track daily habits
- **Sleep Tracking**: Track sleep duration and quality
- **Dashboard Overview**: Statistics overview and insights
- **Wellness Facts**: Health facts and tips
- **Subscription**: Premium subscription system with PayPal

## 📋 System Requirements

- Node.js >= 16.x
- MongoDB (local or MongoDB Atlas)
- npm or yarn

## 🛠️ Installation

### 1. Clone repository

```bash
git clone <repository-url>
cd Heal-main
```

### 2. Install Backend

```bash
cd backend
npm install
```

### 3. Install Frontend

```bash
cd ../frontend
npm install
```

## ⚙️ Environment Variables Configuration

### Backend Environment Variables

Create a `.env` file in the `backend/src/` directory:

```env
# MongoDB Connection
MONGODB_CONNECTION_STRING=mongodb://localhost:27017/heal-app
# Or MongoDB Atlas:
# MONGODB_CONNECTION_STRING=mongodb+srv://username:password@cluster.mongodb.net/heal-app

# Server Configuration
PORT=5001
NODE_ENV=development

# JWT Secret (generate a strong random string)
ACCESS_TOKEN_SECRET=your-super-secret-jwt-key-here-minimum-32-characters

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173

# PayPal Configuration (Optional - for payment feature)
PAYPAL_CLIENT_ID=your-paypal-client-id
PAYPAL_CLIENT_SECRET=your-paypal-client-secret
PAYPAL_MODE=sandbox
# Or use PayPal.me (alternative to PayPal SDK)
PAYPAL_ME_USERNAME=your-paypal-me-username
```

**Environment Variables Notes:**

- `MONGODB_CONNECTION_STRING`: **Required** - MongoDB connection string
- `ACCESS_TOKEN_SECRET`: **Required** - Secret key for JWT token generation (should use a strong random string, minimum 32 characters)
- `PORT`: Optional - Port for backend server (default: 5001)
- `NODE_ENV`: Optional - Runtime environment (development/production)
- `FRONTEND_URL`: Optional - Frontend URL for CORS (default: http://localhost:5173)
- `PAYPAL_CLIENT_ID`: Optional - PayPal Client ID (only needed if using PayPal SDK)
- `PAYPAL_CLIENT_SECRET`: Optional - PayPal Client Secret (only needed if using PayPal SDK)
- `PAYPAL_MODE`: Optional - PayPal mode: `sandbox` or `live` (default: sandbox)
- `PAYPAL_ME_USERNAME`: Optional - PayPal.me username (alternative to PayPal SDK)

### Frontend Environment Variables

Create a `.env` file in the `frontend/` directory:

```env
# API Base URL
VITE_API_URL=http://localhost:5001/api
```

**Note:** With Vite, all environment variables must start with `VITE_` to be exposed to the client.

## 🚀 Running the Application

### Development Mode

#### 1. Start MongoDB

Ensure MongoDB is running locally or you have a connection to MongoDB Atlas.

#### 2. Start Backend

```bash
cd backend
npm run dev
```

Backend will run at: `http://localhost:5001`

#### 3. Start Frontend

Open a new terminal:

```bash
cd frontend
npm run dev
```

Frontend will run at: `http://localhost:5173`

### Production Mode

#### Build Frontend

```bash
cd frontend
npm run build
```

#### Start Backend

```bash
cd backend
npm start
```

## 📚 API Documentation

### Swagger UI

The backend includes Swagger documentation with all API endpoints documented using JSDoc annotations in the route files. After starting the backend, access the interactive Swagger UI at:

```
http://localhost:5001/api-docs
```

The Swagger documentation is automatically generated from the `@swagger` annotations in the route files located in `backend/src/routes/`.

## 🗂️ Project Structure

```
Heal-main/
├── backend/
│   ├── src/
│   │   ├── controllers/     # Business logic
│   │   ├── models/          # MongoDB models
│   │   ├── routes/          # API routes
│   │   ├── middlewares/     # Auth middleware
│   │   ├── libs/            # Database connection
│   │   ├── utils/           # Utility functions
│   │   └── server.js        # Entry point
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API services
│   │   ├── context/         # React contexts
│   │   └── utils/           # Utility functions
│   └── package.json
├── API_DOCUMENTATION.md     # API documentation
└── README.md               # This file
```

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for authentication:

1. **Sign Up**: Create a new account
2. **Sign In**: Login and receive access token
3. **Protected Routes**: Send token in header `Authorization: Bearer <token>`

Access token expires in 30 minutes. Refresh token is stored in HTTP-only cookie.

## 💳 Payment Integration

The application supports 2 PayPal payment methods:

1. **PayPal SDK**: Using PayPal Checkout SDK (requires `PAYPAL_CLIENT_ID` and `PAYPAL_CLIENT_SECRET`)
2. **PayPal.me**: Using PayPal.me link (only requires `PAYPAL_ME_USERNAME`)

If PayPal is not configured, the system will run in demo mode.

## 🧪 Testing

### Test API with cURL

```bash
# Sign up
curl -X POST http://localhost:5001/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"password123","displayName":"Test User"}'

# Sign in
curl -X POST http://localhost:5001/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"password123"}'

# Get user info (requires token)
curl -X GET http://localhost:5001/api/users/me \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

## 🐛 Troubleshooting

### MongoDB Connection Error

- Check if MongoDB is running
- Verify `MONGODB_CONNECTION_STRING` in `.env` file
- Ensure `.env` file is in the correct location: `backend/src/.env`

### CORS Error

- Check `FRONTEND_URL` in backend `.env` matches frontend URL
- Ensure frontend is running on the correct port

### JWT Error

- Check if `ACCESS_TOKEN_SECRET` is set in `.env`
- Ensure secret key is strong enough (minimum 32 characters)

### PayPal Error

- If payment feature is not needed, you can skip PayPal variables
- System will automatically switch to demo mode

## 📝 Scripts

### Backend

- `npm run dev` - Run development server with nodemon
- `npm start` - Run production server

### Frontend

- `npm run dev` - Run development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

ISC

## 👥 Authors

- Trinh Xuan Khai
- Nguyen Nhan Thieu

## 🙏 Acknowledgments

- MongoDB
- Express.js
- React
- Vite
- Tailwind CSS
- PayPal SDK

---

**Important Notes:** 

- Do not commit `.env` file to git
- Use `.env.example` to share environment variable structure
- In production, use secure and safe environment variables

