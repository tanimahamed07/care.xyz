<p align="center">
  <img src="https://i.ibb.co.com/twR8PmSG/Screenshot-2026-01-17-at-11-44-34-AM.png" alt="Care.xyz Banner"/>
  <br><br>
  <a href="https://care-xyz-blush.vercel.app">
    <img src="https://img.shields.io/badge/Live%20Demo-10b981?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Demo">
  </a>
</p>

<h1 align="center">🏥 Care.xyz – Baby Sitting & Elderly Care Platform</h1>

<p align="center">
  A modern, secure, and user-friendly platform connecting families with trusted professional caregivers for <strong>babies</strong>, <strong>elderly</strong>, and <strong>special care needs</strong>.<br>
  Making caregiving accessible, reliable, and stress-free.
</p>

<hr>

## ✨ Key Features

- **📱 Fully Responsive Design** – Perfect experience on mobile, tablet & desktop
- **🔐 Secure Authentication** – Email/Password + Google Social Login (Firebase)
- **📅 Smart Booking System** – Choose duration (hours/days) + precise location (Division → District → City → Area)
- **💰 Real-time Cost Calculation** – Instant price update based on service rate × duration
- **📑 My Bookings Dashboard** – Track status: Pending / Confirmed / Completed / Cancelled
- **🛡️ Protected Routes** – Private pages persist after refresh (no unnecessary login redirect)
- **🔍 SEO Friendly** – Dynamic page titles & metadata using React Helmet Async
- **📸 Smooth Animations** – Powered by Framer Motion
- **📧 Email Notifications** – Booking confirmations (EmailJS / Nodemailer)

## 🛠️ Tech Stack

| Layer            | Technologies                              |
|------------------|-------------------------------------------|
| **Frontend**     | React.js, Tailwind CSS, React Router v6, Framer Motion, Axios |
| **Backend**      | Node.js, Express.js, MongoDB, Mongoose    |
| **Authentication**| Firebase Authentication + JWT             |
| **Deployment**   | Vercel (Frontend), Render (Backend)       |
| **Utilities**    | React Helmet Async, EmailJS / Nodemailer  |

## 🗂️ Pages & Routes

| Route                        | Description                                                                 |
|------------------------------|-----------------------------------------------------------------------------|
| `/`                          | Homepage – Hero banner, About, Services overview                            |
| `/service/:service_id`       | Detailed service page with “Book Now” button                                |
| `/booking/:service_id`       | **Private** – Step-by-step booking with live cost preview                   |
| `/login`                     | Login with Email/Password or Google                                         |
| `/register`                  | Registration with NID, Name, Phone, strong password validation              |
| `/my-bookings`               | **Private** – Table of all bookings with status & actions                   |
| `*`                          | Custom 404 page with “Back to Home” button                                  |

## 🚀 Quick Start

### Prerequisites
- Node.js ≥ 16

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/tanimahamed07/care-xyz-client.git
cd care-xyz-client

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
