# 🏥 Care.xyz – Baby Sitting & Elderly Care Service Platform

**Care.xyz** (or Care.IO) is a robust and user-friendly web application designed to provide reliable and trusted care services for children, the elderly, and ill family members. The platform bridges the gap between professional caregivers and families in need.

## 🌐 [Live Demo Link](https://your-live-link.com) | [Client Repo](https://github.com/tanimahamed07/care-xyz-client)

---

## 📝 Project Overview
Care.xyz helps users find and hire caretakers for different purposes such as babysitting, elderly care, or special medical care at home. Users can easily book services through the platform based on their location and duration.

**Our Goal:** To make caregiving easy, secure, and accessible for everyone.



---

## ✨ Key Features

* **📱 Responsive Design:** Fully optimized for Mobile, Tablet, and Desktop screens.
* **🔐 Secure Authentication:** Supports Email/Password login and Google Social Login.
* **📅 Dynamic Booking:** Users can select duration (days/hours) and detailed location (Division, District, City, Area).
* **💰 Automatic Cost Calculation:** Costs are calculated dynamically based on `duration × service charge`.
* **📑 My Bookings Dashboard:** Users can track their booking status: **Pending, Confirmed, Completed, or Cancelled**.
* **🛡️ Private Route Persistence:** Logged-in users are not redirected to the login page on page reloads.
* **📧 Email Invoicing:** Sends an automated email invoice to the user immediately after booking.
* **🔍 Metadata & SEO:** Dynamic page titles for the Homepage and Service Detail pages for better SEO.

---

## 💻 Tech Stack

| Layer | Technologies Used |
| :--- | :--- |
| **Frontend** | React.js, Tailwind CSS, Framer Motion, Axios, React Router v6 |
| **Backend** | Node.js, Express.js, MongoDB, Mongoose |
| **Auth** | Firebase Authentication, JWT (JSON Web Token) |
| **Deployment** | Vercel (Frontend), Render (Backend) |
| **Utilities** | React Helmet Async, EmailJS / Nodemailer |

---

## 🛤️ Pages & Routes

1.  **Homepage (`/`):** Motivational banner/slider, About section, and an overview of services.
2.  **Service Details (`/service/:service_id`):** Deep dive into specific service info with a "Book Service" button.
3.  **Booking Page (`/booking/:service_id`):** (Private Route) Step-by-step booking process with live cost calculation.
4.  **Authentication:**
    * **Login Page:** Email and Password access.
    * **Registration:** Form includes NID No, Name, Contact, and strict Password validation (6+ chars, 1 Upper, 1 Lower).
5.  **My Bookings (`/my-bookings`):** (Private Route) Table view of all bookings with status and action buttons.
6.  **Error Page (404):** A custom page for invalid routes with a return-to-home button.

---

## ⚙️ Installation & Setup

1.  **Clone the Repository:**
    ```bash
    git clone [https://github.com/tanimahamed07/care-xyz-client.git](https://github.com/tanimahamed07/care-xyz-client.git)
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

3.  **Setup Environment Variables:**
    Create a `.env.local` file in the root and add:
    ```env
    VITE_apiKey=your_firebase_key
    VITE_authDomain=your_auth_domain
    VITE_projectId=your_project_id
    VITE_storageBucket=your_storage_bucket
    VITE_messagingSenderId=your_sender_id
    VITE_appId=your_app_id
    ```

4.  **Run Development Server:**
    ```bash
    npm run dev
    ```

---

### 👨‍💻 Contributor
**Tanim Ahammed** [GitHub Profile](https://github.com/tanimahamed07) | [Your Portfolio](https://your-portfolio.com)

---
