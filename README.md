# 🍬 Sweetify — AI-Enhanced Sweet Shop App

> **An intelligent and modern sweet shop management system** built using the MERN stack, integrating AI-assisted personalization for better user engagement.

---

## 🚀 Overview

**Sweetify** is a full-stack web application designed to modernize how sweet shops operate — from inventory management to personalized user experiences.  
Users can browse sweets, purchase products securely, and enjoy AI-driven recommendations based on their viewing and purchase patterns.  
Admins can manage sweets, stock levels, and oversee the entire store efficiently.

This project demonstrates **AI-Augmented Development** practices by leveraging an AI assistant (ChatGPT) responsibly to enhance productivity and maintain ethical transparency.

---

## 🧠 Key Features

| Category | Description |
|-----------|-------------|
| 🛍️ **User Module** | Browse, search, and buy sweets with live stock updates |
| 🍫 **Personalized Dashboard** | AI-based recommendations using user interaction signals |
| 🧾 **Cart & Checkout** | Dynamic cart and checkout management with feedback |
| 👨‍💼 **Admin Panel** | Add, edit, delete, and restock sweets securely |
| 📱 **Responsive UI** | Mobile-friendly, clean, and modern React interface |
| 🔒 **Authentication** | Secure login & registration using JWT |
| 🧠 **AI Integration** | Personalized recommendations using behavioral tracking |
| 🧩 **Modular Design** | Reusable components & API architecture for scalability |

---

## 🛠️ Tech Stack

### Frontend
- ⚛️ React.js (Vite)
- 🎨 Tailwind CSS
- 🧭 React Router
- 🔔 React Toastify
- 🌐 Axios

### Backend
- 🟩 Node.js (Express)
- 🍃 MongoDB (Mongoose)
- 🔐 JWT Authentication
- ⚙️ dotenv for environment variables

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Akshay34-ux/sweetify-ai-kata.git
cd sweetify-ai-kata
cd backend
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Create a `.env` File

```bash
PORT=5001
MONGO_URI=<YOUR-MONGODB-URI>
JWT_SECRET=<JWT-SECRET-KEY>
```

### 4️⃣ Start the Backend Server

```bash
npm run dev
```

### 5️⃣ Setup Frontend (if separate)

```bash
cd ../frontend
npm install
npm run dev
```

---

## 🧩 Folder Structure (Backend)

```bash
sweetify-backend/
├── src/
│   ├── models/
│   │   ├── User.js
│   │   ├── Sweet.js
│   │   └── Cart.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── sweetRoutes.js
│   │   └── cartRoutes.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── adminMiddleware.js
│   └── server.js
├── package.json
├── .env
└── README.md
```

---

## 💡 AI-Assisted Development Disclosure

This project was **partially developed with the help of ChatGPT (OpenAI GPT-5)** as part of an **AI Kata Project**.  
The AI assistant contributed to:

- Code refactoring and structure optimization  
- UI layout improvements and component consistency  
- Commit message drafting and documentation  
- Backend route design and API consistency  

All AI-generated content was **reviewed, validated, and modified manually** by the developer.

> **Co-authored-by:** ChatGPT (AI Assistant)  
> **Supervised-by:** [Akshay LN](https://github.com/Akshay34-ux)

---

## 🧾 Commit Convention

This project follows the **Conventional Commits** standard for readability and traceability.

**Example Commit:**

```bash
feat: Enhanced Dashboard layout and added responsive footer

Used an AI assistant (ChatGPT) to help redesign the Dashboard UI,
separate the search bar, and implement a modern footer layout.

Co-authored-by: ChatGPT <AI@users.noreply.github.com>
```

---

## 🔐 Ethical AI Usage Statement

This project complies with the **AI Kata Ethical Development Guidelines**:

- AI assistance used responsibly, with full transparency  
- All code manually validated and tested before deployment  
- No sensitive or personal data shared with the AI system  
- AI-generated outputs were not accepted blindly  

> ✅ Human oversight was maintained for all technical and ethical decisions.

---

## 🌐 Live Demo

You can explore the deployed version of **Sweetify – AI-Powered Sweet Shop** here:

👉 **[Live Website (Deployed)](https://sweetify-ai-kata.vercel.app/](https://sweetify-frontend.vercel.app/)**  

*(If the site takes a few seconds to load, it’s because the free MongoDB / Render servers may need to wake up.)*

---

### 🧩 Backend API (Deployed)
API Base URL (for testing with Postman or cURL):

## 👨‍💻 Developer

**👋 Akshay LN**  
🎓 MCA Student | 💻 Full Stack Developer | ⚙️ AI Innovator  
📫 [GitHub Profile](https://github.com/Akshay34-ux)

---

## 🧠 Future Enhancements

- 🤖 **Full AI Cart Personalization System** — use machine learning to recommend sweets based on user taste.  
- 💳 **Payment Gateway Integration** — add Stripe or Razorpay for real-time online payments.  
- 🌐 **Multi-language Support** — support for English, Hindi, and Kannada.  
- 📊 **Admin Analytics Dashboard** — provide sales insights, revenue tracking, and inventory analytics.  
- ☁️ **Cloud-based Image Management** — optimize images using a CDN and automated compression.  

---

## 🪪 License

This project is licensed under the **MIT License** — see the [LICENSE](./LICENSE) file for details.

---

## ⭐ Support

If you like this project, consider giving it a **⭐ star on GitHub** and sharing your feedback!

---

## 🧩 Project Attribution

This project was completed as part of the **AI Kata – Intelligent Development Challenge**.  
AI support was used ethically to **augment learning**, not replace it.  

> “AI-assisted, human-validated — built smarter, not lazier.” 💡

---

✅ **End of README**




