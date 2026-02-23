# Quick Reference Guide

## 🚀 Quick Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 🔑 Default Login
- **Email**: Any email (e.g., admin@test.com)
- **Password**: Any password
- **Note**: Demo authentication (localStorage-based)

---

## 📱 Pages & Routes

| Page | Route | Description |
|------|-------|-------------|
| Login | `/` | Authentication page |
| Dashboard | `/dashboard` | Analytics & overview |
| POS | `/pos` | Point of Sale / Billing |
| Orders | `/orders` | Order management |
| Inventory | `/inventory` | Stock management |
| Customers | `/customers` | Customer database |
| Reports | `/reports` | Business reports |
| Settings | `/settings` | Configuration |

---

## 🎨 UI Components

```jsx
// Import any component
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Modal from '../components/ui/Modal';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Badge from '../components/ui/Badge';
import Table from '../components/ui/Table';
```

### Button Variants
```jsx
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="success">Success</Button>
<Button variant="danger">Danger</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
```

### Badge Variants
```jsx
<Badge variant="primary">Primary</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="danger">Danger</Badge>
<Badge variant="info">Info</Badge>
```

---

## 📊 Data Structure

### Menu Item
```javascript
{
  id: 1,
  name: 'Paneer Tikka',
  category: 'Starters',
  price: 180,
  image: '🧀',
  description: 'Grilled cottage cheese'
}
```

### Order
```javascript
{
  id: 'ORD001',
  customerName: 'John Doe',
  items: [...],
  subtotal: 500,
  tax: 25,
  total: 525,
  status: 'Completed',
  date: '2024-01-15T10:30:00',
  paymentMethod: 'Cash'
}
```

### Inventory Item
```javascript
{
  id: 1,
  name: 'Paneer Tikka',
  category: 'Starters',
  quantity: 45,
  unit: 'plates',
  reorderLevel: 20,
  price: 180,
  status: 'In Stock'
}
```

### Customer
```javascript
{
  id: 1,
  name: 'John Doe',
  email: 'john@example.com',
  phone: '+91 98765 43210',
  totalOrders: 24,
  totalSpent: 18500,
  loyaltyPoints: 185,
  status: 'Active'
}
```

---

## 🎯 Key Features

### POS System
- ✅ Menu grid with categories
- ✅ Cart management
- ✅ GST calculation (5%)
- ✅ Print receipt (Ctrl+P)

### Inventory
- ✅ Add items
- ✅ Edit items
- ✅ Delete items
- ✅ Low stock alerts

### Reports
- ✅ View analytics
- ✅ Export CSV
- ✅ Print report

### Orders
- ✅ View all orders
- ✅ Filter by status
- ✅ Search orders
- ✅ View details

---

## 🔧 Configuration

### Tax Rate (POS)
File: `src/pages/POS.jsx`
```javascript
const gst = subtotal * 0.05; // 5% GST
```

### Currency
All prices use INR (₹) symbol

### Low Stock Threshold
Default: 20 units  
Configure per item in Inventory page

### Order ID Prefix
Default: "ORD"  
Change in Settings page

---

## 🎨 Colors

### Primary Colors
```javascript
primary-600: #0284c7 (Blue)
accent-500: #d97706 (Gold/Yellow)
```

### Status Colors
```javascript
success: #10b981 (Green)
warning: #fbbf24 (Yellow)
danger: #ef4444 (Red)
info: #3b82f6 (Blue)
```

### Modify Colors
File: `tailwind.config.js`

---

## 📝 Common Tasks

### Add New Menu Item
1. Edit `src/data/menuItems.js`
2. Add object to array
3. Save file

### Add New Page
1. Create file in `src/pages/`
2. Add route in `src/App.jsx`
3. Add nav item in `src/components/Layout.jsx`

### Customize Logo
Replace emoji "🍽️" in:
- `src/components/Layout.jsx`
- `src/pages/Login.jsx`

### Change Theme Colors
Edit `tailwind.config.js`:
```javascript
colors: {
  primary: { /* your colors */ },
  accent: { /* your colors */ }
}
```

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
npx kill-port 3000
# Then restart
npm run dev
```

### Dependencies Error
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build Error
```bash
# Clear Vite cache
rm -rf node_modules/.vite
npm run dev
```

### Chart Not Rendering
- Ensure container has fixed height
- Check Recharts data format
- Verify import paths

---

## 📦 Deployment

### Vercel
```bash
npm run build
# Connect GitHub repo to Vercel
```

### Netlify
```bash
npm run build
# Drag & drop dist/ folder to Netlify
```

### GitHub Pages
```bash
npm run build
# Deploy dist/ folder to gh-pages branch
```

---

## 🔍 File Locations

### UI Components
`src/components/ui/`

### Pages
`src/pages/`

### Data
`src/data/`

### Styles
`src/index.css`

### Configuration
Root directory (`.js`, `.json` files)

---

## 💡 Tips

1. **Use TailwindCSS classes** for consistent styling
2. **Reuse UI components** instead of creating new ones
3. **Follow existing patterns** when adding features
4. **Test print layouts** with Ctrl+P / Cmd+P
5. **Check responsive design** on different screen sizes

---

## 📞 Support

### Documentation
- `README.md` - Full documentation
- `SETUP.md` - Quick setup guide
- `FILE_STRUCTURE.md` - Complete file listing
- `PROJECT_SUMMARY.md` - Project overview

### External Resources
- React: https://react.dev
- Vite: https://vitejs.dev
- TailwindCSS: https://tailwindcss.com
- Recharts: https://recharts.org

---

**Quick Start**: `npm install` → `npm run dev` → Open http://localhost:3000

**Login**: Any email/password → Explore all features!

---

Last Updated: January 27, 2024
