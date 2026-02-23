# Setup Instructions for Darshan Restaurants

## Quick Start (3 Steps)

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Open Browser
Navigate to: http://localhost:3000

## Login Credentials
**Demo Access**: Use any email and password to login

Example:
- Email: admin@darshanrestaurants.com
- Password: any password

## Available Scripts

- `npm run dev` - Start development server (port 3000)
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Tech Stack
- React 18.2 + Vite 5.0
- TailwindCSS 3.4
- React Router 6.21
- Recharts 2.10

## Project Features
✅ Login/Authentication
✅ Dashboard with Charts
✅ POS System with Cart
✅ Orders Management
✅ Inventory Management (CRUD)
✅ Customers Management
✅ Reports with CSV/Print Export
✅ Settings & Configuration

## File Structure
```
src/
├── components/    # Reusable UI components
├── data/          # Dummy data files
├── pages/         # Application pages
├── App.jsx        # Main app with routing
└── main.jsx       # Entry point
```

## Customization
- **Colors**: Edit `tailwind.config.js`
- **Data**: Modify files in `src/data/`
- **Logo**: Replace emoji in Layout and Login
- **Tax Rate**: Change in POS.jsx (line 48)

## Browser Support
- Chrome (recommended)
- Firefox
- Safari
- Edge

## Need Help?
Check README.md for detailed documentation.
