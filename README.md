# ARISE — Academic Risk Intelligence & Student ERP

**ARISE** is an integrated **Academic ERP, Learning Management System (LMS), AI-driven Student Risk Analysis platform, and Blockchain-backed Credential System** — built to help institutions identify at-risk students early, intervene before it's too late, and issue tamper-proof academic records.

> Repository: [arise-intel](https://github.com/Abijith-U0245/arise-intel)

---

## The Problem

Academic institutions sit on huge amounts of student data — attendance, grades, assignment submissions, behavioral patterns — but most of it goes unused until it's too late. Students often slip through the cracks until a failing grade or dropout becomes unavoidable. At the same time, academic certificates and records remain vulnerable to forgery and lack verifiable provenance.

**ARISE** addresses both problems: turning raw data into early warning signals for faculty, while anchoring critical academic records on a decentralized ledger for verifiable, tamper-proof integrity.

---

## Core Features

### Student Risk Analysis Engine
- Continuously evaluates attendance, academic performance, and engagement signals
- Flags at-risk students early using ML-driven scoring
- Surfaces actionable insights to faculty dashboards for timely intervention

### Academic ERP
- Centralized management of student records, courses, and institutional data
- Streamlined administrative workflows
- Role-based access for students, faculty, and admins

### Learning Management System (LMS)
- Course management, assignments, and content delivery
- Progress tracking across courses and cohorts
- Unified dashboard for academic performance monitoring

### Blockchain-Backed Credentials (Hyperledger Fabric)
- Decentralized ledger for issuing and verifying academic records and certificates
- Tamper-proof, cryptographically verifiable credential trail
- Permissioned network architecture suited for institutional consortiums
- Enables instant third-party verification of student credentials without relying on a central authority

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | TypeScript, React |
| Backend | Node.js, JavaScript |
| Database | MongoDB |
| Risk Scoring | Python-based ML models |
| Blockchain | IBM Hyperledger Fabric (decentralized ledger) |

Languages: TypeScript (88.2%) - JavaScript (10.8%) - Other (1.0%)

---

## Project Structure

```
arise-intel/
├── backend/        # API, server logic, risk analysis engine, blockchain integration
├── frontend/        # React + TypeScript client application
└── .gitignore
```

---

## Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn
- MongoDB instance (local or cloud)
- Hyperledger Fabric network (for blockchain credential module)

### Installation

```bash
git clone https://github.com/Abijith-U0245/arise-intel.git
cd arise-intel

cd backend
npm install

cd ../frontend
npm install
```

### Running the App

```bash
cd backend
npm run dev

cd frontend
npm run dev
```

---

## Vision

ARISE aims to bridge the gap between raw academic data and actionable institutional decisions, while establishing a verifiable, decentralized standard for academic credentials - making student success proactive and credential trust permanent.

---

## Author

**Abijith U**
- GitHub: [@Abijith-U0245](https://github.com/Abijith-U0245)
- LinkedIn: [abijithu45](https://www.linkedin.com/in/abijithu45)
- Portfolio: [abijithu.netlify.app](https://abijithu.netlify.app/)

---

## License

This project is open for educational and demonstration purposes. Feel free to fork and build upon it.
