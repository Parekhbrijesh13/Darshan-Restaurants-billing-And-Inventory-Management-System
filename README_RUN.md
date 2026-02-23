# Darshan Restaurant Billing & Inventory (React + Spring Boot)

This ZIP contains:
- `frontend/` (your existing React UI, layout unchanged; only data wired to backend)
- `backend/darshan-backend/` (Spring Boot REST API + MySQL + JWT)

## 1) Prerequisites
- Node.js 18+
- Java 17+
- Maven 3.9+
- MySQL 8+

## 2) MySQL setup
Create DB and seed data:

1. Open MySQL Workbench
2. Run:
   - `backend/darshan-backend/src/main/resources/db/schema.sql`
   - `backend/darshan-backend/src/main/resources/db/seed.sql`

Default DB config (change in `backend/.../application.yml`):
- DB: `darshan_db`
- user: `root`
- pass: `root`

## 3) Run backend
```bash
cd backend/darshan-backend
mvn spring-boot:run
```
Backend runs on: `http://localhost:8080`

### Login
- ADMIN:
  - username: `admin`
  - password: `admin123`
- STAFF:
  - username: `staff`
  - password: `staff123`

## 4) Run frontend
```bash
cd frontend
npm install
npm run dev
```
Frontend runs on: `http://localhost:5173`

## 5) Key APIs
- POST `http://localhost:8080/api/auth/login`
- GET  `http://localhost:8080/api/products/pos`
- POST `http://localhost:8080/api/orders/checkout`
- GET  `http://localhost:8080/api/inventory`

## Notes
- POS "Print Receipt" now first calls checkout API (creates order + reduces stock), then prints the same receipt UI.
- UI design/layout is unchanged.
