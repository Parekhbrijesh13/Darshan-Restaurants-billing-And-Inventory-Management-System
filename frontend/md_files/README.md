# 🍽️ Darshan Restaurants - Billing & Inventory Management System

A complete, modern restaurant billing and inventory management web application built with **React**, **Vite**, **TailwindCSS**, **React Router**, and **Recharts**.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18.2.0-61dafb.svg)
![Vite](https://img.shields.io/badge/Vite-5.0.8-646cff.svg)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.0-38bdf8.svg)

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation & Setup](#-installation--setup)
- [Usage Guide](#-usage-guide)
- [Page Overview](#-page-overview)
- [Configuration](#-configuration)
- [Future Enhancements](#-future-enhancements)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

### 🔐 Authentication
- Clean, minimal login page with form validation
- Session-based authentication using localStorage
- Protected routes with automatic redirect

### 📊 Dashboard
- Real-time sales overview with summary cards
- Interactive sales trend charts (Recharts)
- Category-wise sales distribution (Pie chart)
- Monthly sales comparison (Bar chart)
- Quick stats for customers, avg order value, and low stock alerts

### 🛒 POS (Point of Sale)
- Grid layout for menu items with categories
- Category filters (Starters, Main Course, Breads, Beverages, Desserts)
- Real-time cart management with quantity controls
- Automatic GST calculation (5%)
- Print receipt functionality (window.print)
- Customer name input (optional)
- Currency: INR (₹)

### 📋 Orders Management
- List all orders with status badges (Pending, Completed, Cancelled)
- Search by order ID or customer name
- Filter by order status
- View order details in modal
- Order summary with items, totals, and payment info

### 📦 Inventory Management
- Complete CRUD operations (Create, Read, Update, Delete)
- Low stock alerts with visual indicators
- Category-based filtering
- Search functionality
- Reorder level tracking
- Status badges (In Stock / Low Stock)

### 👥 Customers Management
- Customer database with contact details
- Customer statistics (total orders, spent, loyalty points)
- Status tracking (New, Active, VIP)
- Add new customers
- Search and filter by status

### 📈 Reports & Analytics
- Multiple report types (Sales, Inventory, Orders)
- Date range filters (Daily, Weekly, Monthly, Yearly)
- Interactive charts and visualizations
- **Export to CSV** functionality
- **Print reports** (optimized print layout)
- Summary statistics

### ⚙️ Settings
- Restaurant information management
- User profile configuration
- Password change functionality
- System settings (currency, tax rate, order prefix)
- Low stock threshold configuration
- Danger zone (clear data, reset settings)

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 18.2** | UI library for building components |
| **Vite 5.0** | Fast build tool and dev server |
| **TailwindCSS 3.4** | Utility-first CSS framework |
| **React Router 6.21** | Client-side routing |
| **Recharts 2.10** | Chart library for data visualization |
| **PostCSS & Autoprefixer** | CSS processing |

---

## 📁 Project Structure

```
darshan-restaurants/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.jsx        # Reusable button component
│   │   │   ├── Card.jsx          # Card container component
│   │   │   ├── Modal.jsx         # Modal dialog component
│   │   │   ├── Table.jsx         # Table component
│   │   │   ├── Input.jsx         # Input field component
│   │   │   ├── Select.jsx        # Select dropdown component
│   │   │   └── Badge.jsx         # Badge/status component
│   │   └── Layout.jsx            # Main layout with sidebar & header
│   ├── data/
│   │   ├── menuItems.js          # Menu items dummy data
│   │   ├── orders.js             # Orders dummy data
│   │   ├── inventory.js          # Inventory dummy data
│   │   ├── customers.js          # Customers dummy data
│   │   └── salesData.js          # Sales & analytics data
│   ├── pages/
│   │   ├── Login.jsx             # Login/authentication page
│   │   ├── Dashboard.jsx         # Dashboard with charts
│   │   ├── POS.jsx               # Point of Sale page
│   │   ├── Orders.jsx            # Orders management
│   │   ├── Inventory.jsx         # Inventory management
│   │   ├── Customers.jsx         # Customers management
│   │   ├── Reports.jsx           # Reports & analytics
│   │   └── Settings.jsx          # Settings & configuration
│   ├── App.jsx                   # Main app with routing
│   ├── main.jsx                  # Entry point
│   └── index.css                 # Global styles with Tailwind
├── index.html                    # HTML template
├── package.json                  # Dependencies
├── vite.config.js                # Vite configuration
├── tailwind.config.js            # Tailwind configuration
├── postcss.config.js             # PostCSS configuration
└── README.md                     # This file
```

---

## 🚀 Installation & Setup

### Prerequisites
- **Node.js** (v16 or higher)
- **npm** or **yarn**

### Step 1: Clone or Download the Project
```bash
# If using git
git clone <repository-url>
cd darshan-restaurants

# Or simply extract the project files to a folder
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Start Development Server
```bash
npm run dev
```

The application will start at **http://localhost:3000**

### Step 4: Build for Production
```bash
npm run build
```

Build files will be generated in the `dist/` folder.

### Step 5: Preview Production Build
```bash
npm run preview
```

---

## 📖 Usage Guide

### Login
1. Open the application at `http://localhost:3000`
2. **Demo Access**: Use any email and password to login (authentication is simulated)
3. Click "Sign In" to enter the application

### Dashboard
- View today's sales, orders, and alerts
- Analyze sales trends with interactive charts
- Monitor category-wise performance
- Track monthly sales comparison

### POS (Point of Sale)
1. Browse menu items by category
2. Click on items to add them to cart
3. Adjust quantities using +/- buttons
4. Enter customer name (optional)
5. Review totals (Subtotal, GST 5%, Total)
6. Click "Print Receipt" to generate and print bill
7. Use "Clear Cart" to start fresh

### Orders
1. View all orders in table format
2. Search by order ID or customer name
3. Filter by status (All, Pending, Completed, Cancelled)
4. Click "View" to see order details
5. Print individual receipts from order details

### Inventory
1. View all inventory items with stock levels
2. Use search to find specific items
3. Filter by category
4. Click "Add Item" to create new inventory entry
5. Click "Edit" to update item details
6. Click "Delete" to remove items
7. Monitor low stock alerts (red indicators)

### Customers
1. View customer database with statistics
2. See total orders, spent amount, and loyalty points
3. Filter by customer status (New, Active, VIP)
4. Click "Add Customer" to register new customers
5. Search by name, email, or phone

### Reports
1. Select report type (Sales, Inventory, Orders)
2. Choose date range filter
3. View interactive charts and tables
4. Click "Export CSV" to download data
5. Click "Print Report" to print formatted report

### Settings
1. Update restaurant information
2. Modify user profile details
3. Change password
4. Configure system settings (currency, tax rate, etc.)
5. Manage danger zone operations

---

## 📄 Page Overview

### Currently Completed Features

| Page | Features | Status |
|------|----------|--------|
| **Login** | Form validation, session auth, responsive design | ✅ Complete |
| **Dashboard** | Summary cards, sales charts, category analysis | ✅ Complete |
| **POS** | Menu grid, cart, checkout, GST calc, print receipt | ✅ Complete |
| **Orders** | List view, filters, search, detail modal | ✅ Complete |
| **Inventory** | CRUD operations, low stock alerts, search | ✅ Complete |
| **Customers** | Customer list, stats, add new, filters | ✅ Complete |
| **Reports** | Charts, CSV export, print, multiple report types | ✅ Complete |
| **Settings** | Restaurant info, profile, password, system config | ✅ Complete |

### Functional Entry URIs

| Path | Description | Access |
|------|-------------|--------|
| `/` | Login page | Public |
| `/dashboard` | Main dashboard with analytics | Protected |
| `/pos` | Point of Sale for billing | Protected |
| `/orders` | Orders management | Protected |
| `/inventory` | Inventory management | Protected |
| `/customers` | Customer database | Protected |
| `/reports` | Reports & analytics | Protected |
| `/settings` | Application settings | Protected |

---

## ⚙️ Configuration

### Tax Configuration
- Default GST: **5%**
- Configurable in Settings page
- Location: `src/pages/POS.jsx` (line 48)

### Currency
- Default: **INR (₹)**
- Configurable in Settings page

### Low Stock Threshold
- Default: **20 units**
- Configurable per item in Inventory
- Global setting in Settings page

### Order ID Prefix
- Default: **ORD**
- Configurable in Settings page

---

## 🚧 Features Not Yet Implemented

The current version is a **frontend-only theme** with dummy data. The following features require backend integration:

1. **Backend API Integration**
   - Real database connection
   - RESTful API endpoints
   - User authentication system

2. **Real-time Updates**
   - WebSocket connections for live orders
   - Real-time inventory sync
   - Live dashboard updates

3. **Advanced Features**
   - Multi-user roles & permissions
   - Kitchen display system (KDS)
   - Table management
   - Reservation system
   - Email notifications
   - SMS alerts for low stock

4. **Payment Integration**
   - Multiple payment gateways
   - Split payments
   - Refund management

5. **Advanced Reports**
   - PDF export
   - Email reports
   - Scheduled reports
   - Advanced analytics

---

## 🎯 Recommended Next Steps

1. **Backend Development**
   - Set up Node.js/Express or Django backend
   - Create REST API endpoints for all CRUD operations
   - Implement JWT authentication
   - Connect to MongoDB/PostgreSQL database

2. **State Management**
   - Integrate Redux or Context API for global state
   - Implement real-time data synchronization

3. **Advanced Features**
   - Add role-based access control
   - Implement multi-location support
   - Add table/order tracking
   - Integrate payment gateways

4. **Testing**
   - Add unit tests (Jest, React Testing Library)
   - Add E2E tests (Cypress/Playwright)

5. **Deployment**
   - Deploy backend to Heroku/AWS/DigitalOcean
   - Deploy frontend to Vercel/Netlify
   - Set up CI/CD pipeline

---

## 🎨 Design Guidelines

- **Colors**: Soft blues (primary), warm yellows (accent), subtle grays
- **Typography**: Inter font family
- **Spacing**: Consistent padding and margins
- **Transitions**: Smooth 200ms transitions on hover/focus
- **Responsive**: Mobile-first design, works on tablets and desktops
- **Accessibility**: Proper ARIA labels, semantic HTML

---

## 🤝 Contributing

This is a complete theme ready for integration. To customize:

1. **Modify dummy data** in `src/data/` folder
2. **Update colors** in `tailwind.config.js`
3. **Add new pages** following existing structure
4. **Extend components** in `src/components/ui/`

---

## 📝 License

MIT License - Free to use for personal and commercial projects.

---

## 💡 Support

For questions or issues:
- Review the code documentation
- Check component props in UI components
- Refer to React Router and Recharts documentation

---

## 🌟 Acknowledgments

- **React Team** for the amazing framework
- **Vite Team** for the blazing-fast build tool
- **TailwindCSS** for the utility-first CSS approach
- **Recharts** for beautiful, composable charts

---

**Built with ❤️ for Restaurant Management**

---

## 📸 Screenshots

### Login Page
Clean, minimal authentication with subtle gradient background.

### Dashboard
Interactive charts showing sales trends, category distribution, and monthly comparisons.

### POS
Intuitive point-of-sale interface with menu grid and live cart.

### Inventory Management
Complete CRUD operations with low stock alerts and category filtering.

---

**Happy Billing! 🍽️**
