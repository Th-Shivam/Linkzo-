# 🚀 Linkzo - Modern Social Media Marketing Agency Website

A complete, modern, and responsive website for Linkzo Social Media Marketing Agency with database integration and admin panel.

## ✨ Features

### 🎯 Interactive Landing Screen
- **Fullscreen Choice Interface**: Users choose between "Company/Brand" or "Creator/Influencer"
- **Modern Design**: Dark blue background with neon green/blue accents
- **Smooth Animations**: Fade, slide, and scale transitions
- **Mobile-Responsive**: Optimized for all device sizes

### 📝 Dynamic Forms
- **Company Order Form**: Company name, email, service selection, budget range
- **Creator Registration Form**: Name, email, social links, niche, audience size
- **Real-time Validation**: Email and URL validation with visual feedback
- **Loading States**: Animated loading indicators during submission

### 🗄️ Database Integration
- **SQLite Database**: Lightweight, file-based database
- **Automatic Table Creation**: Companies and creators tables
- **Data Persistence**: All submissions stored securely
- **RESTful API**: Clean API endpoints for data operations

### 👨‍💼 Admin Panel
- **Dashboard**: Real-time statistics and overview
- **Company Orders**: View all submitted company orders
- **Creator Registrations**: Manage creator network applications
- **Responsive Tables**: Mobile-friendly data display
- **Auto-refresh**: Real-time data updates

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: Node.js, Express.js
- **Database**: SQLite3
- **Styling**: Modern CSS with CSS Grid and Flexbox
- **Icons**: Font Awesome 6
- **Fonts**: Inter (Google Fonts)

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Th-Shivam/Linkzo-.git
   cd linkzo
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the server**
   ```bash
   npm start
   ```

4. **Access the website**
   - Main Website: http://localhost:3000
   - Admin Panel: http://localhost:3000/admin

## 📁 Project Structure

```
linkzo/
├── public/                 # Frontend files
│   ├── index.html         # Main website
│   ├── admin.html         # Admin panel
│   ├── styles.css         # CSS styles
│   └── script.js          # Frontend JavaScript
├── server.js              # Node.js server
├── package.json           # Dependencies
├── linkzo.db             # SQLite database (auto-created)
└── README.md             # This file
```

## 🔌 API Endpoints

### Public Endpoints
- `GET /` - Main website
- `POST /api/company-order` - Submit company order
- `POST /api/creator-register` - Register as creator

### Admin Endpoints
- `GET /admin` - Admin panel
- `GET /api/admin/stats` - Dashboard statistics
- `GET /api/admin/companies` - All company orders
- `GET /api/admin/creators` - All creator registrations

## 💾 Database Schema

### Companies Table
```sql
CREATE TABLE companies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_name TEXT NOT NULL,
    email TEXT NOT NULL,
    service_required TEXT NOT NULL,
    budget_range TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Creators Table
```sql
CREATE TABLE creators (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    instagram TEXT,
    youtube TEXT,
    tiktok TEXT,
    twitter TEXT,
    niche TEXT NOT NULL,
    audience_size TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## 🎨 Design Features

### Color Scheme
- **Primary**: #1a1f36 (Dark Blue)
- **Secondary**: #2d3561 (Medium Blue)
- **Accent**: #00ff88 (Neon Green)
- **Accent Blue**: #00d4ff (Neon Blue)
- **Background**: #0a0e1a (Very Dark Blue)

### Animations
- **Landing Screen**: Floating orbs with complex movement
- **Form Transitions**: Smooth fade and slide effects
- **Hover Effects**: Scale, glow, and transform animations
- **Loading States**: Spinner and pulse animations

### Responsive Design
- **Mobile-First**: Optimized for mobile devices
- **Breakpoints**: 768px (tablet), 480px (mobile)
- **Flexible Layouts**: CSS Grid and Flexbox
- **Touch-Friendly**: Large buttons and touch targets

## 🔧 Development

### Running in Development Mode
```bash
npm run dev  # Uses nodemon for auto-restart
```

### Environment Variables
Create a `.env` file for configuration:
```env
PORT=3000
NODE_ENV=development
```

### Adding New Features
1. **Frontend**: Modify files in `/public/` directory
2. **Backend**: Update `server.js` for new API endpoints
3. **Database**: Add new tables or columns as needed

## 📱 Mobile Optimization

- **Responsive Grid**: Adapts to screen size
- **Touch Gestures**: Optimized for mobile interaction
- **Fast Loading**: Optimized assets and code
- **Offline Support**: Basic offline functionality

## 🔒 Security Features

- **Input Validation**: Server-side validation for all inputs
- **SQL Injection Protection**: Parameterized queries
- **XSS Prevention**: HTML escaping for user data
- **CORS Configuration**: Proper cross-origin settings

## 📊 Admin Panel Features

### Dashboard
- Total companies registered
- Total creators in network
- Real-time statistics
- Auto-refresh functionality

### Data Management
- **Sortable Tables**: Click headers to sort
- **Search Functionality**: Filter data easily
- **Export Options**: Download data as needed
- **Responsive Design**: Works on all devices

## 🚀 Deployment

### Production Setup
1. **Environment**: Set NODE_ENV=production
2. **Database**: Ensure SQLite file permissions
3. **Process Manager**: Use PM2 for production
4. **Reverse Proxy**: Configure Nginx/Apache

### PM2 Deployment
```bash
npm install -g pm2
pm2 start server.js --name "linkzo"
pm2 startup
pm2 save
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support and questions:
- **Email**: support@linkzo.com
- **Phone**: +91-8933865404
- **Website**: https://linkzo.com

## 🎯 Future Enhancements

- [ ] Email notifications for new submissions
- [ ] Advanced analytics dashboard
- [ ] User authentication system
- [ ] File upload functionality
- [ ] Payment integration
- [ ] Multi-language support
- [ ] Dark/Light theme toggle
- [ ] Advanced search and filtering
- [ ] Data export functionality
- [ ] Mobile app development

---

**Built with ❤️ by the Linkzo Team**

*Empowering businesses and creators through digital marketing excellence.*
