# 🏥 MediCore HMS — Hospital Management System

A **fully functional, zero-dependency** Hospital Management System built as a single-page web application. Deployable anywhere — GitHub Pages, Netlify, Vercel, or any static host.

---

## ✨ Features

### Patient Management
- Register patients with full demographics (name, DOB, blood group, allergies, etc.)
- Patient status tracking: OPD / IPD / Emergency / Discharged
- View complete patient profiles with EMR history and billing
- Export patient list as CSV
- Search and filter patients

### Appointments
- Book appointments with date, time, doctor, and department
- Track appointment status (Scheduled / Completed / Cancelled / No Show)
- Filter by date and status

### OPD / Consultation
- Live OPD queue management with priority levels (Normal / Urgent / Emergency)
- Full consultation form with vitals (BP, temp, pulse, SpO2, weight, height)
- Prescription writing, lab test ordering, doctor notes
- Auto-saves to EMR upon consultation completion

### IPD / Ward Management
- Ward-wise bed management: General, ICU, Private, Maternity, Pediatric
- Visual bed grid showing occupied/available status
- Admit patients to specific beds
- Real-time bed occupancy tracking

### Electronic Medical Records (EMR)
- Comprehensive medical records with vitals and diagnosis (ICD-10)
- Prescription history, lab results, follow-up scheduling
- Searchable records per patient

### Doctors & Staff
- Doctor profiles with specialization, department, rating, fee
- Staff management (Doctors, Surgeons, Nurses, Technicians)
- Performance metrics (patient count, experience, consultation fee)

### Pharmacy
- Medicine inventory with stock tracking and expiry alerts
- Low stock alerts with reorder functionality
- Medicine dispensing with patient and doctor linkage
- Category filtering (Tablet, Capsule, Injection, Syrup)

### Laboratory
- Lab test ordering (CBC, LFT, ECG, MRI, CT, Ultrasound, etc.)
- Priority management (Normal / Urgent / STAT)
- Result entry and completion tracking
- Print lab reports

### Billing & Finance
- Invoice creation with multiple services
- Discount application and partial payment tracking
- Invoice status: Paid / Partial / Pending
- Revenue summary dashboard
- Printable invoices

### Inventory Management
- Track medical equipment and consumables
- Low stock alerts
- Supplier tracking
- Restock functionality

### Reports & Analytics
- Daily Summary Report
- Monthly Analytics by Department
- Financial Report with outstanding balances
- Inventory/Stock Report with reorder list
- Doctor Performance Report
- Lab Reports with turnaround tracking

### Settings
- Hospital information management
- User management (add/remove users with roles)
- Department management
- System preferences (Dark Mode, SMS/Email alerts, Currency)
- Dark Mode support

---

## 🚀 Quick Start

### Option 1: Open Directly
Just open `index.html` in any browser. No server needed.

### Option 2: Local Server
```bash
# Python
python -m http.server 3000

# Node.js
npx serve .

# Then open: http://localhost:3000
```

### Option 3: GitHub Pages
1. Push this folder to a GitHub repository
2. Go to Settings → Pages → Select branch `main`, folder `/root`
3. Your app will be live at `https://yourusername.github.io/repository-name`

---

## 🔐 Default Login

| Username | Password | Role |
|----------|----------|------|
| `admin` | `admin123` | Administrator |

You can add more users in the **Settings → User Management** section.

---

## 📁 File Structure

```
hospital-hms/
├── index.html      # Main HTML with all UI components
├── styles.css      # All CSS styles and design system
├── app.js          # Complete application logic
├── README.md       # This file
├── .gitignore      # Git ignore rules
└── package.json    # Optional — for Node.js tooling
```

---

## 🛠 Tech Stack

- **Vanilla HTML5 / CSS3 / JavaScript** — Zero dependencies
- **Google Fonts** — DM Serif Display + DM Sans typography
- **Pure Canvas API** — Charts (no Chart.js needed)
- **LocalStorage-ready** — Easy to add persistence

---

## 📱 Responsive Design

Fully responsive across:
- 🖥 Desktop (1920px+)
- 💻 Laptop (1280px)
- 📱 Tablet (768px)
- 📱 Mobile (375px)

---

## 🔮 Extending the App

### Add Data Persistence
```javascript
// Save to localStorage
localStorage.setItem('patients', JSON.stringify(DB.patients));

// Load from localStorage
const saved = localStorage.getItem('patients');
if (saved) DB.patients = JSON.parse(saved);
```

### Connect to Backend API
Replace data operations in `app.js` with `fetch()` calls to your REST API.

### Add Authentication
The login system is ready — connect `DB.users` to your auth endpoint.

---

## 📄 License

MIT License — Free to use, modify, and distribute.

---

**MediCore HMS** — Built for efficient healthcare management.
