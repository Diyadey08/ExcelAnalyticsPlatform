# 📊 Excel Chart Visualizer
**Visualising Data made Simpler**

A beautiful and interactive web app that lets users **upload Excel files**, **preview tabular data**, and generate **2D & 3D charts** from selected columns using modern React, TailwindCSS, and Three.js.

---

## ✨ Features

- 📁 **Upload Excel files** with ease
- 👀 **Preview uploaded data** in a smart, scrollable table
- 📈 **2D chart generation** using custom columns
- 🌐 **Immersive 3D visualizations** with readable data overlays
- 🗑️ **Manage uploads** (view & delete functionality)
- 🔒 **JWT-based authentication** with cookies
- 💾 **File size + date tracking**
- 🎯 **Auto-scroll to preview** on click

---

## 🔧 Tech Stack

| Technology | Use |
|------------|-----|
| 🟦 React    | Frontend framework |
| 🎨 TailwindCSS | Styling UI |
| 🧠 Three.js | 3D chart rendering |
| 🧾 XLSX     | Excel file parsing |
| 🌐 Express.js | Backend API |
| 🍃 MongoDB & Mongoose | File & user storage |
| 🛡️ JWT      | Auth with cookies |

---

## 🚀 Getting Started

### 🛠️ Prerequisites

- Node.js & npm
- MongoDB running locally or on cloud (MongoDB Atlas)
- `.env` file with:
  ```env
  MONGO_URI=your-mongodb-uri
  JWT_SECRET=your-secret-key
  JWT_EXPIRES_IN=3d
  ```

---

### 📦 Installation

```bash
# Backend
cd backend
npm install
npm start
```

```bash
# Frontend
cd my-app
npm install
npm run dev
```

---

## 🧪 Usage Flow

1. 📝 **Register/Login** as a user
2. 📤 **Upload** your Excel file (`.xlsx`)
3. 📂 View file in history
4. 👁️ Click **“View”** to preview table & scroll
5. 📊 Choose columns for X & Y axis
6. 🎨 Instantly see 2D & 3D charts
7. 🗑️ Delete files when needed

---

## 🎥 Demo GIF (Optional)
_Add a screen recording or GIF here showing file upload, chart preview, delete, etc._

---

## 🛡️ Auth & Security

- 🧁 **JWT stored in HTTP-only cookies**
- 📛 Unauthorized users are blocked from upload/view/delete
- 🔐 Upload fails with `403` if not logged in

---

## 📂 Project Structure

```
📁 client/
  ├── components/
  ├── pages/
  └── styles/

📁 server/
  ├── routes/
  ├── controllers/
  └── models/
```

---

## 💡 Future Improvements

- 📌 Drag & drop Excel upload
- 🔢 Aggregated data stats
- 🎥 Animated transitions on charts
- 🖼️ Chart export to image/PDF
- 🌍 Multi-user dashboard
- 📅 Time-based filtering

---

## 🙌 Contributing

Pull requests welcome! Feel free to open issues for feature requests or bugs.

---

## 📃 License

MIT License © 2025

---

## 🚀 Made with love by Diya
