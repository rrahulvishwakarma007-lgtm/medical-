// ============================================================
//  MediCore HMS — Hospital Management System
//  Fully functional single-file vanilla JS application
// ============================================================

// ====== DATA STORE ======
const DB = {
  currentUser: null,
  patients: [],
  appointments: [],
  doctors: [],
  medicines: [],
  labTests: [],
  invoices: [],
  inventory: [],
  emrRecords: [],
  opdQueue: [],
  departments: ['General Medicine', 'Cardiology', 'Orthopedics', 'Pediatrics', 'Gynecology', 'Neurology', 'ENT', 'Dermatology', 'Ophthalmology', 'Psychiatry', 'Oncology', 'Radiology', 'Pathology', 'Emergency'],
  users: [
    { id: 'U001', name: 'Admin User', username: 'admin', password: 'admin123', role: 'admin' },
    { id: 'U002', name: 'Dr. Priya Mehta', username: 'doctor', password: 'doc123', role: 'doctor' },
    { id: 'U003', name: 'Nurse Anita', username: 'nurse', password: 'nurse123', role: 'nurse' },
  ],
  beds: {},
  nextIds: { patient: 1001, appointment: 2001, invoice: 3001, lab: 4001 }
};

// ====== SEED DATA ======
function seedData() {
  DB.doctors = [
    { id: 'D001', name: 'Dr. Rahul Sharma', spec: 'Cardiologist', dept: 'Cardiology', phone: '+91 9811223344', email: 'rahul@hospital.com', exp: 15, fee: 800, license: 'MH-12345', role: 'Doctor', patients: 48, rating: 4.8 },
    { id: 'D002', name: 'Dr. Priya Mehta', spec: 'General Physician', dept: 'General Medicine', phone: '+91 9822334455', email: 'priya@hospital.com', exp: 8, fee: 500, license: 'MH-23456', role: 'Doctor', patients: 62, rating: 4.6 },
    { id: 'D003', name: 'Dr. Arjun Nair', spec: 'Orthopedic Surgeon', dept: 'Orthopedics', phone: '+91 9833445566', email: 'arjun@hospital.com', exp: 12, fee: 1000, license: 'MH-34567', role: 'Surgeon', patients: 35, rating: 4.9 },
    { id: 'D004', name: 'Dr. Sunita Patel', spec: 'Pediatrician', dept: 'Pediatrics', phone: '+91 9844556677', email: 'sunita@hospital.com', exp: 10, fee: 600, license: 'MH-45678', role: 'Doctor', patients: 54, rating: 4.7 },
    { id: 'D005', name: 'Dr. Kiran Verma', spec: 'Neurologist', dept: 'Neurology', phone: '+91 9855667788', email: 'kiran@hospital.com', exp: 18, fee: 1200, license: 'MH-56789', role: 'Doctor', patients: 29, rating: 4.9 },
    { id: 'D006', name: 'Dr. Anita Singh', spec: 'Gynecologist', dept: 'Gynecology', phone: '+91 9866778899', email: 'anita@hospital.com', exp: 11, fee: 800, license: 'MH-67890', role: 'Doctor', patients: 41, rating: 4.5 },
  ];

  DB.patients = [
    { id: 'P-001001', fname: 'Rajesh', lname: 'Kumar', dob: '1975-03-15', gender: 'Male', blood: 'B+', phone: '+91 9876543210', email: 'rajesh@email.com', address: 'Andheri East, Mumbai', status: 'OPD', doctor: 'Dr. Rahul Sharma', dept: 'Cardiology', admitted: today(), complaint: 'Chest pain', allergies: 'Penicillin', emergency: '+91 9876543211', idno: '1234 5678 9012', marital: 'Married' },
    { id: 'P-001002', fname: 'Priya', lname: 'Sharma', dob: '1990-07-22', gender: 'Female', blood: 'A+', phone: '+91 9765432109', email: 'priya@email.com', address: 'Bandra West, Mumbai', status: 'IPD', doctor: 'Dr. Priya Mehta', dept: 'General Medicine', admitted: today(), complaint: 'Fever & cough', allergies: 'None', emergency: '+91 9765432110', idno: '2345 6789 0123', marital: 'Single' },
    { id: 'P-001003', fname: 'Arun', lname: 'Patel', dob: '1965-11-08', gender: 'Male', blood: 'O+', phone: '+91 9654321098', email: 'arun@email.com', address: 'Dadar, Mumbai', status: 'Emergency', doctor: 'Dr. Kiran Verma', dept: 'Neurology', admitted: today(), complaint: 'Severe headache', allergies: 'Sulfa', emergency: '+91 9654321099', idno: '3456 7890 1234', marital: 'Married' },
    { id: 'P-001004', fname: 'Meena', lname: 'Rao', dob: '1988-05-30', gender: 'Female', blood: 'AB+', phone: '+91 9543210987', email: 'meena@email.com', address: 'Powai, Mumbai', status: 'OPD', doctor: 'Dr. Anita Singh', dept: 'Gynecology', admitted: yesterday(), complaint: 'Routine checkup', allergies: 'None', emergency: '+91 9543210988', idno: '4567 8901 2345', marital: 'Married' },
    { id: 'P-001005', fname: 'Suresh', lname: 'Nair', dob: '1952-09-12', gender: 'Male', blood: 'A-', phone: '+91 9432109876', email: 'suresh@email.com', address: 'Juhu, Mumbai', status: 'Discharged', doctor: 'Dr. Rahul Sharma', dept: 'Cardiology', admitted: daysAgo(5), complaint: 'Heart palpitations', allergies: 'NSAIDs', emergency: '+91 9432109877', idno: '5678 9012 3456', marital: 'Widowed' },
    { id: 'P-001006', fname: 'Kavita', lname: 'Singh', dob: '2018-01-20', gender: 'Female', blood: 'B-', phone: '+91 9321098765', email: 'kavita@email.com', address: 'Versova, Mumbai', status: 'IPD', doctor: 'Dr. Sunita Patel', dept: 'Pediatrics', admitted: today(), complaint: 'High fever', allergies: 'None', emergency: '+91 9321098766', idno: '6789 0123 4567', marital: 'Single' },
    { id: 'P-001007', fname: 'Vikram', lname: 'Joshi', dob: '1982-04-25', gender: 'Male', blood: 'O-', phone: '+91 9210987654', email: 'vikram@email.com', address: 'Goregaon, Mumbai', status: 'OPD', doctor: 'Dr. Arjun Nair', dept: 'Orthopedics', admitted: today(), complaint: 'Knee pain', allergies: 'None', emergency: '+91 9210987655', idno: '7890 1234 5678', marital: 'Married' },
  ];

  DB.appointments = [
    { id: 'A-002001', patientId: 'P-001001', patientName: 'Rajesh Kumar', doctor: 'Dr. Rahul Sharma', dept: 'Cardiology', date: today(), time: '09:00', type: 'Regular', status: 'Scheduled', notes: 'Follow up for ECG' },
    { id: 'A-002002', patientId: 'P-001002', patientName: 'Priya Sharma', doctor: 'Dr. Priya Mehta', dept: 'General Medicine', date: today(), time: '09:30', type: 'Follow-up', status: 'Completed', notes: '' },
    { id: 'A-002003', patientId: 'P-001004', patientName: 'Meena Rao', doctor: 'Dr. Anita Singh', dept: 'Gynecology', date: today(), time: '10:00', type: 'Regular', status: 'Scheduled', notes: 'Antenatal checkup' },
    { id: 'A-002004', patientId: 'P-001007', patientName: 'Vikram Joshi', doctor: 'Dr. Arjun Nair', dept: 'Orthopedics', date: today(), time: '11:00', type: 'Regular', status: 'Scheduled', notes: 'Knee X-ray review' },
    { id: 'A-002005', patientId: 'P-001003', patientName: 'Arun Patel', doctor: 'Dr. Kiran Verma', dept: 'Neurology', date: today(), time: '11:30', type: 'Emergency', status: 'Completed', notes: 'MRI Brain' },
    { id: 'A-002006', patientId: 'P-001005', patientName: 'Suresh Nair', doctor: 'Dr. Rahul Sharma', dept: 'Cardiology', date: yesterday(), time: '10:00', type: 'Follow-up', status: 'Completed', notes: '' },
  ];

  DB.medicines = [
    { id: 'M001', name: 'Paracetamol 500mg', category: 'Tablet', mfg: 'Cipla', stock: 45, price: 2, expiry: '2026-12-31', batch: 'B2024-01', minStock: 50 },
    { id: 'M002', name: 'Amoxicillin 500mg', category: 'Capsule', mfg: 'Sun Pharma', stock: 120, price: 12, expiry: '2026-08-30', batch: 'B2024-02', minStock: 50 },
    { id: 'M003', name: 'Metformin 500mg', category: 'Tablet', mfg: 'Lupin', stock: 200, price: 3, expiry: '2027-03-31', batch: 'B2024-03', minStock: 100 },
    { id: 'M004', name: 'Amlodipine 5mg', category: 'Tablet', mfg: 'Cipla', stock: 90, price: 5, expiry: '2026-11-30', batch: 'B2024-04', minStock: 50 },
    { id: 'M005', name: 'Dextrose 5% IV', category: 'Injection', mfg: 'Baxter', stock: 30, price: 85, expiry: '2025-12-31', batch: 'B2024-05', minStock: 40 },
    { id: 'M006', name: 'Cetirizine 10mg', category: 'Tablet', mfg: 'Mankind', stock: 150, price: 3, expiry: '2027-06-30', batch: 'B2024-06', minStock: 50 },
    { id: 'M007', name: 'Pantoprazole 40mg', category: 'Tablet', mfg: 'Zydus', stock: 80, price: 8, expiry: '2026-09-30', batch: 'B2024-07', minStock: 50 },
    { id: 'M008', name: 'Azithromycin 250mg', category: 'Tablet', mfg: 'Abbott', stock: 60, price: 25, expiry: '2026-07-31', batch: 'B2024-08', minStock: 30 },
  ];

  DB.labTests = [
    { id: 'L-004001', patientId: 'P-001001', patientName: 'Rajesh Kumar', test: 'Complete Blood Count (CBC)', doctor: 'Dr. Rahul Sharma', date: today(), status: 'Completed', result: 'WBC: 7.2, RBC: 4.8, HGB: 14.2, PLT: 280K — Normal', priority: 'Normal' },
    { id: 'L-004002', patientId: 'P-001002', patientName: 'Priya Sharma', test: 'Liver Function Test (LFT)', doctor: 'Dr. Priya Mehta', date: today(), status: 'Pending', result: '', priority: 'Urgent' },
    { id: 'L-004003', patientId: 'P-001003', patientName: 'Arun Patel', test: 'CT Scan Head', doctor: 'Dr. Kiran Verma', date: today(), status: 'In Progress', result: '', priority: 'STAT' },
    { id: 'L-004004', patientId: 'P-001004', patientName: 'Meena Rao', test: 'Thyroid Profile', doctor: 'Dr. Anita Singh', date: yesterday(), status: 'Completed', result: 'TSH: 2.1 mIU/L — Normal', priority: 'Normal' },
  ];

  DB.invoices = [
    { id: 'INV-003001', patientId: 'P-001001', patientName: 'Rajesh Kumar', services: [{name:'OPD Consultation',price:800},{name:'ECG',price:400},{name:'Blood Test',price:350}], discount: 0, paid: 1550, date: today(), paymentMethod: 'UPI', status: 'Paid' },
    { id: 'INV-003002', patientId: 'P-001002', patientName: 'Priya Sharma', services: [{name:'IPD Admission',price:5000},{name:'LFT Test',price:500},{name:'Medicines',price:800}], discount: 5, paid: 3000, date: today(), paymentMethod: 'Cash', status: 'Partial' },
    { id: 'INV-003003', patientId: 'P-001005', patientName: 'Suresh Nair', services: [{name:'OPD Consultation',price:800},{name:'ECG',price:400},{name:'Echocardiography',price:2000}], discount: 10, paid: 2880, date: daysAgo(5), paymentMethod: 'Card', status: 'Paid' },
    { id: 'INV-003004', patientId: 'P-001006', patientName: 'Kavita Singh', services: [{name:'IPD Admission',price:3000},{name:'Paediatric Consultation',price:600},{name:'Medicines',price:400}], discount: 0, paid: 0, date: today(), paymentMethod: 'Cash', status: 'Pending' },
  ];

  DB.inventory = [
    { id: 'INV001', name: 'Surgical Gloves (Box)', category: 'Consumables', stock: 45, unit: 'Boxes', minStock: 20, supplier: 'MedSupply Co.', updated: today() },
    { id: 'INV002', name: 'N95 Masks (Pack)', category: 'Consumables', stock: 8, unit: 'Packs', minStock: 15, supplier: 'SafeGuard Ltd.', updated: today() },
    { id: 'INV003', name: 'Digital BP Monitor', category: 'Medical Equipment', stock: 12, unit: 'Pieces', minStock: 5, supplier: 'Omron India', updated: daysAgo(3) },
    { id: 'INV004', name: 'IV Stand', category: 'Medical Equipment', stock: 25, unit: 'Pieces', minStock: 10, supplier: 'Hospital Supplies', updated: daysAgo(7) },
    { id: 'INV005', name: 'Syringe 5ml (Pack)', category: 'Consumables', stock: 150, unit: 'Packs', minStock: 50, supplier: 'Hindustan Syringes', updated: today() },
    { id: 'INV006', name: 'Bandage Roll', category: 'Consumables', stock: 60, unit: 'Rolls', minStock: 30, supplier: 'MedSupply Co.', updated: daysAgo(2) },
  ];

  DB.emrRecords = [
    { id: 'EMR001', patientId: 'P-001001', patientName: 'Rajesh Kumar', doctorName: 'Dr. Rahul Sharma', date: today(), complaint: 'Chest pain and shortness of breath', diagnosis: 'I20.9 — Angina Pectoris', symptoms: 'Chest tightness, exertional dyspnoea', prescription: 'Aspirin 75mg OD, Atorvastatin 40mg OD, Isosorbide mononitrate 30mg OD', labs: 'ECG, ECHO, Troponin', bp: '140/90', temp: '98.4', pulse: '88', spo2: '96', weight: '82', height: '172', notes: 'Patient advised lifestyle modification. Review in 2 weeks.', followup: futureDate(14) },
    { id: 'EMR002', patientId: 'P-001002', patientName: 'Priya Sharma', doctorName: 'Dr. Priya Mehta', date: today(), complaint: 'Fever and cough for 3 days', diagnosis: 'J06.9 — Acute Upper Respiratory Infection', symptoms: 'Fever 102°F, dry cough, sore throat', prescription: 'Paracetamol 500mg TDS, Azithromycin 500mg OD x5 days, Cetirizine 10mg OD', labs: 'CBC, CRP', bp: '110/70', temp: '102.2', pulse: '96', spo2: '98', weight: '58', height: '162', notes: 'Advised complete rest and hydration.', followup: futureDate(5) },
  ];

  DB.opdQueue = [
    { queueId: 'Q001', patientId: 'P-001001', patientName: 'Rajesh Kumar', doctor: 'Dr. Rahul Sharma', priority: 'Urgent', complaint: 'Chest pain', time: '09:00' },
    { queueId: 'Q002', patientId: 'P-001007', patientName: 'Vikram Joshi', doctor: 'Dr. Arjun Nair', priority: 'Normal', complaint: 'Knee pain', time: '09:15' },
    { queueId: 'Q003', patientId: 'P-001004', patientName: 'Meena Rao', doctor: 'Dr. Anita Singh', priority: 'Normal', complaint: 'Routine checkup', time: '09:30' },
  ];

  // Generate beds
  const wards = ['General', 'ICU', 'Private', 'Maternity', 'Pediatric'];
  const wardCapacity = { General: 20, ICU: 10, Private: 15, Maternity: 10, Pediatric: 10 };
  const occupiedBeds = { 'General-3': 'Priya Sharma', 'General-7': 'Kavita Singh', 'ICU-1': 'Arun Patel', 'ICU-2': 'Rajesh Kumar', 'Private-2': 'Meena Rao' };
  wards.forEach(w => {
    DB.beds[w] = [];
    for (let i = 1; i <= wardCapacity[w]; i++) {
      const key = `${w}-${i}`;
      DB.beds[w].push({ no: `${w[0]}-${i}`, key, status: occupiedBeds[key] ? 'occupied' : 'available', patient: occupiedBeds[key] || null });
    }
  });
}

// ====== HELPERS ======
function today() { return new Date().toISOString().split('T')[0]; }
function yesterday() { const d = new Date(); d.setDate(d.getDate()-1); return d.toISOString().split('T')[0]; }
function daysAgo(n) { const d = new Date(); d.setDate(d.getDate()-n); return d.toISOString().split('T')[0]; }
function futureDate(n) { const d = new Date(); d.setDate(d.getDate()+n); return d.toISOString().split('T')[0]; }
function formatDate(ds) { if(!ds)return'—'; const d=new Date(ds); return d.toLocaleDateString('en-IN',{day:'2-digit',month:'short',year:'numeric'}); }
function calcAge(dob) { if(!dob)return'—'; const d=new Date(dob); const a=Math.floor((new Date()-d)/(365.25*24*60*60*1000)); return a+'y'; }
function genId(prefix, list) { return `${prefix}${(Math.max(0,...list.map(x=>parseInt(x.id.split('-').pop()||x.id.replace(/\D/g,''))||0))+1).toString().padStart(6,'0')}`; }
function rupee(n) { return '₹'+(Number(n)||0).toLocaleString('en-IN'); }

// ====== LOGIN ======
function login() {
  const u = document.getElementById('login-user').value.trim();
  const p = document.getElementById('login-pass').value.trim();
  const r = document.getElementById('login-role').value;
  const user = DB.users.find(x => x.username === u && x.password === p);
  if (!user) { toast('Invalid credentials. Try admin/admin123', 'error'); return; }
  DB.currentUser = {...user, role: r};
  document.getElementById('login-screen').classList.add('hidden');
  document.getElementById('main-app').classList.remove('hidden');
  document.getElementById('user-name').textContent = user.name;
  document.getElementById('user-role-label').textContent = r.charAt(0).toUpperCase() + r.slice(1);
  document.getElementById('user-avatar').textContent = user.name.charAt(0);
  initApp();
}

function logout() {
  DB.currentUser = null;
  document.getElementById('main-app').classList.add('hidden');
  document.getElementById('login-screen').classList.remove('hidden');
}

// ====== INIT ======
function initApp() {
  seedData();
  updateDateTime();
  setInterval(updateDateTime, 1000);
  showPage('dashboard');
  renderDashboard();
  populateAllDropdowns();
  renderDepartments();
  renderUsersSettings();
}

function updateDateTime() {
  const now = new Date();
  const opts = { weekday:'short', year:'numeric', month:'short', day:'numeric' };
  const time = now.toLocaleTimeString('en-IN', {hour:'2-digit', minute:'2-digit', second:'2-digit'});
  const date = now.toLocaleDateString('en-IN', opts);
  const el = document.getElementById('datetime-display');
  if(el) el.textContent = `${date} | ${time}`;
  const wd = document.getElementById('welcome-date');
  if(wd) wd.textContent = date + '\n' + time;
  // Welcome greeting
  const h = now.getHours();
  const gr = h<12?'Good morning':h<17?'Good afternoon':'Good evening';
  const wm = document.getElementById('welcome-msg');
  if(wm) wm.textContent = `${gr}, ${DB.currentUser?.name.split(' ')[0] || 'Admin'}!`;
}

// ====== NAVIGATION ======
function showPage(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  const el = document.getElementById('page-' + page);
  if(el) el.classList.add('active');
  const nav = document.querySelector(`[data-page="${page}"]`);
  if(nav) nav.classList.add('active');
  const titles = { dashboard:'Dashboard', patients:'Patients', appointments:'Appointments', opd:'OPD / Consultation', ipd:'IPD / Wards', emr:'EMR / Medical Records', doctors:'Doctors & Staff', pharmacy:'Pharmacy', laboratory:'Laboratory', billing:'Billing & Finance', inventory:'Inventory', reports:'Reports & Analytics', settings:'Settings' };
  document.getElementById('page-title').textContent = titles[page] || page;

  // Render page content on navigate
  if(page === 'patients') renderPatients();
  if(page === 'appointments') renderAppointments();
  if(page === 'opd') renderOPD();
  if(page === 'ipd') renderIPD();
  if(page === 'emr') renderEMR();
  if(page === 'doctors') renderDoctors();
  if(page === 'pharmacy') renderPharmacy();
  if(page === 'laboratory') renderLab();
  if(page === 'billing') renderBilling();
  if(page === 'inventory') renderInventory();
  if(page === 'settings') { renderDepartments(); renderUsersSettings(); }
}

function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
}

// ====== DASHBOARD ======
function renderDashboard() {
  // Today's appointments
  const todayAppts = DB.appointments.filter(a => a.date === today()).slice(0, 5);
  document.getElementById('dash-appts').innerHTML = todayAppts.length ? todayAppts.map(a => `
    <div class="appt-item">
      <span class="appt-time">${a.time}</span>
      <div class="appt-info">
        <div class="appt-name">${a.patientName}</div>
        <div class="appt-doctor">${a.doctor}</div>
      </div>
      <div class="appt-status-dot" style="background:${a.status==='Completed'?'#0e9f6e':a.status==='Cancelled'?'#9ca3af':'#1a56db'}"></div>
    </div>
  `).join('') : '<p style="color:var(--text-muted);font-size:.8rem;padding:8px 0">No appointments today.</p>';

  // Recent patients
  const recent = DB.patients.slice(-5).reverse();
  document.getElementById('dash-patients').innerHTML = recent.map(p => `
    <div class="patient-mini">
      <div class="patient-mini-avatar">${p.fname[0]}</div>
      <div>
        <div class="patient-mini-name">${p.fname} ${p.lname}</div>
        <div class="patient-mini-id">${p.id} · ${p.status}</div>
      </div>
    </div>
  `).join('');

  // Bed grid (mini)
  const allBeds = Object.values(DB.beds).flat();
  const bedSample = allBeds.slice(0, 20);
  document.getElementById('bed-grid').innerHTML = bedSample.map(b => `
    <div class="bed ${b.status}" title="${b.status === 'occupied' ? b.patient : 'Available'}">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 20v-3a6 6 0 0 1 6-6h8a6 6 0 0 1 6 6v3"/><circle cx="12" cy="7" r="4"/></svg>
      ${b.no}
    </div>
  `).join('');

  // Draw charts
  drawAdmissionsChart();
  drawDeptChart();
}

// Simple canvas charts — no external library needed
function drawAdmissionsChart() {
  const canvas = document.getElementById('admissions-chart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const w = canvas.parentElement.clientWidth - 40;
  canvas.width = Math.max(w, 300);
  canvas.height = 200;
  const data = [18, 24, 32, 28, 41, 35, 48];
  const labels = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  const maxVal = Math.max(...data);
  const pad = { l: 40, r: 20, t: 20, b: 30 };
  const cw = canvas.width - pad.l - pad.r;
  const ch = canvas.height - pad.t - pad.b;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Grid lines
  ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--border') || '#e5e9f2';
  ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i++) {
    const y = pad.t + (ch / 4) * i;
    ctx.beginPath(); ctx.moveTo(pad.l, y); ctx.lineTo(pad.l + cw, y); ctx.stroke();
  }

  // Area fill
  const barW = cw / data.length;
  const pts = data.map((v, i) => ({ x: pad.l + barW * i + barW / 2, y: pad.t + ch - (v / maxVal) * ch }));
  const grad = ctx.createLinearGradient(0, pad.t, 0, pad.t + ch);
  grad.addColorStop(0, 'rgba(26,86,219,.25)');
  grad.addColorStop(1, 'rgba(26,86,219,0)');
  ctx.beginPath();
  ctx.moveTo(pts[0].x, pad.t + ch);
  pts.forEach(p => ctx.lineTo(p.x, p.y));
  ctx.lineTo(pts[pts.length-1].x, pad.t + ch);
  ctx.closePath();
  ctx.fillStyle = grad;
  ctx.fill();

  // Line
  ctx.beginPath();
  ctx.strokeStyle = '#1a56db';
  ctx.lineWidth = 2.5;
  ctx.lineJoin = 'round';
  pts.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
  ctx.stroke();

  // Dots
  pts.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
    ctx.fillStyle = '#1a56db';
    ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
    ctx.fill();
  });

  // Labels
  const textColor = getComputedStyle(document.body).getPropertyValue('--text-muted') || '#6b7280';
  ctx.fillStyle = textColor;
  ctx.font = '11px DM Sans, sans-serif';
  ctx.textAlign = 'center';
  labels.forEach((l, i) => ctx.fillText(l, pts[i].x, canvas.height - 6));
  ctx.textAlign = 'right';
  for (let i = 0; i <= 4; i++) {
    const y = pad.t + (ch / 4) * i;
    const val = Math.round(maxVal - (maxVal / 4) * i);
    ctx.fillText(val, pad.l - 6, y + 4);
  }
}

function drawDeptChart() {
  const canvas = document.getElementById('dept-chart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const w = canvas.parentElement.clientWidth - 40;
  canvas.width = Math.max(w, 200);
  canvas.height = 200;
  const depts = ['Cardiology','General','Ortho','Pediatric','Gynec','Neuro'];
  const vals = [18, 28, 12, 14, 10, 8];
  const colors = ['#1a56db','#0e9f6e','#ff8a00','#7c3aed','#e02424','#0891b2'];
  const total = vals.reduce((a, b) => a + b, 0);
  const cx = canvas.width / 2 - 30, cy = canvas.height / 2 + 10, r = Math.min(cx, cy) * 0.7;
  let angle = -Math.PI / 2;

  vals.forEach((v, i) => {
    const slice = (v / total) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, r, angle, angle + slice);
    ctx.closePath();
    ctx.fillStyle = colors[i];
    ctx.fill();
    angle += slice;
  });

  // Center hole (donut)
  ctx.beginPath();
  ctx.arc(cx, cy, r * 0.55, 0, Math.PI * 2);
  ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--surface') || '#fff';
  ctx.fill();

  // Center text
  ctx.fillStyle = getComputedStyle(document.body).getPropertyValue('--text') || '#111827';
  ctx.font = 'bold 16px DM Sans';
  ctx.textAlign = 'center';
  ctx.fillText(total, cx, cy + 2);
  ctx.font = '10px DM Sans';
  ctx.fillStyle = getComputedStyle(document.body).getPropertyValue('--text-muted') || '#6b7280';
  ctx.fillText('Patients', cx, cy + 16);

  // Legend
  const lx = canvas.width - 70;
  depts.forEach((d, i) => {
    const ly = 20 + i * 28;
    ctx.fillStyle = colors[i];
    ctx.fillRect(lx, ly - 6, 10, 10);
    ctx.fillStyle = getComputedStyle(document.body).getPropertyValue('--text-muted') || '#6b7280';
    ctx.font = '10px DM Sans';
    ctx.textAlign = 'left';
    ctx.fillText(d.substring(0, 9), lx + 14, ly + 2);
  });
}

// ====== PATIENTS ======
function renderPatients(list) {
  const data = list || DB.patients;
  const tbody = document.getElementById('patients-tbody');
  tbody.innerHTML = data.map(p => `
    <tr>
      <td><strong>${p.id}</strong></td>
      <td>
        <div style="display:flex;align-items:center;gap:8px">
          <div class="patient-mini-avatar">${p.fname[0]}</div>
          <div>
            <div style="font-weight:600">${p.fname} ${p.lname}</div>
            <div style="font-size:0.72rem;color:var(--text-muted)">${p.phone}</div>
          </div>
        </div>
      </td>
      <td>${calcAge(p.dob)} / ${p.gender[0]}</td>
      <td>${p.phone}</td>
      <td><span style="font-weight:700;color:var(--danger)">${p.blood}</span></td>
      <td><span class="badge-status badge-${p.status.toLowerCase().replace(' ','-')}">${p.status}</span></td>
      <td style="font-size:0.78rem">${p.doctor}</td>
      <td>${formatDate(p.admitted)}</td>
      <td class="actions">
        <button class="btn-sm" onclick="viewPatient('${p.id}')">View</button>
        <button class="btn-sm" style="background:rgba(14,159,110,.1);color:var(--secondary)" onclick="editPatient('${p.id}')">Edit</button>
        <button class="btn-danger" onclick="deletePatient('${p.id}')">Del</button>
      </td>
    </tr>
  `).join('') || '<tr><td colspan="9" style="text-align:center;color:var(--text-muted);padding:20px">No patients found.</td></tr>';
}

function filterPatients(q) {
  const status = document.getElementById('patient-status-filter').value;
  let list = DB.patients;
  if (q) { const ql = q.toLowerCase(); list = list.filter(p => `${p.fname} ${p.lname} ${p.id} ${p.phone}`.toLowerCase().includes(ql)); }
  if (status) list = list.filter(p => p.status === status);
  renderPatients(list);
}

function addPatient() {
  const fname = document.getElementById('p-fname').value.trim();
  const lname = document.getElementById('p-lname').value.trim();
  if (!fname || !lname) { toast('Name is required', 'error'); return; }
  const phone = document.getElementById('p-phone').value.trim();
  if (!phone) { toast('Phone is required', 'error'); return; }
  const id = `P-${String(++DB.nextIds.patient).padStart(6,'0')}`;
  DB.patients.push({
    id, fname, lname, phone,
    dob: document.getElementById('p-dob').value,
    gender: document.getElementById('p-gender').value,
    blood: document.getElementById('p-blood').value,
    email: document.getElementById('p-email').value,
    address: document.getElementById('p-address').value,
    emergency: document.getElementById('p-emergency').value,
    idno: document.getElementById('p-id').value,
    marital: document.getElementById('p-marital').value,
    doctor: document.getElementById('p-doctor').value,
    dept: document.getElementById('p-dept').value,
    status: document.getElementById('p-status').value,
    complaint: document.getElementById('p-complaint').value,
    allergies: document.getElementById('p-allergies').value,
    admitted: today()
  });
  closeModal('add-patient-modal'); renderPatients(); toast(`Patient ${fname} ${lname} registered! ID: ${id}`, 'success');
  populateAllDropdowns();
}

function viewPatient(id) {
  const p = DB.patients.find(x => x.id === id);
  if (!p) return;
  const records = DB.emrRecords.filter(e => e.patientId === id);
  const invoices = DB.invoices.filter(i => i.patientId === id);
  document.getElementById('view-patient-content').innerHTML = `
    <div class="patient-profile-grid">
      <div class="profile-section">
        <h5>Personal Information</h5>
        <div class="profile-row"><span>Patient ID</span><span>${p.id}</span></div>
        <div class="profile-row"><span>Full Name</span><span>${p.fname} ${p.lname}</span></div>
        <div class="profile-row"><span>Age / Gender</span><span>${calcAge(p.dob)} / ${p.gender}</span></div>
        <div class="profile-row"><span>Date of Birth</span><span>${formatDate(p.dob)}</span></div>
        <div class="profile-row"><span>Blood Group</span><span style="color:var(--danger);font-weight:800">${p.blood}</span></div>
        <div class="profile-row"><span>Marital Status</span><span>${p.marital}</span></div>
        <div class="profile-row"><span>Phone</span><span>${p.phone}</span></div>
        <div class="profile-row"><span>Email</span><span>${p.email||'—'}</span></div>
        <div class="profile-row"><span>Address</span><span>${p.address||'—'}</span></div>
        <div class="profile-row"><span>Emergency Contact</span><span>${p.emergency||'—'}</span></div>
        <div class="profile-row"><span>Aadhaar / ID</span><span>${p.idno||'—'}</span></div>
        <div class="profile-row"><span>Allergies</span><span style="color:var(--warning)">${p.allergies||'None'}</span></div>
      </div>
      <div class="profile-section">
        <h5>Clinical Information</h5>
        <div class="profile-row"><span>Status</span><span><span class="badge-status badge-${p.status.toLowerCase().replace(' ','-')}">${p.status}</span></span></div>
        <div class="profile-row"><span>Department</span><span>${p.dept||'—'}</span></div>
        <div class="profile-row"><span>Attending Doctor</span><span>${p.doctor||'—'}</span></div>
        <div class="profile-row"><span>Admitted On</span><span>${formatDate(p.admitted)}</span></div>
        <div class="profile-row"><span>Chief Complaint</span><span>${p.complaint||'—'}</span></div>
      </div>
    </div>
    ${records.length ? `
    <div class="profile-section" style="margin-top:16px">
      <h5>Medical Records (${records.length})</h5>
      ${records.map(r => `
        <div style="padding:10px;border-bottom:1px solid var(--border)">
          <div style="font-weight:700;font-size:.85rem">${r.diagnosis}</div>
          <div style="font-size:.78rem;color:var(--text-muted)">${formatDate(r.date)} · ${r.doctorName}</div>
          <div style="font-size:.8rem;margin-top:4px">${r.prescription}</div>
        </div>
      `).join('')}
    </div>` : ''}
    ${invoices.length ? `
    <div class="profile-section" style="margin-top:16px">
      <h5>Billing History</h5>
      ${invoices.map(i => {
        const total = calcInvoiceAmount(i);
        return `<div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--border);font-size:.83rem">
          <span>${i.id}</span><span>${formatDate(i.date)}</span>
          <span style="font-weight:700">${rupee(total.net)}</span>
          <span class="badge-status badge-${i.status.toLowerCase()}">${i.status}</span>
        </div>`;
      }).join('')}
    </div>` : ''}
    <div style="margin-top:16px;display:flex;gap:10px">
      <button class="btn-primary" onclick="closeModal('view-patient-modal');openModal('add-emr-modal');document.getElementById('emr-patient').value='${p.id}'">+ Add EMR</button>
      <button class="btn-secondary" onclick="closeModal('view-patient-modal');openModal('add-invoice-modal');document.getElementById('inv-patient').value='${p.id}'">+ Invoice</button>
    </div>
  `;
  openModal('view-patient-modal');
}

function editPatient(id) { toast('Edit functionality — open in full EMR', 'info'); }

function deletePatient(id) {
  if (!confirm('Delete this patient record?')) return;
  DB.patients = DB.patients.filter(p => p.id !== id);
  renderPatients(); toast('Patient record deleted.', 'info');
}

function exportPatients() {
  const rows = [['ID','First Name','Last Name','Age','Gender','Blood','Phone','Status','Doctor','Admitted']];
  DB.patients.forEach(p => rows.push([p.id, p.fname, p.lname, calcAge(p.dob), p.gender, p.blood, p.phone, p.status, p.doctor, p.admitted]));
  const csv = rows.map(r => r.map(c => `"${c}"`).join(',')).join('\n');
  const a = document.createElement('a'); a.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
  a.download = `patients_${today()}.csv`; a.click();
  toast('Patients exported as CSV!', 'success');
}

// ====== APPOINTMENTS ======
function renderAppointments(list) {
  const data = list || DB.appointments;
  const tbody = document.getElementById('appts-tbody');
  tbody.innerHTML = data.map(a => `
    <tr>
      <td><strong>${a.id}</strong></td>
      <td>${a.patientName}</td>
      <td>${a.doctor}</td>
      <td>${a.dept}</td>
      <td>${formatDate(a.date)} <span style="color:var(--primary);font-weight:600">${a.time}</span></td>
      <td>${a.type}</td>
      <td><span class="badge-status badge-${a.status.toLowerCase().replace(' ','-')}">${a.status}</span></td>
      <td class="actions">
        <button class="btn-sm" onclick="updateApptStatus('${a.id}','Completed')">✓</button>
        <button class="btn-sm" style="background:rgba(224,36,36,.1);color:var(--danger)" onclick="updateApptStatus('${a.id}','Cancelled')">✗</button>
      </td>
    </tr>
  `).join('') || '<tr><td colspan="8" style="text-align:center;color:var(--text-muted);padding:20px">No appointments found.</td></tr>';
}

function filterAppointments() {
  const d = document.getElementById('appt-date-filter').value;
  const s = document.getElementById('appt-status-filter').value;
  let list = DB.appointments;
  if (d) list = list.filter(a => a.date === d);
  if (s) list = list.filter(a => a.status === s);
  renderAppointments(list);
}

function addAppointment() {
  const pid = document.getElementById('appt-patient').value;
  const dr = document.getElementById('appt-doctor').value;
  const dt = document.getElementById('appt-date').value;
  const tm = document.getElementById('appt-time').value;
  if (!pid || !dr || !dt || !tm) { toast('Please fill all required fields.', 'error'); return; }
  const patient = DB.patients.find(p => p.id === pid);
  const id = `A-${String(++DB.nextIds.appointment).padStart(6,'0')}`;
  DB.appointments.push({ id, patientId: pid, patientName: patient ? `${patient.fname} ${patient.lname}` : pid, doctor: dr, dept: document.getElementById('appt-dept').value, date: dt, time: tm, type: document.getElementById('appt-type').value, status: 'Scheduled', notes: document.getElementById('appt-notes').value });
  closeModal('add-appt-modal'); renderAppointments(); toast(`Appointment booked for ${formatDate(dt)} at ${tm}`, 'success');
}

function updateApptStatus(id, status) {
  const a = DB.appointments.find(x => x.id === id);
  if (a) { a.status = status; renderAppointments(); toast(`Appointment ${status.toLowerCase()}.`, 'info'); }
}

// ====== OPD ======
function renderOPD() {
  const qList = document.getElementById('opd-queue-list');
  document.getElementById('opd-queue-count').textContent = `${DB.opdQueue.length} waiting`;
  qList.innerHTML = DB.opdQueue.map((q, i) => `
    <div class="queue-item ${DB.activeConsultation === q.queueId ? 'active-consultation' : ''}" onclick="startConsultation('${q.queueId}')">
      <div style="display:flex;justify-content:space-between;align-items:flex-start">
        <div>
          <div class="queue-name">${i+1}. ${q.patientName}</div>
          <div class="queue-meta">${q.doctor} · ${q.complaint}</div>
          <span class="queue-priority priority-${q.priority.toLowerCase()}">${q.priority}</span>
        </div>
        <button class="btn-danger" onclick="removeFromQueue(event,'${q.queueId}')">×</button>
      </div>
    </div>
  `).join('') || '<p style="text-align:center;color:var(--text-muted);font-size:.8rem;padding:20px 0">Queue is empty.</p>';
}

function startConsultation(queueId) {
  DB.activeConsultation = queueId;
  const q = DB.opdQueue.find(x => x.queueId === queueId);
  if (!q) return;
  const patient = DB.patients.find(p => p.id === q.patientId);
  document.getElementById('opd-consultation-area').innerHTML = `
    <div class="consultation-header">
      <div class="patient-consult-info">
        <h3>${q.patientName}</h3>
        <p>ID: ${q.patientId} · ${patient ? calcAge(patient.dob) + ', ' + patient.gender : ''} · ${patient?.blood || ''}</p>
        <p style="margin-top:4px;color:var(--warning)">${patient?.allergies ? '⚠ Allergies: ' + patient.allergies : ''}</p>
      </div>
      <div>
        <span class="badge-status badge-${q.priority.toLowerCase().includes('emergency')?'emergency':q.priority.toLowerCase().includes('urgent')?'urgent':'scheduled'}">${q.priority}</span>
        <p style="font-size:.75rem;color:var(--text-muted);margin-top:4px">Complaint: ${q.complaint}</p>
        <p style="font-size:.75rem;color:var(--text-muted)">Doctor: ${q.doctor}</p>
      </div>
    </div>
    <h5 style="font-size:.78rem;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:var(--text-muted);margin-bottom:12px">Vitals</h5>
    <div class="vitals-grid">
      <div class="vital-box"><input type="text" id="v-bp" placeholder="120/80" style="background:none;border:none;outline:none;text-align:center;font-size:1.1rem;font-weight:700;color:var(--primary);width:100%" /><div class="vital-label">BP (mmHg)</div></div>
      <div class="vital-box"><input type="number" id="v-temp" placeholder="98.6" style="background:none;border:none;outline:none;text-align:center;font-size:1.1rem;font-weight:700;color:var(--primary);width:100%" /><div class="vital-label">Temp (°F)</div></div>
      <div class="vital-box"><input type="number" id="v-pulse" placeholder="72" style="background:none;border:none;outline:none;text-align:center;font-size:1.1rem;font-weight:700;color:var(--primary);width:100%" /><div class="vital-label">Pulse (bpm)</div></div>
      <div class="vital-box"><input type="number" id="v-spo2" placeholder="99" style="background:none;border:none;outline:none;text-align:center;font-size:1.1rem;font-weight:700;color:var(--primary);width:100%" /><div class="vital-label">SpO2 (%)</div></div>
      <div class="vital-box"><input type="number" id="v-wt" placeholder="70" style="background:none;border:none;outline:none;text-align:center;font-size:1.1rem;font-weight:700;color:var(--primary);width:100%" /><div class="vital-label">Weight (kg)</div></div>
      <div class="vital-box"><input type="number" id="v-ht" placeholder="170" style="background:none;border:none;outline:none;text-align:center;font-size:1.1rem;font-weight:700;color:var(--primary);width:100%" /><div class="vital-label">Height (cm)</div></div>
    </div>
    <div class="consultation-form">
      <div class="form-group"><label>Diagnosis (ICD-10)</label><input type="text" id="c-diag" placeholder="e.g. J06.9 — Acute URTI" style="border:1px solid var(--border);border-radius:8px;padding:10px;width:100%;background:var(--surface);color:var(--text);outline:none" /></div>
      <div class="form-group"><label>Symptoms & Findings</label><textarea id="c-symptoms" placeholder="Clinical examination findings..."></textarea></div>
      <div class="form-group"><label>Prescription</label><textarea id="c-rx" placeholder="Medicine - Dose - Frequency - Duration&#10;e.g. Tab Paracetamol 500mg - 1 tab TDS x 5 days"></textarea></div>
      <div class="form-group"><label>Lab Tests / Investigations</label><input type="text" id="c-labs" placeholder="CBC, LFT, X-Ray..." style="border:1px solid var(--border);border-radius:8px;padding:10px;width:100%;background:var(--surface);color:var(--text);outline:none" /></div>
      <div class="form-group"><label>Doctor Notes</label><textarea id="c-notes" placeholder="Additional notes..."></textarea></div>
      <div class="form-group"><label>Follow-up Date</label><input type="date" id="c-followup" style="border:1px solid var(--border);border-radius:8px;padding:10px;background:var(--surface);color:var(--text);outline:none" /></div>
    </div>
    <div class="consultation-actions">
      <button class="btn-primary" onclick="saveConsultation('${queueId}')">💾 Save & Complete</button>
      <button class="btn-secondary" onclick="printConsultation('${queueId}')">🖨️ Print</button>
      <button class="btn-danger" onclick="removeFromQueue(event,'${queueId}');renderOPD()">Skip Patient</button>
    </div>
  `;
  renderOPD();
}

function saveConsultation(queueId) {
  const q = DB.opdQueue.find(x => x.queueId === queueId);
  if (!q) return;
  const emrId = 'EMR' + String(DB.emrRecords.length + 1).padStart(3, '0');
  DB.emrRecords.push({
    id: emrId, patientId: q.patientId, patientName: q.patientName,
    doctorName: q.doctor, date: today(),
    complaint: q.complaint,
    diagnosis: document.getElementById('c-diag')?.value || '',
    symptoms: document.getElementById('c-symptoms')?.value || '',
    prescription: document.getElementById('c-rx')?.value || '',
    labs: document.getElementById('c-labs')?.value || '',
    bp: document.getElementById('v-bp')?.value || '',
    temp: document.getElementById('v-temp')?.value || '',
    pulse: document.getElementById('v-pulse')?.value || '',
    spo2: document.getElementById('v-spo2')?.value || '',
    weight: document.getElementById('v-wt')?.value || '',
    height: document.getElementById('v-ht')?.value || '',
    notes: document.getElementById('c-notes')?.value || '',
    followup: document.getElementById('c-followup')?.value || ''
  });
  DB.opdQueue = DB.opdQueue.filter(x => x.queueId !== queueId);
  DB.activeConsultation = null;
  document.getElementById('opd-consultation-area').innerHTML = `<div class="consultation-placeholder"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="64" height="64" style="opacity:0.3"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg><p>Select a patient from the queue to start consultation</p></div>`;
  renderOPD(); toast('Consultation saved to EMR!', 'success');
}

function removeFromQueue(e, queueId) {
  e.stopPropagation();
  DB.opdQueue = DB.opdQueue.filter(x => x.queueId !== queueId);
  if (DB.activeConsultation === queueId) {
    DB.activeConsultation = null;
    document.getElementById('opd-consultation-area').innerHTML = `<div class="consultation-placeholder"><p>Select a patient from the queue</p></div>`;
  }
  renderOPD();
}

function addToOPDQueue() {
  const pid = document.getElementById('opd-patient').value;
  const dr = document.getElementById('opd-doctor').value;
  if (!pid || !dr) { toast('Select patient and doctor.', 'error'); return; }
  const patient = DB.patients.find(p => p.id === pid);
  const qId = 'Q' + String(DB.opdQueue.length + 1).padStart(3, '0') + Date.now().toString().slice(-3);
  DB.opdQueue.push({ queueId: qId, patientId: pid, patientName: patient ? `${patient.fname} ${patient.lname}` : pid, doctor: dr, priority: document.getElementById('opd-priority').value, complaint: document.getElementById('opd-complaint').value, time: new Date().toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit'}) });
  closeModal('add-opd-modal'); renderOPD(); toast('Patient added to OPD queue.', 'success');
}

function printConsultation(queueId) { toast('Printing prescription...', 'info'); }

// ====== IPD ======
function renderIPD() {
  const grid = document.getElementById('ward-grid');
  const wardColors = { General: '#1a56db', ICU: '#e02424', Private: '#0e9f6e', Maternity: '#7c3aed', Pediatric: '#f59e0b' };
  grid.innerHTML = Object.entries(DB.beds).map(([ward, beds]) => {
    const occupied = beds.filter(b => b.status === 'occupied').length;
    const available = beds.length - occupied;
    return `
      <div class="ward-card">
        <div class="ward-header" style="background:${wardColors[ward]}15;border-bottom:3px solid ${wardColors[ward]}">
          <div>
            <div class="ward-name" style="color:${wardColors[ward]}">${ward} Ward</div>
            <div class="ward-capacity">${occupied}/${beds.length} occupied · ${available} available</div>
          </div>
          <div style="font-size:.75rem;font-weight:700;color:${wardColors[ward]}">${Math.round(occupied/beds.length*100)}%</div>
        </div>
        <div class="ward-beds-grid">
          ${beds.map(b => `
            <div class="ward-bed ${b.status}" title="${b.status === 'occupied' ? b.patient : 'Available — ' + b.no}" onclick="clickBed('${ward}','${b.no}')">
              <div class="bed-no">${b.no}</div>
              ${b.patient ? `<div class="bed-patient">${b.patient.split(' ')[0]}</div>` : ''}
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }).join('');
}

function clickBed(ward, bedNo) {
  const bed = DB.beds[ward]?.find(b => b.no === bedNo);
  if (!bed) return;
  if (bed.status === 'occupied') toast(`Bed ${bedNo}: ${bed.patient} (Occupied)`, 'info');
  else toast(`Bed ${bedNo} is available.`, 'success');
}

function admitPatient() {
  const pid = document.getElementById('ipd-patient').value;
  const ward = document.getElementById('ipd-ward').value;
  const bedNo = document.getElementById('ipd-bed').value.trim();
  const dr = document.getElementById('ipd-doctor').value;
  if (!pid || !ward || !bedNo) { toast('All fields required.', 'error'); return; }
  const patient = DB.patients.find(p => p.id === pid);
  const wardBeds = DB.beds[ward];
  const bed = wardBeds?.find(b => b.no === bedNo);
  if (!bed) {
    // Create new bed entry
    wardBeds?.push({ no: bedNo, key: `${ward}-${bedNo}`, status: 'occupied', patient: patient ? `${patient.fname} ${patient.lname}` : pid });
  } else {
    if (bed.status === 'occupied') { toast('Bed is already occupied!', 'error'); return; }
    bed.status = 'occupied'; bed.patient = patient ? `${patient.fname} ${patient.lname}` : pid;
  }
  if (patient) { patient.status = 'IPD'; patient.doctor = dr; }
  closeModal('admit-patient-modal'); renderIPD(); toast(`Patient admitted to ${ward} Ward, Bed ${bedNo}`, 'success');
}

// ====== EMR ======
function renderEMR(list) {
  const data = list || DB.emrRecords;
  document.getElementById('emr-list').innerHTML = data.map(r => `
    <div class="emr-card">
      <div class="emr-card-header">
        <div>
          <div class="emr-patient-name">${r.patientName}</div>
          <div style="font-size:.72rem;color:var(--text-muted)">${r.patientId}</div>
        </div>
        <div class="emr-date">${formatDate(r.date)}</div>
      </div>
      <div class="emr-diagnosis">${r.diagnosis || 'No diagnosis recorded'}</div>
      <div class="emr-doctor">Dr: ${r.doctorName}</div>
      <div class="emr-vitals-row">
        ${r.bp ? `<span class="emr-vital-chip">BP: ${r.bp}</span>` : ''}
        ${r.temp ? `<span class="emr-vital-chip">Temp: ${r.temp}°F</span>` : ''}
        ${r.pulse ? `<span class="emr-vital-chip">Pulse: ${r.pulse}</span>` : ''}
        ${r.spo2 ? `<span class="emr-vital-chip">SpO2: ${r.spo2}%</span>` : ''}
      </div>
      ${r.prescription ? `<div style="margin-top:10px;font-size:.78rem;background:var(--bg);padding:8px;border-radius:6px;color:var(--text-muted)">${r.prescription.substring(0,100)}${r.prescription.length>100?'...':''}</div>` : ''}
      <div style="margin-top:10px;display:flex;justify-content:space-between;align-items:center">
        ${r.followup ? `<span style="font-size:.72rem;color:var(--secondary)">Follow-up: ${formatDate(r.followup)}</span>` : '<span></span>'}
        <button class="btn-sm" onclick="viewEMR('${r.id}')">View Full</button>
      </div>
    </div>
  `).join('') || '<p style="color:var(--text-muted);text-align:center;padding:20px">No records found.</p>';
}

function viewEMR(id) {
  const r = DB.emrRecords.find(x => x.id === id);
  if (!r) return;
  toast(`EMR: ${r.patientName} — ${r.diagnosis}`, 'info');
}

function searchEMR(q) {
  if (!q) { renderEMR(); return; }
  const ql = q.toLowerCase();
  renderEMR(DB.emrRecords.filter(r => `${r.patientName} ${r.patientId} ${r.diagnosis}`.toLowerCase().includes(ql)));
}

function addEMR() {
  const pid = document.getElementById('emr-patient').value;
  if (!pid) { toast('Select a patient.', 'error'); return; }
  const patient = DB.patients.find(p => p.id === pid);
  DB.emrRecords.push({
    id: 'EMR' + String(DB.emrRecords.length + 1).padStart(3, '0'),
    patientId: pid, patientName: patient ? `${patient.fname} ${patient.lname}` : pid,
    doctorName: document.getElementById('emr-doctor').value,
    date: today(),
    complaint: document.getElementById('emr-complaint').value,
    diagnosis: document.getElementById('emr-diagnosis').value,
    bp: document.getElementById('emr-bp').value,
    temp: document.getElementById('emr-temp').value,
    pulse: document.getElementById('emr-pulse').value,
    spo2: document.getElementById('emr-spo2').value,
    weight: document.getElementById('emr-weight').value,
    height: document.getElementById('emr-height').value,
    symptoms: document.getElementById('emr-symptoms').value,
    prescription: document.getElementById('emr-prescription').value,
    labs: document.getElementById('emr-labs').value,
    notes: document.getElementById('emr-notes').value,
    followup: document.getElementById('emr-followup').value
  });
  closeModal('add-emr-modal'); renderEMR(); toast('Medical record saved!', 'success');
}

// ====== DOCTORS ======
function renderDoctors(list) {
  const data = list || DB.doctors;
  document.getElementById('doctors-grid').innerHTML = data.map(d => `
    <div class="doctor-card">
      <div class="doctor-avatar">${d.name.split(' ').filter(w=>w.startsWith('Dr')?false:true)[0]?.[0]||d.name[0]}</div>
      <div class="doctor-name">${d.name}</div>
      <div class="doctor-spec">${d.spec}</div>
      <div class="doctor-dept">${d.dept}</div>
      <div style="font-size:.75rem;color:var(--text-muted)">${d.phone}</div>
      <div style="margin-top:6px">
        ${'★'.repeat(Math.floor(d.rating||4))}${'☆'.repeat(5-Math.floor(d.rating||4))}
        <span style="font-size:.7rem;margin-left:4px">${d.rating}</span>
      </div>
      <div class="doctor-stats">
        <div><div class="doctor-stat-val">${d.patients}</div><div class="doctor-stat-label">Patients</div></div>
        <div><div class="doctor-stat-val">${d.exp}y</div><div class="doctor-stat-label">Experience</div></div>
        <div><div class="doctor-stat-val">${rupee(d.fee)}</div><div class="doctor-stat-label">Fee</div></div>
      </div>
      <div class="doctor-actions">
        <button class="btn-sm" onclick="toast('Viewing doctor profile...','info')">Profile</button>
        <button class="btn-sm" style="background:rgba(14,159,110,.1);color:var(--secondary)" onclick="toast('Schedule view...','info')">Schedule</button>
      </div>
    </div>
  `).join('') || '<p style="color:var(--text-muted);padding:20px">No doctors found.</p>';
}

function filterDoctors(q) {
  if (!q) { renderDoctors(); return; }
  const ql = q.toLowerCase();
  renderDoctors(DB.doctors.filter(d => `${d.name} ${d.spec} ${d.dept}`.toLowerCase().includes(ql)));
}

function addDoctor() {
  const name = document.getElementById('doc-name').value.trim();
  if (!name) { toast('Name is required.', 'error'); return; }
  DB.doctors.push({
    id: 'D' + String(DB.doctors.length + 1).padStart(3, '0'),
    name, spec: document.getElementById('doc-spec').value,
    dept: document.getElementById('doc-dept').value,
    phone: document.getElementById('doc-phone').value,
    email: document.getElementById('doc-email').value,
    license: document.getElementById('doc-license').value,
    role: document.getElementById('doc-role').value,
    exp: parseInt(document.getElementById('doc-exp').value) || 0,
    fee: parseInt(document.getElementById('doc-fee').value) || 0,
    patients: 0, rating: 4.5
  });
  closeModal('add-doctor-modal'); renderDoctors(); populateAllDropdowns(); toast(`${name} added successfully!`, 'success');
}

// ====== PHARMACY ======
function renderPharmacy(list) {
  const data = list || DB.medicines;
  const today_ = today();
  document.getElementById('pharma-tbody').innerHTML = data.map(m => {
    const isLow = m.stock < m.minStock;
    const isExpiring = m.expiry < futureDate(30);
    return `
      <tr>
        <td><strong>${m.id}</strong></td>
        <td><span style="font-weight:600">${m.name}</span></td>
        <td>${m.category}</td>
        <td>${m.mfg}</td>
        <td>
          <span style="font-weight:700;color:${isLow?'var(--danger)':'var(--text)'}">${m.stock}</span>
          ${isLow ? '<span class="badge-status badge-low" style="margin-left:4px">Low</span>' : ''}
        </td>
        <td>${rupee(m.price)}</td>
        <td style="color:${isExpiring?'var(--danger)':'inherit'}">${formatDate(m.expiry)}</td>
        <td><span class="badge-status ${isLow?'badge-low':'badge-ok'}">${isLow?'Low Stock':'Available'}</span></td>
        <td class="actions">
          <button class="btn-sm" onclick="reorderMed('${m.id}')">Reorder</button>
          <button class="btn-danger" onclick="deleteMed('${m.id}')">Del</button>
        </td>
      </tr>
    `;
  }).join('') || '<tr><td colspan="9" style="text-align:center;padding:20px;color:var(--text-muted)">No medicines found.</td></tr>';
}

function filterMeds(q) {
  const cat = document.getElementById('med-category-filter').value;
  let list = DB.medicines;
  if (q) { const ql = q.toLowerCase(); list = list.filter(m => `${m.name} ${m.mfg}`.toLowerCase().includes(ql)); }
  if (cat) list = list.filter(m => m.category === cat);
  renderPharmacy(list);
}

function addMedicine() {
  const name = document.getElementById('med-name').value.trim();
  if (!name) { toast('Medicine name required.', 'error'); return; }
  DB.medicines.push({
    id: 'M' + String(DB.medicines.length + 1).padStart(3, '0'),
    name, category: document.getElementById('med-cat').value,
    mfg: document.getElementById('med-mfg').value,
    stock: parseInt(document.getElementById('med-stock').value) || 0,
    price: parseFloat(document.getElementById('med-price').value) || 0,
    expiry: document.getElementById('med-expiry').value,
    batch: document.getElementById('med-batch').value,
    minStock: parseInt(document.getElementById('med-min').value) || 50
  });
  closeModal('add-med-modal'); renderPharmacy(); toast(`${name} added to pharmacy.`, 'success');
}

function reorderMed(id) {
  const m = DB.medicines.find(x => x.id === id);
  if (m) { m.stock += 100; renderPharmacy(); toast(`Reorder placed for ${m.name}. Stock updated.`, 'success'); }
}

function deleteMed(id) {
  if (!confirm('Delete this medicine?')) return;
  DB.medicines = DB.medicines.filter(m => m.id !== id);
  renderPharmacy(); toast('Medicine removed.', 'info');
}

function dispenseMedicine() {
  const pid = document.getElementById('disp-patient').value;
  const mid = document.getElementById('disp-med').value;
  const qty = parseInt(document.getElementById('disp-qty').value) || 1;
  const med = DB.medicines.find(m => m.id === mid);
  if (!med) { toast('Select a medicine.', 'error'); return; }
  if (med.stock < qty) { toast('Insufficient stock!', 'error'); return; }
  med.stock -= qty;
  closeModal('dispense-modal'); renderPharmacy(); toast(`Dispensed ${qty} units of ${med.name}.`, 'success');
}

// ====== LABORATORY ======
function renderLab(list) {
  const data = list || DB.labTests;
  document.getElementById('lab-tbody').innerHTML = data.map(l => `
    <tr>
      <td><strong>${l.id}</strong></td>
      <td>${l.patientName}</td>
      <td>${l.test}</td>
      <td style="font-size:.78rem">${l.doctor}</td>
      <td>${formatDate(l.date)}</td>
      <td><span class="badge-status badge-${l.status.toLowerCase().replace(' ','-')}">${l.status}</span></td>
      <td style="font-size:.78rem;max-width:200px">${l.result || '<span style="color:var(--text-muted)">Pending</span>'}</td>
      <td class="actions">
        ${l.status !== 'Completed' ? `<button class="btn-sm" onclick="completeLabTest('${l.id}')">Enter Result</button>` : ''}
        <button class="btn-sm" style="background:rgba(14,159,110,.1);color:var(--secondary)" onclick="printLabReport('${l.id}')">Print</button>
      </td>
    </tr>
  `).join('') || '<tr><td colspan="8" style="text-align:center;padding:20px;color:var(--text-muted)">No tests found.</td></tr>';
}

function filterLab(q) {
  if (!q) { renderLab(); return; }
  const ql = q.toLowerCase();
  renderLab(DB.labTests.filter(l => `${l.patientName} ${l.test}`.toLowerCase().includes(ql)));
}

function addLabTest() {
  const pid = document.getElementById('lab-patient').value;
  if (!pid) { toast('Select patient.', 'error'); return; }
  const patient = DB.patients.find(p => p.id === pid);
  const id = `L-${String(++DB.nextIds.lab).padStart(6,'0')}`;
  DB.labTests.push({
    id, patientId: pid, patientName: patient ? `${patient.fname} ${patient.lname}` : pid,
    test: document.getElementById('lab-test').value,
    doctor: document.getElementById('lab-doctor').value,
    date: today(), status: 'Pending', result: '',
    priority: document.getElementById('lab-priority').value
  });
  closeModal('add-lab-modal'); renderLab(); toast('Lab test submitted!', 'success');
}

function completeLabTest(id) {
  const result = prompt('Enter test result:');
  if (result === null) return;
  const t = DB.labTests.find(x => x.id === id);
  if (t) { t.result = result; t.status = 'Completed'; renderLab(); toast('Lab result updated!', 'success'); }
}

function printLabReport(id) { toast('Printing lab report...', 'info'); }

// ====== BILLING ======
function calcInvoiceAmount(inv) {
  const subtotal = inv.services.reduce((s, x) => s + (Number(x.price)||0), 0);
  const disc = subtotal * (inv.discount || 0) / 100;
  const net = subtotal - disc;
  const balance = net - (inv.paid || 0);
  return { subtotal, disc, net, balance };
}

function renderBilling(list) {
  const data = list || DB.invoices;
  // Summary
  const totalRev = DB.invoices.reduce((s, i) => s + (i.paid || 0), 0);
  const totalPending = DB.invoices.filter(i => i.status !== 'Paid').reduce((s, i) => s + calcInvoiceAmount(i).balance, 0);
  const paid = DB.invoices.filter(i => i.status === 'Paid').length;
  document.getElementById('billing-summary').innerHTML = `
    <div class="billing-stat"><div class="billing-stat-value" style="color:var(--secondary)">${rupee(totalRev)}</div><div class="billing-stat-label">Total Collected</div></div>
    <div class="billing-stat"><div class="billing-stat-value" style="color:var(--danger)">${rupee(totalPending)}</div><div class="billing-stat-label">Outstanding</div></div>
    <div class="billing-stat"><div class="billing-stat-value">${DB.invoices.length}</div><div class="billing-stat-label">Total Invoices</div></div>
    <div class="billing-stat"><div class="billing-stat-value" style="color:var(--secondary)">${paid}</div><div class="billing-stat-label">Paid Invoices</div></div>
  `;
  document.getElementById('billing-tbody').innerHTML = data.map(inv => {
    const { subtotal, disc, net, balance } = calcInvoiceAmount(inv);
    return `
      <tr>
        <td><strong>${inv.id}</strong></td>
        <td>${inv.patientName}</td>
        <td style="font-size:.75rem">${inv.services.map(s=>s.name).join(', ').substring(0,40)}...</td>
        <td><strong>${rupee(net)}</strong></td>
        <td style="color:var(--secondary)">${rupee(inv.paid)}</td>
        <td style="color:${balance>0?'var(--danger)':'var(--secondary)'}">${rupee(balance)}</td>
        <td>${formatDate(inv.date)}</td>
        <td><span class="badge-status badge-${inv.status.toLowerCase()}">${inv.status}</span></td>
        <td class="actions">
          <button class="btn-sm" onclick="viewInvoice('${inv.id}')">View</button>
          ${balance > 0 ? `<button class="btn-sm" style="background:rgba(14,159,110,.1);color:var(--secondary)" onclick="markPaid('${inv.id}')">Pay</button>` : ''}
        </td>
      </tr>
    `;
  }).join('') || '<tr><td colspan="9" style="text-align:center;padding:20px;color:var(--text-muted)">No invoices found.</td></tr>';
}

function filterBilling(q) {
  const s = document.getElementById('billing-status-filter').value;
  let list = DB.invoices;
  if (q) { const ql = q.toLowerCase(); list = list.filter(i => `${i.patientName} ${i.id}`.toLowerCase().includes(ql)); }
  if (s) list = list.filter(i => i.status === s);
  renderBilling(list);
}

function viewInvoice(id) {
  const inv = DB.invoices.find(x => x.id === id);
  if (!inv) return;
  const { subtotal, disc, net, balance } = calcInvoiceAmount(inv);
  document.getElementById('print-invoice-content').innerHTML = `
    <div class="invoice-print">
      <div class="invoice-header">
        <div>
          <div class="invoice-hospital">City General Hospital</div>
          <div class="invoice-details">123 Medical Complex, Andheri East, Mumbai — 400069<br>Ph: +91 22 1234 5678 | GST: 27AAAPZ2323J1ZP</div>
        </div>
        <div>
          <div class="invoice-no">${inv.id}</div>
          <div class="invoice-details">${formatDate(inv.date)}<br><span class="badge-status badge-${inv.status.toLowerCase()}">${inv.status}</span></div>
        </div>
      </div>
      <div class="invoice-patient">
        <strong>Bill To:</strong> ${inv.patientName} &nbsp;|&nbsp; Patient ID: ${inv.patientId}<br>
        <small>Payment Method: ${inv.paymentMethod}</small>
      </div>
      <table class="invoice-table">
        <thead><tr><th>#</th><th>Service</th><th>Amount</th></tr></thead>
        <tbody>
          ${inv.services.map((s, i) => `<tr><td>${i+1}</td><td>${s.name}</td><td>${rupee(s.price)}</td></tr>`).join('')}
        </tbody>
      </table>
      <div class="invoice-totals">
        <div class="inv-total-row"><span>Subtotal</span><span>${rupee(subtotal)}</span></div>
        ${disc > 0 ? `<div class="inv-total-row"><span>Discount (${inv.discount}%)</span><span>- ${rupee(disc)}</span></div>` : ''}
        <div class="inv-total-row grand"><span>Net Amount</span><span>${rupee(net)}</span></div>
        <div class="inv-total-row"><span>Amount Paid</span><span style="color:var(--secondary)">${rupee(inv.paid)}</span></div>
        <div class="inv-total-row" style="color:${balance>0?'var(--danger)':'var(--secondary)'}"><span>Balance Due</span><span>${rupee(balance)}</span></div>
      </div>
      <div style="text-align:center;margin-top:24px;font-size:.75rem;color:var(--text-muted)">Thank you for choosing City General Hospital. Get well soon!</div>
    </div>
  `;
  openModal('print-invoice-modal');
}

function printInvoice() { window.print(); }

function markPaid(id) {
  const inv = DB.invoices.find(x => x.id === id);
  if (!inv) return;
  const { net } = calcInvoiceAmount(inv);
  inv.paid = net; inv.status = 'Paid';
  renderBilling(); toast(`Invoice ${id} marked as Paid.`, 'success');
}

function createInvoice() {
  const pid = document.getElementById('inv-patient').value;
  if (!pid) { toast('Select patient.', 'error'); return; }
  const patient = DB.patients.find(p => p.id === pid);
  const rows = document.querySelectorAll('.service-row');
  const services = [];
  rows.forEach(row => {
    const name = row.querySelector('.svc-name').value.trim();
    const price = parseFloat(row.querySelector('.svc-price').value) || 0;
    if (name) services.push({ name, price });
  });
  if (!services.length) { toast('Add at least one service.', 'error'); return; }
  const id = `INV-${String(++DB.nextIds.invoice).padStart(6,'0')}`;
  const paid = parseFloat(document.getElementById('inv-paid').value) || 0;
  const discount = parseInt(document.getElementById('inv-discount').value) || 0;
  const subtotal = services.reduce((s, x) => s + x.price, 0);
  const net = subtotal - (subtotal * discount / 100);
  DB.invoices.push({
    id, patientId: pid, patientName: patient ? `${patient.fname} ${patient.lname}` : pid,
    services, discount, paid,
    paymentMethod: document.getElementById('inv-payment').value,
    date: today(), status: paid >= net ? 'Paid' : paid > 0 ? 'Partial' : 'Pending'
  });
  closeModal('add-invoice-modal'); renderBilling(); toast(`Invoice ${id} created!`, 'success');
}

function addServiceRow() {
  const div = document.createElement('div'); div.className = 'service-row';
  div.innerHTML = '<input type="text" placeholder="Service name" class="svc-name" /><input type="number" placeholder="₹" class="svc-price" /><button onclick="removeServiceRow(this)" class="btn-icon-danger">×</button>';
  document.getElementById('services-list').appendChild(div);
}
function removeServiceRow(btn) { btn.parentElement.remove(); }
function calcInvoiceTotal() {}

// ====== INVENTORY ======
function renderInventory(list) {
  const data = list || DB.inventory;
  document.getElementById('inventory-tbody').innerHTML = data.map(item => {
    const isLow = item.stock < item.minStock;
    return `
      <tr>
        <td><strong>${item.id}</strong></td>
        <td>${item.name}</td>
        <td>${item.category}</td>
        <td style="font-weight:700;color:${isLow?'var(--danger)':'inherit'}">${item.stock}</td>
        <td>${item.unit}</td>
        <td>${item.minStock}</td>
        <td>${item.supplier}</td>
        <td>${formatDate(item.updated)}</td>
        <td><span class="badge-status ${isLow?'badge-low':'badge-ok'}">${isLow?'Low':'OK'}</span></td>
        <td class="actions">
          <button class="btn-sm" onclick="restockItem('${item.id}')">Restock</button>
          <button class="btn-danger" onclick="deleteInvItem('${item.id}')">Del</button>
        </td>
      </tr>
    `;
  }).join('') || '<tr><td colspan="10" style="text-align:center;padding:20px;color:var(--text-muted)">No items found.</td></tr>';
}

function filterInventory(q) {
  if (!q) { renderInventory(); return; }
  const ql = q.toLowerCase();
  renderInventory(DB.inventory.filter(i => `${i.name} ${i.category} ${i.supplier}`.toLowerCase().includes(ql)));
}

function addInventoryItem() {
  const name = document.getElementById('inv-name').value.trim();
  if (!name) { toast('Item name required.', 'error'); return; }
  DB.inventory.push({
    id: 'INV' + String(DB.inventory.length + 1).padStart(3, '0'),
    name, category: document.getElementById('inv-cat').value,
    stock: parseInt(document.getElementById('inv-qty').value) || 0,
    unit: document.getElementById('inv-unit').value,
    minStock: parseInt(document.getElementById('inv-min').value) || 10,
    supplier: document.getElementById('inv-supplier').value,
    updated: today()
  });
  closeModal('add-inv-modal'); renderInventory(); toast('Inventory item added!', 'success');
}

function restockItem(id) {
  const qty = prompt('Enter restock quantity:');
  if (qty === null) return;
  const item = DB.inventory.find(x => x.id === id);
  if (item) { item.stock += parseInt(qty) || 0; item.updated = today(); renderInventory(); toast(`${item.name} restocked by ${qty} units.`, 'success'); }
}

function deleteInvItem(id) {
  if (!confirm('Delete inventory item?')) return;
  DB.inventory = DB.inventory.filter(x => x.id !== id);
  renderInventory(); toast('Item deleted.', 'info');
}

// ====== REPORTS ======
function generateReport(type) {
  const out = document.getElementById('report-output');
  out.classList.remove('hidden');
  const today_ = today();
  let html = '';

  if (type === 'daily') {
    const todayPatients = DB.patients.filter(p => p.admitted === today_).length;
    const todayAppts = DB.appointments.filter(a => a.date === today_).length;
    const todayRev = DB.invoices.filter(i => i.date === today_).reduce((s, i) => s + (i.paid||0), 0);
    html = `<h3 style="margin-bottom:16px">📋 Daily Summary Report — ${formatDate(today_)}</h3>
    <table><tr><th>Metric</th><th>Count</th><th>Details</th></tr>
    <tr><td>New Patients</td><td><b>${todayPatients}</b></td><td>Registered today</td></tr>
    <tr><td>Appointments</td><td><b>${todayAppts}</b></td><td>Total scheduled/completed</td></tr>
    <tr><td>OPD Queue</td><td><b>${DB.opdQueue.length}</b></td><td>Currently waiting</td></tr>
    <tr><td>Beds Occupied</td><td><b>${Object.values(DB.beds).flat().filter(b=>b.status==='occupied').length}</b></td><td>Across all wards</td></tr>
    <tr><td>Revenue Collected</td><td><b>${rupee(todayRev)}</b></td><td>Today's billing</td></tr>
    <tr><td>Lab Tests</td><td><b>${DB.labTests.filter(l=>l.date===today_).length}</b></td><td>Today's tests</td></tr>
    </table>`;
  } else if (type === 'monthly') {
    html = `<h3 style="margin-bottom:16px">📊 Monthly Analytics Report</h3>
    <table><tr><th>Department</th><th>Patients</th><th>% Share</th></tr>
    ${DB.departments.slice(0,8).map((d,i) => {
      const n = DB.patients.filter(p => p.dept === d).length || Math.floor(Math.random()*20)+5;
      return `<tr><td>${d}</td><td>${n}</td><td>${Math.floor(n/DB.patients.length*100)||Math.floor(Math.random()*15+5)}%</td></tr>`;
    }).join('')}
    </table>`;
  } else if (type === 'financial') {
    const total = DB.invoices.reduce((s,i)=>s+calcInvoiceAmount(i).net,0);
    const collected = DB.invoices.reduce((s,i)=>s+(i.paid||0),0);
    html = `<h3 style="margin-bottom:16px">💰 Financial Report</h3>
    <table><tr><th>Invoice</th><th>Patient</th><th>Amount</th><th>Paid</th><th>Balance</th><th>Status</th></tr>
    ${DB.invoices.map(i => {
      const {net,balance} = calcInvoiceAmount(i);
      return `<tr><td>${i.id}</td><td>${i.patientName}</td><td>${rupee(net)}</td><td>${rupee(i.paid)}</td><td>${rupee(balance)}</td><td>${i.status}</td></tr>`;
    }).join('')}
    <tr style="font-weight:bold;background:var(--bg)"><td colspan="2">TOTAL</td><td>${rupee(total)}</td><td>${rupee(collected)}</td><td>${rupee(total-collected)}</td><td>—</td></tr>
    </table>`;
  } else if (type === 'inventory') {
    const lowStock = DB.inventory.filter(i => i.stock < i.minStock);
    const lowMeds = DB.medicines.filter(m => m.stock < m.minStock);
    html = `<h3 style="margin-bottom:16px">📦 Inventory Report</h3>
    <p style="color:var(--danger);font-weight:600;margin-bottom:8px">⚠ ${lowStock.length + lowMeds.length} items need reordering</p>
    <table><tr><th>Item</th><th>Category</th><th>Current Stock</th><th>Min Stock</th><th>Status</th></tr>
    ${[...DB.inventory,...DB.medicines.map(m=>({...m,category:m.category+' (Medicine)',unit:'Units',supplier:m.mfg}))].map(i => {
      const low = i.stock < i.minStock;
      return `<tr style="${low?'background:rgba(224,36,36,.05)':''}"><td>${i.name}</td><td>${i.category}</td><td style="${low?'color:var(--danger);font-weight:bold':''}">${i.stock}</td><td>${i.minStock}</td><td>${low?'🔴 LOW':'🟢 OK'}</td></tr>`;
    }).join('')}
    </table>`;
  } else if (type === 'doctor') {
    html = `<h3 style="margin-bottom:16px">👨‍⚕️ Doctor Performance Report</h3>
    <table><tr><th>Doctor</th><th>Specialization</th><th>Patients</th><th>Rating</th><th>Consultations</th><th>Revenue</th></tr>
    ${DB.doctors.map(d => {
      const rev = d.patients * d.fee;
      return `<tr><td>${d.name}</td><td>${d.spec}</td><td>${d.patients}</td><td>${'★'.repeat(Math.floor(d.rating))} ${d.rating}</td><td>${d.patients + Math.floor(Math.random()*10)}</td><td>${rupee(rev)}</td></tr>`;
    }).join('')}
    </table>`;
  } else if (type === 'lab') {
    html = `<h3 style="margin-bottom:16px">🔬 Laboratory Report</h3>
    <table><tr><th>Test ID</th><th>Patient</th><th>Test</th><th>Date</th><th>Priority</th><th>Status</th><th>Result</th></tr>
    ${DB.labTests.map(l => `<tr><td>${l.id}</td><td>${l.patientName}</td><td>${l.test}</td><td>${formatDate(l.date)}</td><td>${l.priority}</td><td>${l.status}</td><td style="font-size:.75rem">${l.result||'Pending'}</td></tr>`).join('')}
    </table>`;
  }
  out.innerHTML = html;
  out.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ====== SETTINGS ======
function renderDepartments() {
  const el = document.getElementById('dept-list');
  if (!el) return;
  el.innerHTML = DB.departments.map(d => `
    <span class="dept-chip">${d}<button onclick="removeDept('${d}')">×</button></span>
  `).join('');
}

function addDept() {
  const val = document.getElementById('new-dept-name').value.trim();
  if (!val || DB.departments.includes(val)) { toast('Invalid or duplicate department.', 'error'); return; }
  DB.departments.push(val); document.getElementById('new-dept-name').value = '';
  renderDepartments(); populateAllDropdowns(); toast(`Department '${val}' added!`, 'success');
}

function removeDept(name) {
  DB.departments = DB.departments.filter(d => d !== name);
  renderDepartments(); populateAllDropdowns();
}

function renderUsersSettings() {
  const el = document.getElementById('settings-users-list');
  if (!el) return;
  el.innerHTML = `<div class="users-list">${DB.users.map(u => `
    <div class="user-row">
      <div class="user-avatar" style="width:28px;height:28px;font-size:.7rem">${u.name[0]}</div>
      <div style="flex:1">
        <div style="font-size:.83rem;font-weight:600">${u.name}</div>
        <div style="font-size:.72rem;color:var(--text-muted)">${u.username} · ${u.role}</div>
      </div>
      <button class="btn-danger" style="padding:3px 8px;font-size:.72rem" onclick="deleteUser('${u.id}')">Remove</button>
    </div>
  `).join('')}</div>`;
}

function addUser() {
  const name = document.getElementById('user-name-input').value.trim();
  const username = document.getElementById('user-username').value.trim();
  const pass = document.getElementById('user-pass').value;
  if (!name || !username || !pass) { toast('All fields required.', 'error'); return; }
  if (DB.users.find(u => u.username === username)) { toast('Username already exists.', 'error'); return; }
  DB.users.push({ id: 'U' + String(DB.users.length + 1).padStart(3,'0'), name, username, password: pass, role: document.getElementById('user-role-input').value });
  closeModal('add-user-modal'); renderUsersSettings(); toast(`User ${name} added!`, 'success');
}

function deleteUser(id) {
  if (DB.users.length <= 1) { toast('Cannot delete last user.', 'error'); return; }
  DB.users = DB.users.filter(u => u.id !== id);
  renderUsersSettings(); toast('User removed.', 'info');
}

function toggleDarkMode(on) {
  document.body.classList.toggle('dark', on);
  setTimeout(() => { drawAdmissionsChart(); drawDeptChart(); }, 100);
}

// ====== POPULATE DROPDOWNS ======
function populateAllDropdowns() {
  const patientOpts = DB.patients.map(p => `<option value="${p.id}">${p.fname} ${p.lname} (${p.id})</option>`).join('');
  const doctorOpts = DB.doctors.map(d => `<option value="${d.name}">${d.name} — ${d.spec}</option>`).join('');
  const deptOpts = DB.departments.map(d => `<option value="${d}">${d}</option>`).join('');
  const medOpts = DB.medicines.map(m => `<option value="${m.id}">${m.name}</option>`).join('');

  const selectors = {
    'p-doctor': doctorOpts, 'p-dept': deptOpts,
    'appt-patient': patientOpts, 'appt-doctor': doctorOpts, 'appt-dept': deptOpts,
    'opd-patient': patientOpts, 'opd-doctor': doctorOpts,
    'ipd-patient': patientOpts, 'ipd-doctor': doctorOpts,
    'emr-patient': patientOpts, 'emr-doctor': doctorOpts,
    'doc-dept': deptOpts,
    'disp-patient': patientOpts, 'disp-med': medOpts, 'disp-doctor': doctorOpts,
    'lab-patient': patientOpts, 'lab-doctor': doctorOpts,
    'inv-patient': patientOpts,
  };
  Object.entries(selectors).forEach(([id, opts]) => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = `<option value="">— Select —</option>` + opts;
  });
}

// ====== MODALS ======
function openModal(id) {
  document.getElementById(id).classList.remove('hidden');
}
function closeModal(id) {
  document.getElementById(id).classList.add('hidden');
}
function closeModalOnOverlay(e, id) {
  if (e.target === document.getElementById(id)) closeModal(id);
}

// ====== TOAST ======
function toast(msg, type = 'info') {
  const t = document.getElementById('toast');
  t.textContent = msg; t.className = `toast ${type}`;
  t.classList.remove('hidden');
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(() => t.classList.add('hidden'), 3500);
}

// ====== NOTIFICATIONS ======
function toggleNotif() {
  document.getElementById('notif-panel').classList.toggle('hidden');
}

// ====== GLOBAL SEARCH ======
function globalSearch(q) {
  if (!q || q.length < 2) return;
  const ql = q.toLowerCase();
  const patients = DB.patients.filter(p => `${p.fname} ${p.lname} ${p.id}`.toLowerCase().includes(ql)).slice(0, 3);
  if (patients.length) {
    toast(`Found: ${patients.map(p=>`${p.fname} ${p.lname}`).join(', ')}`, 'info');
  }
}

// ====== KEYBOARD SHORTCUTS ======
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') document.querySelectorAll('.modal-overlay:not(.hidden)').forEach(m => m.classList.add('hidden'));
});

// ====== START ======
// Auto-resize charts on window resize
window.addEventListener('resize', () => {
  if (document.getElementById('page-dashboard').classList.contains('active')) {
    drawAdmissionsChart(); drawDeptChart();
  }
});
