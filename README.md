# CopyIt

A simple code snippet vault to save, organize, search, favorite, and share your code snippets.

## ✨ Features

* 🔐 User authentication with JWT
* 📝 Create, edit, and delete code snippets
* 🔎 Search snippets by title, language, or code
* ❤️ Mark snippets as favorites
* 📋 Copy code with one click
* 🔗 Share snippets through public links
* 🌐 Public read-only shared snippet pages
* 🛡️ Protected user routes and snippet ownership
* ⏱️ Automatic logout when the JWT expires
* 📱 Responsive interface

## 🛠️ Tech Stack

### Frontend

* React
* TypeScript
* React Router
* Axios
* Tailwind CSS
* React Icons
* Vite

### Backend

* Node.js
* Express
* TypeScript
* MongoDB
* Mongoose
* JWT
* bcrypt
* nanoid

## 🏗️ Project Structure

```text
CopyIt/
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── pages/
│   │   └── ...
│   └── ...
│
└── backend/
    ├── src/
    │   ├── controllers/
    │   ├── middleware/
    │   ├── models/
    │   ├── routes/
    │   ├── types/
    │   ├── app.ts
    │   ├── server.ts
    │   └── connect.ts
    └── ...
```

## 🔑 Authentication

CopyIt uses JWT-based authentication.

After logging in, the JWT is stored on the client and automatically attached to API requests using an Axios interceptor.

Protected backend routes verify the token before allowing access to user-specific resources.

Expired or invalid sessions automatically remove the stored token and redirect the user to the login page.

## 🔗 Sharing

Snippets are private by default.

When a user chooses to share a snippet, CopyIt generates a unique share ID and creates a public URL.

Shared snippets can be viewed without authentication and are read-only.

Example:

```text
https://copy-it-iota.vercel.app/share/26ch4iQBA7
```

## ⚙️ Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/amritasrc/copyIt.git
cd copyIt
```

### 2. Backend setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Start the backend in development:

```bash
npm run dev
```

### 3. Frontend setup

Open another terminal:

```bash
cd frontend
npm install
```

Create a `.env` file:

```env
VITE_API_URL=http://localhost:3000/api
```

Start the frontend:

```bash
npm run dev
```

The frontend will be available at:

```text
http://localhost:5173
```

## 🌐 API Routes

### Authentication

| Method | Endpoint             | Description            |
| ------ | -------------------- | ---------------------- |
| POST   | `/api/users/create`  | Create an account      |
| POST   | `/api/users/login`   | Login                  |
| GET    | `/api/users/profile` | Get authenticated user |

### Snippets

| Method | Endpoint                       | Description           |
| ------ | ------------------------------ | --------------------- |
| POST   | `/api/snippets`                | Create a snippet      |
| GET    | `/api/snippets`                | Get user's snippets   |
| GET    | `/api/snippets/:id`            | Get a single snippet  |
| PATCH  | `/api/snippets/:id`            | Update a snippet      |
| DELETE | `/api/snippets/:id`            | Delete a snippet      |
| PATCH  | `/api/snippets/:id/favorite`   | Toggle favorite       |
| POST   | `/api/snippets/:id/share`      | Create a share link   |
| GET    | `/api/snippets/share/:shareId` | View a shared snippet |

## 🚀 Deployment

The frontend and backend are deployed separately.

* Frontend: Vercel
* Backend: Render
* Database: MongoDB Atlas

Production environment variables should be configured through the respective deployment platforms.

> Never commit `.env` files or expose your JWT secret.

## 🎯 Future Improvements

Possible future additions include:

* Folders and tags
* Advanced filtering
* Pagination
* Syntax highlighting
* Profile and account settings
* Additional snippet organization tools

## 👩‍💻 Author

**Amrita Kumari**

Built with React, TypeScript, Node.js, Express, and MongoDB.

---

⭐ If you find CopyIt useful, feel free to explore the project and share feedback.
