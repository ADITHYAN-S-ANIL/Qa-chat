# 💬 QA Chat App

A full-stack **Question & Answer Chat Application** built with:

- **Frontend** — React 18 + Vite (runs on `http://localhost:5173`)
- **Backend** — Python Flask REST API (runs on `http://localhost:5000`)

Users log in with an email and password, then interact with the chat interface to send messages and receive replies from the backend.

---

## 📁 Project Structure

```
chat/
├── backend/
│   ├── app.py              # Flask API server (login + chat endpoints)
│   └── requirements.txt    # Python dependencies
├── frontend/
│   ├── src/
│   │   ├── App.jsx         # Root React component (handles login/logout state)
│   │   ├── components/
│   │   │   ├── Login.jsx   # Login form component
│   │   │   └── Chat.jsx    # Chat interface component
│   │   └── index.css       # Global styles
│   ├── index.html
│   ├── package.json        # Node.js dependencies
│   └── vite.config.js      # Vite dev server (proxies /api → Flask)
├── deploy/
│   ├── start.sh            # Production startup script (Gunicorn)
│   └── qachat.nginx        # Nginx reverse proxy config
└── README.md
```

---

## ✅ Prerequisites

Make sure the following are installed on your machine:

| Tool | Version | Check Command |
|------|---------|---------------|
| Python | 3.8+ | `python --version` |
| pip | latest | `pip --version` |
| Node.js | 16+ | `node --version` |
| npm | 8+ | `npm --version` |

---

## 🚀 Running the App

> **Important:** You need **two terminals open at the same time** — one for the backend and one for the frontend.

---

### 🖥️ Option 1: Running in the Terminal (Windows — Command Prompt or PowerShell)

#### Step 1 — Set Up & Start the Backend

```powershell
# Navigate to the backend folder
cd chat/backend

# Create a Python virtual environment
python -m venv .venv

# Activate the virtual environment
.venv\Scripts\activate

# Install Python dependencies
pip install -r requirements.txt

# Start the Flask server
python app.py
```

**Expected output:**
```
 * Running on http://127.0.0.1:5000
 * Debug mode: on
 * Restarting with stat
 * Debugger is active!
```

#### Step 2 — Start the Frontend (open a NEW terminal window)

```powershell
# Navigate to the frontend folder
cd chat/frontend

# Install Node.js dependencies (first time only)
npm install

# Start the Vite dev server
npm run dev
```

**Expected output:**
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

#### Step 3 — Open the App

Open your browser and go to: **http://localhost:5173**

---

### 🧩 Option 2: Running in VS Code

#### Step 1 — Open the Project

1. Open **VS Code**
2. Go to `File → Open Folder` and select the `chat` folder
3. VS Code will load the full project

#### Step 2 — Open Two Integrated Terminals

- Press **`` Ctrl + ` ``** to open the first terminal
- Click the **`+` icon** in the terminal panel to open a second terminal

#### Step 3 — Terminal 1: Start the Backend

```bash
cd backend
python -m venv .venv

# Windows
.venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run Flask
python app.py
```

> 💡 **Tip:** VS Code may auto-detect the virtual environment. If prompted to select a Python interpreter, choose `.venv`.

**Expected output in VS Code terminal:**
```
 * Serving Flask app 'app'
 * Debug mode: on
 * Running on http://127.0.0.1:5000
```

#### Step 4 — Terminal 2: Start the Frontend

```bash
cd frontend
npm install
npm run dev
```

**Expected output in VS Code terminal:**
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
```

#### Step 5 — Open in Browser

Click the link **http://localhost:5173** directly in the VS Code terminal (it's clickable), or open your browser manually.

---

### 🐧 Option 3: Running on Linux (Ubuntu / Debian / Any Distro)

#### Step 1 — Install Prerequisites (if not already installed)

```bash
# Update package list
sudo apt update

# Install Python and pip
sudo apt install python3 python3-pip python3-venv -y

# Install Node.js and npm (using NodeSource for latest version)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install nodejs -y
```

#### Step 2 — Start the Backend

```bash
# Navigate to backend folder
cd chat/backend

# Create virtual environment
python3 -m venv .venv

# Activate the virtual environment
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start the Flask server
python3 app.py
```

**Expected output:**
```
 * Running on http://127.0.0.1:5000
 * Debug mode: on
```

#### Step 3 — Start the Frontend (open a NEW terminal tab)

```bash
cd chat/frontend

# Install dependencies
npm install

# Start the dev server
npm run dev
```

**Expected output:**
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

#### Step 4 — Open Browser

```bash
# You can open it from terminal too
xdg-open http://localhost:5173
```

---

## 🌐 What You Should See (Expected Output in the Browser)

### 1. 🔐 Login Page

When you open **http://localhost:5173**, you will see a **Login screen** with:
- An **Email** input field
- A **Password** input field
- A **Login** button

**To log in**, enter any valid email and password (both fields must be non-empty):

```
Email:    demo@example.com
Password: password123
```

When you click **Login**, the frontend sends a `POST` request to `/api/login`. You will see this logged in the **Flask terminal**:

```
Login attempt - Email: 'demo@example.com', Password: 'password123'
```

### 2. 💬 Chat Page

After a successful login, you are taken to the **Chat interface**:
- A **message input box** at the bottom
- A **Send button**
- Bot replies appear in the chat window

**When you send a message**, for example `"Hello"`:
- The message appears in the chat window (your side)
- The Flask backend receives it and logs:
  ```
  Received message: Hello
  ```
- The bot replies:
  ```
  Hi there! This is a response from the QA Chat backend.
  ```

### 3. 🚪 Logout

Clicking the **Logout** button returns you to the Login screen.

---

## 🔌 API Endpoints (Backend)

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| `POST` | `/api/login` | Authenticate user | `{ "email": "...", "password": "..." }` | `{ "success": true, "message": "Login successful" }` |
| `POST` | `/api/chat` | Send a chat message | `{ "message": "Hello" }` | `{ "reply": "Hi there! This is a response..." }` |

---

## 🔄 How the Proxy Works

The Vite dev server is configured in `vite.config.js` to forward all requests starting with `/api` to the Flask backend on port `5000`. This means the frontend doesn't need to hardcode `http://localhost:5000` URLs.

```
Browser (port 5173)  →  /api/login  →  Vite Proxy  →  Flask (port 5000)
```

---

## 🏭 Production Deployment (Linux Server)

For production, the app uses **Gunicorn** as the WSGI server and **Nginx** as a reverse proxy.

```bash
# Make sure you are in the backend directory with .venv activated
cd /var/www/qa-chat/backend
source .venv/bin/activate

# Run the production startup script
bash /path/to/chat/deploy/start.sh
```

The `start.sh` script runs:
```bash
gunicorn --workers 4 --bind 0.0.0.0:5000 app:app
```

Copy the Nginx config:
```bash
sudo cp deploy/qachat.nginx /etc/nginx/sites-available/qachat
sudo ln -s /etc/nginx/sites-available/qachat /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

Build the frontend for production:
```bash
cd frontend
npm run build
# Output is in frontend/dist/ — served by Nginx
```

---

## 🛠️ Troubleshooting

| Problem | Cause | Fix |
|---------|-------|-----|
| `ModuleNotFoundError: flask` | Virtual env not activated | Run `.venv\Scripts\activate` (Windows) or `source .venv/bin/activate` (Linux/Mac) |
| Port 5000 already in use | Another process using port 5000 | Kill the process: `npx kill-port 5000` |
| Port 5173 already in use | Another Vite instance running | Stop the other instance or run `npm run dev -- --port 3000` |
| CORS error in browser | Flask CORS not configured | Already handled by `flask-cors` in `app.py` |
| Login fails with no error | Backend not running | Make sure Flask is running on port 5000 |
| `npm install` fails | Old Node version | Upgrade Node to v16+ from https://nodejs.org |

---

## 📦 Dependencies

### Backend (`requirements.txt`)
| Package | Purpose |
|---------|---------|
| `flask` | Python web framework for building the REST API |
| `flask-cors` | Enables Cross-Origin Resource Sharing for the API |
| `gunicorn` | Production-grade WSGI HTTP server |

### Frontend (`package.json`)
| Package | Purpose |
|---------|---------|
| `react` | UI library for building the chat interface |
| `react-dom` | Renders React components in the browser DOM |
| `vite` | Fast frontend dev server and build tool |
| `@vitejs/plugin-react` | Enables React JSX and Fast Refresh in Vite |

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
