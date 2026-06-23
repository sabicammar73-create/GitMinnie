
# 📱 GitMinnie - Android Web Calculators

`License: MIT` | `Stars: 1` | `Languages: HTML/JS/Python`

---

Web Calculators Optimized for All Android Device Generations. A comprehensive solution for running web-based calculators on both legacy and modern Android devices. Designed for developers who need reliable, cross-device HTML/JS compatibility.

---

## ✨ Features

* ✅ **Full compatibility** with legacy Android devices
* ✅ **Support** for modern Android versions
* ✅ **Docker containerization** for easy deployment
* ✅ **FastAPI backend** for reliable service
* ✅ **JavaScript frontend** with intuitive UI

---

## 🛠️ Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **JavaScript** | Frontend Development |
| **FastAPI** | Backend API |

---

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com
cd GitMinnie
```


### 2. Install Dependencies

Za instalaciju svih potrebnih paketa za frontend (Node.js) i backend (Python/FastAPI), pokrenite sljedeće naredbe:

```bash
# Frontend ovisnosti
npm install

# Backend ovisnosti
pip install -r requirements.txt
```

### 3. Run the Application

#### Option A: Run with Docker (Recommended)
Najbrži način za pokretanje cijelog stacka u kontejneru:

```bash
docker-compose up --build
```

#### Option B: Run Locally (Without Docker)
Ako želite pokrenuti projekt izravno na svom računalu:

```bash
# Pokretanje FastAPI pozadinske aplikacije
uvicorn main:app --reload
```
