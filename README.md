# Home Decor

**Home Decor** is an online store for home products, built with **Angular 14** on the frontend and **Node.js + Express** on the backend, using **MongoDB** as the database.

---

## Features

- Browse and search home products
- Add products to cart and checkout
- User authentication and profile management (JWT with Passport)
- Favorites management
- Orders and shopping cart
- Backend API with structured routes

---

## Technologies

- **Frontend:** Angular 14
- **Backend:** Node.js + Express
- **Database:** MongoDB (with `migrate-mongo` for migrations)
- **Authentication:** JWT via Passport
- **Package Manager:** npm

---

## Installation

### Backend

1. Navigate to the backend folder:
```bash
cd backend
```
2. Install dependencies:
```bash
npm install
```
3. Install migrate-mongo globally:
```bash
npm install -g migrate-mongo
```
4. Run database migrations:
```bash
migrate-mongo up
```
5. Start the backend server:
```bash
npm start
```

### Frontend

1. Navigate to the frontend folder:
```bash
cd frontend
```
2. Install dependencies:
```bash
npm install
```
3. Start the Angular application:
```bash
npm start
```

The frontend will run on http://localhost:4200 by default.


## Usage

1. Start the backend server first.
2. Start the frontend application.
3. Open your browser and visit http://localhost:4200 to access the Home Decor store.
