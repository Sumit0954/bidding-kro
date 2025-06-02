# 🛒 Bidding Karo Frontend

**Bidding Karo** is a comprehensive bidding platform enabling buyers and suppliers to participate in structured bidding processes such as **L1 (Lowest Price)** and **QCBS (Quality and Cost Based Selection)**. This project serves developers, product managers, and client.

---

## 📦 Tech Stack

| Layer            | Technology                          | Version                 | Library Link                                                                                                                              |
| ---------------- | ----------------------------------- | ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| Package Manager  | npm                                 | 10.x (auto-managed)     | [npm](https://www.npmjs.com/)                                                                                                             |
| Frontend         | React + Vite                        | 18.3.1 , 6.0.3          | [React](https://react.dev/) · [Vite](https://vitejs.dev/)                                                                                 |
| UI               | Material-UI (MUI) , Bootstrap, Sass | 5.16.7 , 5.3.3 , 1.83.0 | [MUI](https://www.npmjs.com/package/@mui/material) · [Bootstrap](https://www.npmjs.com/package/) , [Sass](https://www.npmjs.com/package/) |
| Forms            | React Hook Form                     | 7.54.1                  | [React Hook Form](https://www.npmjs.com/package/react-hook-form)                                                                          |
| Text Editor      | CKEditor                            | 41.4.2 (build)          | [CKEditor 5](https://ckeditor.com/ckeditor-5/)                                                                                            |
| Notifications    | Novu , Firebase                     | 2.6.3 , 11.2.0          | [Novu](https://novu.co/) · [Firebase](https://firebase.google.com/)                                                                       |
| Charts/Excel     | XLSX                                | 0.20.3 (@e965/xlsx)     | [@e965/xlsx ](https://www.npmjs.com/package/@e965/xlsx)                                                                                   |
| Routing          | React Router DOM                    | 6.28.0                  | [React Router](https://www.npmjs.com/package/react-router-dom)                                                                            |
| State management | Redux, React Context API            | 2.5.0 + Native          | [Redux Toolkit](https://www.npmjs.com/package/@reduxjs/toolkit) · [Context API](https://react.dev/learn/passing-data-deeply-with-context) |
| APIs fetching    | Axios                               | 1.7.9                   | [Axios](https://www.npmjs.com/package/axios)                                                                                              |
| Tables           | React Table                         | 7.8.0                   | [React Table](https://www.npmjs.com/package/react-table)                                                                                  |

---

## 🚀 Features Overview

### 🧑‍💼 Buyer Features

- Create and manage bids (L1 or QCBS)
- Invite suppliers
- Approve/reject samples (QCBS)
- Set live bid dates
- Issue Letter of Intent (LOI)
- Provide feedback to suppliers

### 🛍️ Supplier Features

- View invited bids
- Submit samples (QCBS)
- Participate in live bidding (if eligible)
- View bid status
- Provide feedback to buyers

### 🧠 Admin Capabilities

- Role management (Buyer, Supplier)
- Monitor bid statistics
- Control platform flows and sample evaluation

---

## 🔁 Bidding Flows

### L1 (Lowest Price)

- Buyers create bids
- Suppliers can directly join the live bid
- The lowest bidder wins

### QCBS (Quality and Cost Based Selection)

- Suppliers must send samples
- Buyer manually approves/rejects them
- Only approved suppliers can join live bidding
- No scoring, only approve/reject based on samples

### Award selection

By default, L1 bid type aims to select the lowest bidder. However, the buyer retains the right to award the bid to a non-L1 supplier based on their internal considerations such as quality, past performance, or reliability.

## 📁 Folder Structure

```text
biddingkaro-frontend/
├── public/                 # Static images and assets
├── src/                    # Source code
│   ├── assets/             # Images and static resources
│   ├── components/         # Reusable UI components
│   ├── contexts/           # Application global data managers
│   ├── elements/           # Common reusable component
│   ├── helpers/            # API URLs, API methods, formatters, validators
│   ├── pages/              # Page-level components
│   ├── services/           # API handling and service functions
│   ├── routes/             # Website navigator routes (admin, portal, website)
│   ├── store/              # Redux store for global state
│   ├── App.js              # Main app component
│   └── main.jsx            # App entry point
├── .env                    # Private environment variables
├── package.json            # Project dependencies and scripts
└── vite.config.js          # Vite configuration file

```

## ⚙️ Setup Instructions

### 1. Clone the Repo

```bash
git clone <https://github.com/appcode-tech/biddingkaro-frontend.git>
cd biddingkaro-frontend
npm install
```

## 2. For any dependency installation

npm install dependency-name eg: npm install react-redux

## 3. Environment Variables

Create a .env file and configure as needed:

VITE_API_URL=[https://devapi.biddingkaro.in]

## 4. Start the App

npm run dev

## 5. Build (To build a React project)

npm run build

## 📡 API Integration

All API calls are handled through ./helpers/api/\_sendAPIRequest. Common patterns used:

Axios for HTTP requests

Centralized service modules for maintainability

Error handling and token-based auth

## 📊 Key Modules

| Module            | Path                                                      | Description                      |
| ----------------- | --------------------------------------------------------- | -------------------------------- |
| Company Creation  | src/pages/portal/company-profile-pages/CompanyProfilePage | Form to create company profile   |
| Create Bid        | src/pages/portal/bid-pages/BidCategoriesPage              | Form to initiate L1/QCBS bids    |
| Feedback          | src/components/portal/bids/tabs/Feedback                  | Buyer/Supplier feedback UI       |
| Live Bidding      | src/components/portal/live-bids/Livebids                  | Participation page for suppliers |
| Sample Review     | src/components/portal/bids/tabs/SampleReceiving           | Buyer sample review & decision   |
| LOI features/LOI/ | src/components/portal/bids/tabs/LetterOfintent            | Letter of Intent post-bidding    |

## ✉️ Feedback & Communication

After the LOI:

Buyers and Suppliers can leave feedback

One-liner messages and star ratings supported

## 👥 User Roles Summary

| Role     | Capabilities                                      |
| -------- | ------------------------------------------------- |
| Buyer    | Create bid, review sample, invite, set live dates |
| Supplier | View invites, submit sample, join live bid        |
| Admin    | Monitor system, manage roles , transaction & etc. |

```

```
