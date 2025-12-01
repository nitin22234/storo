# Storo - Luggage Storage Platform

A full-stack web application that connects travelers with secure luggage storage partners across India. Users can find nearby storage locations, make bookings, and manage their luggage storage needs seamlessly.

---

## 🚀 Features

### For Users
- **Search & Book**: Find nearby storage partners based on location
- **Real-time Pricing**: Dynamic pricing based on weight, duration, and base charges
- **Secure Payments**: Integrated Razorpay payment gateway
- **Booking Management**: View upcoming and previous bookings
- **User Dashboard**: Track all bookings and manage profile

### For Partners
- **Partner Registration**: Apply to become a storage partner
- **Partner Dashboard**: View bookings, earnings, and statistics
- **Booking Management**: Track customer bookings with date filters
- **Analytics**: View total bookings, earnings, and payment status

### For Admins
- **Partner Approval System**: Review and approve/reject partner applications
- **Admin Dashboard**: Monitor platform statistics
- **User Management**: View total users and partners

---

## 📁 Project Structure

```
Storo/
├── Backend/
│   ├── controllers/          # Business logic
│   │   ├── adminController.js
│   │   ├── authController.js
│   │   ├── bookingController.js
│   │   ├── partnerController.js
│   │   └── supportController.js
│   ├── middleware/           # Custom middleware
│   │   ├── adminAuth.js      # Admin authentication
│   │   └── auth.js           # User authentication
│   ├── models/               # MongoDB schemas
│   │   ├── Booking.js
│   │   ├── Partner.js
│   │   └── User.js
│   ├── routes/               # API routes
│   │   ├── adminRoutes.js
│   │   ├── authRoutes.js
│   │   ├── bookingRoutes.js
│   │   ├── partnerRoutes.js
│   │   ├── paymentRoutes.js
│   │   └── supportRoutes.js
│   ├── scripts/              # Utility scripts
│   │   ├── createAdmin.js    # Create admin user
│   │   └── seedPartners.js   # Seed sample partners
│   ├── .env                  # Environment variables
│   ├── package.json
│   └── server.js             # Entry point
│
└── frontend/
    ├── public/               # Static assets
    ├── src/
    │   ├── components/       # Reusable components
    │   │   ├── Footer.jsx
    │   │   └── Navbar.jsx
    │   ├── context/          # React Context
    │   │   └── AuthContext.js
    │   ├── pages/            # Page components
    │   │   ├── AboutUs.jsx
    │   │   ├── AdminDashboard.jsx
    │   │   ├── BecomePartner.jsx
    │   │   ├── Booking.jsx
    │   │   ├── Cities.jsx
    │   │   ├── Dashboard.jsx
    │   │   ├── FindStorage.jsx
    │   │   ├── ForgotPassword.jsx
    │   │   ├── Home.jsx
    │   │   ├── Locations.jsx
    │   │   ├── Login.jsx
    │   │   ├── Notifications.jsx
    │   │   ├── PartnerDashboard.jsx
    │   │   ├── PaymentBilling.jsx
    │   │   ├── Profile.jsx
    │   │   ├── ResetPassword.jsx
    │   │   ├── Services.jsx
    │   │   ├── Signup.jsx
    │   │   └── Support.jsx
    │   ├── api.js            # API service layer
    │   ├── App.css           # Global styles
    │   ├── App.jsx           # Main app component
    │   ├── index.css         # Base styles
    │   └── index.js          # Entry point
    ├── package.json
    └── .env                  # Environment variables
```

---

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (with Mongoose ODM)
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **Payment Gateway**: Razorpay
- **Email**: Nodemailer

### Frontend
- **Library**: React.js
- **Routing**: React Router DOM
- **Styling**: Bootstrap 5 + Custom CSS
- **State Management**: Context API
- **HTTP Client**: Fetch API

---

## 📦 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- Razorpay account (for payments)

### Backend Setup

1. Navigate to Backend directory:
```bash
cd Backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
SECRET_EXPIRY=7d
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_password
```

4. Create admin user (first time only):
```bash
node scripts/createAdmin.js
```
Default admin credentials:
- Email: `admin@storo.com`
- Password: `admin123`

5. Seed sample partners (optional):
```bash
node scripts/seedPartners.js
```

6. Start the server:
```bash
npm run dev
```

Server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_RAZORPAY_KEY_ID=your_razorpay_key_id
```

4. Start the development server:
```bash
npm start
```

Application will run on `http://localhost:3000`

---

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password/:token` - Reset password

### Partners
- `POST /api/partners/create` - Create new partner (requires partner registration)
- `POST /api/partners/nearby` - Find nearby partners
- `GET /api/partners/profile` - Get partner profile
- `GET /api/partners/stats` - Get partner statistics
- `GET /api/partners/bookings` - Get partner bookings

### Bookings
- `POST /api/bookings/create` - Create new booking
- `GET /api/bookings/user` - Get user bookings
- `GET /api/bookings/:id` - Get booking details

### Payments
- `POST /api/payments/create-order` - Create Razorpay order
- `POST /api/payments/verify` - Verify payment

### Admin
- `GET /api/admin/stats` - Get admin statistics
- `GET /api/admin/partners/pending` - Get pending partner requests
- `GET /api/admin/partners/approved` - Get approved partners
- `PUT /api/admin/partners/:id/approve` - Approve partner
- `DELETE /api/admin/partners/:id/reject` - Reject partner

### Support
- `POST /api/support/ticket` - Create support ticket

---

## 🗄️ Database Schema

### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  phone: String,
  address: String,
  role: String (enum: ['user', 'partner', 'admin']),
  partnerId: ObjectId (ref: Partner),
  resetToken: String,
  resetTokenExpiry: Date,
  timestamps: true
}
```

### Partner Model
```javascript
{
  name: String,
  address: String,
  location: {
    type: String (enum: ['Point']),
    coordinates: [Number] // [longitude, latitude]
  },
  capacity: Number,
  base: Number,
  perKg: Number,
  perHour: Number,
  isApproved: Boolean (default: false),
  timestamps: true
}
```

### Booking Model
```javascript
{
  user: ObjectId (ref: User),
  partner: ObjectId (ref: Partner),
  bags: Number,
  weight: Number,
  hours: Number,
  price: Number,
  startAt: Date,
  endAt: Date,
  status: String (enum: ['booked', 'collected', 'cancelled']),
  paymentStatus: String (enum: ['pending', 'paid', 'failed']),
  razorpayOrderId: String,
  razorpayPaymentId: String,
  timestamps: true
}
```

---

## 🎨 Design System

### Color Palette
- **Primary**: `#047857` (Green) - Trust, security, nature
- **Secondary**: `#8b3d88` (Purple) - Premium, modern
- **Accent**: `#fb923c` (Orange) - Energy, action
- **Background**: `#ffffff` (White) - Clean, professional
- **Text Primary**: `#1a1a1a` (Dark Gray)
- **Text Secondary**: `#6b7280` (Medium Gray)
- **Border**: `#e5e7eb` (Light Gray)

### Typography
- **Font Family**: 'Inter', sans-serif
- **Headings**: Bold, Dark Gray
- **Body**: Regular, Medium Gray

---

## 🔐 Security Features

- Password hashing with bcryptjs (10 salt rounds)
- JWT-based authentication
- Protected routes with middleware
- Role-based access control (User, Partner, Admin)
- Admin-only endpoints for partner approval
- Secure payment integration with Razorpay

---

## 🚦 User Flows

### User Journey
1. Sign up / Login
2. Search for storage partners by location
3. Select partner and enter booking details
4. Make payment via Razorpay
5. View booking confirmation
6. Track bookings in dashboard

### Partner Journey
1. Apply via "Become a Partner" form
2. Wait for admin approval
3. Login to partner dashboard
4. View bookings and earnings
5. Manage storage availability

### Admin Journey
1. Login with admin credentials
2. View pending partner requests
3. Approve or reject applications
4. Monitor platform statistics

---

## 📝 Scripts

### Backend Scripts

**Create Admin User**
```bash
node scripts/createAdmin.js
```
Creates an admin user with default credentials.

**Seed Partners**
```bash
node scripts/seedPartners.js
```
Seeds 21 sample partners across 8 cities in India.

---

## 🌟 Key Features Explained

### Geospatial Search
- Uses MongoDB's 2dsphere index for location-based queries
- Finds partners within specified radius
- Supports coordinate-based search

### Dynamic Pricing
```
Total Price = Base Price + (Weight × Per Kg Rate) + (Hours × Per Hour Rate)
```

### Admin Approval System
- New partners require admin approval
- Only approved partners appear in search results
- Admin can view pending/approved partners separately

### Booking Management
- Separate views for upcoming and previous bookings
- Status tracking (booked, collected, cancelled)
- Payment status monitoring

---

## 🐛 Troubleshooting

### Backend won't start
- Check MongoDB connection string in `.env`
- Ensure MongoDB is running
- Verify all environment variables are set

### Frontend can't connect to backend
- Check `REACT_APP_API_URL` in frontend `.env`
- Ensure backend is running on correct port
- Check CORS settings in `server.js`

### Payment integration issues
- Verify Razorpay keys in both frontend and backend `.env`
- Check Razorpay dashboard for test mode
- Ensure payment verification endpoint is working

### Partners not showing in search
- Check if partners are approved (`isApproved: true`)
- Verify location coordinates are valid
- Ensure 2dsphere index is created on Partner model

---

## 📄 License

This project is created for educational purposes.

---

## 👨‍💻 Developer

**Nitin Sharma**

For any queries or support, please contact through the support page on the website.

---

## 🙏 Acknowledgments

- Bootstrap for UI components
- Razorpay for payment gateway
- MongoDB Atlas for cloud database
- React community for excellent documentation
#   S t o r o  
 #   S t o r o  
 #   S t o r o  
 