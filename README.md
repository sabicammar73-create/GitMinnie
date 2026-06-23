# 📱 GitMinnie — Android Web Calculators

`License: MIT` | `Stars: 1` | `Languages: HTML / JS / Python`

A robust, cross-device solution specifically optimized to run responsive web-based calculators across all generations of Android devices—from legacy builds to modern systems.

---

### ✨ Core Features

* 🚀 **Universal Compatibility** — Seamless performance on older legacy and modern Android web views.
* 📦 **Containerized Deployment** — Ready to launch instantly with Docker and Docker Compose.
* ⚡ **High-Performance Backend** — Powered by a fast, asynchronous FastAPI server.
* 🎨 **Intuitive Frontend** — Clean and lightweight native JavaScript UI.

---

### 🛠️ Architecture & Tech Stack

| Component | Technology | Primary Purpose |
| :--- | :--- | :--- |
| **Frontend** | JavaScript / HTML5 | Lightweight UI Rendering & Interactivity |
| **Backend** | FastAPI / Python | High-speed API Services & Backend Logic |
| **DevOps** | Docker | Unified Multi-Container Orchestration |

---

### 🚀 Getting Started

#### 1. Clone the Repository
```bash
git clone https://github.com
cd GitMinnie
```

#### 2. Install Dependencies
Set up both your frontend environment and backend Python packages:
```bash
# Set up frontend modules
npm install

# Set up backend modules
pip install -r requirements.txt
```

#### 3. Execution Methods

##### 🐳 Option A: Run with Docker (Recommended)
Automatically build images and start the full ecosystem:
```bash
docker-compose up --build
```

##### 🐍 Option B: Run Locally (Without Docker)
Launch the lightweight development server directly on your host machine:
```bash
uvicorn main:app --reload
```
