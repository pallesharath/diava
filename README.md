# 🌿 Diava Website — React Project

**Balanced Food for a Balanced Life**

A complete React website for Diava with a built-in Admin Dashboard.

---

## 📁 Project Structure

```
diava-project/
│
├── public/
│   └── index.html              ← HTML shell / browser tab title
│
├── src/
│   ├── index.js                ← React entry point (renders App)
│   ├── App.js                  ← Root: routing, shared state, layout
│   │
│   ├── assets/
│   │   └── diava-logo.png      ← Diava logo image
│   │
│   ├── styles/
│   │   └── global.css          ← Reset, shared buttons, animations
│   │
│   ├── data/                   ← All initial data (edit here to change defaults)
│   │   ├── products.js
│   │   ├── categories.js
│   │   └── ads.js
│   │
│   ├── components/             ← Reusable components used across pages
│   │   ├── Navbar.jsx / .css
│   │   ├── Footer.jsx / .css
│   │   └── ProductModal.jsx / .css
│   │
│   ├── pages/                  ← One file per website page
│   │   ├── HomePage.jsx / .css
│   │   ├── ProductsPage.jsx / .css
│   │   ├── AboutPage.jsx / .css
│   │   └── ContactPage.jsx / .css
│   │
│   └── admin/                  ← Admin dashboard (password protected)
│       ├── adminConfig.js      ← ⚙️  Change password here
│       ├── AdminLogin.jsx / .css
│       ├── AdminDashboard.jsx / .css
│       ├── AdminProducts.jsx
│       ├── AdminCategories.jsx
│       ├── AdminAds.jsx
│       └── AdminShared.css
│
└── package.json
```

---

## 🚀 How to Run in VS Code

### Step 1 — Install Node.js
Download from https://nodejs.org (choose LTS version)
After install, open a terminal and check:
```bash
node -v    # should show v18 or above
npm -v     # should show 9 or above
```

### Step 2 — Open project in VS Code
1. Open VS Code
2. **File → Open Folder** → select the `diava-project` folder
3. Open the built-in terminal: **Terminal → New Terminal**

### Step 3 — Install dependencies
```bash
npm install
```
This downloads React and all required packages into a `node_modules` folder.
(Takes 1–2 minutes, one time only)

### Step 4 — Start the development server
```bash
npm start
```
The browser will automatically open at **http://localhost:3000**

---

## 🔐 Admin Dashboard

### How to open:
Go to this URL in your browser:
```
http://localhost:3000/#/admin
```

### Password:
```
diava@admin2024
```

### To change the password:
Open `src/admin/adminConfig.js` and change the value:
```js
export const ADMIN_PASSWORD = 'your-new-password-here';
```

---

## ✏️ What you can manage from Admin

| Tab | What you can do |
|-----|----------------|
| 🛒 Products | Add, edit, delete products (name, price, emoji, category, origin, description, benefits) |
| 📂 Categories | Add, edit, delete categories with custom icon and colours |
| 📢 Ads | Add, edit, delete the rotating ad banners on the homepage |

All changes are **live** — the website reflects them instantly in the same session.

---

## 📦 Build for production (to deploy online)

```bash
npm run build
```
This creates a `build/` folder with optimised files ready to upload to any web host.

---

## 📞 Contact Info (shown in footer & Contact page)
- Mobile: 9390058763
- Email: diava.india@gmail.com

To update these, edit `src/components/Footer.jsx` and `src/pages/ContactPage.jsx`.
