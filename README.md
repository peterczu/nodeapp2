# 🐳 NodeApp — Full-Stack DevOps Auth Project

> A production-style SaaS authentication application built with Node.js, MongoDB, Nginx, and Docker Compose.  
> **By PeterCzu** — DevOps Project

---

## 📌 Overview

NodeApp is a containerized web application featuring secure user registration and login, session-based authentication, and a protected dashboard. The entire stack is orchestrated with Docker Compose, with Nginx acting as a reverse proxy in front of the Node.js app.

This project demonstrates real-world DevOps skills including container orchestration, service networking, reverse proxying, and secure backend development.

---

## 🏗️ Architecture

```
Browser → Nginx (port 80) → Node.js App (port 3000) → MongoDB
```

| Service     | Technology         | Role                          |
|-------------|--------------------|-------------------------------|
| `nodeapp`   | Node.js + Express  | REST API + session auth       |
| `mongo`     | MongoDB 7          | User data persistence         |
| `nginx`     | Nginx Alpine       | Reverse proxy + load balancer |

---

## ✨ Features

- **User Registration** — with bcrypt password hashing and duplicate detection
- **User Login** — session-based authentication stored in MongoDB
- **Protected Dashboard** — server-side route guard, shows user profile
- **Logout** — secure session destruction
- **Health Checks** — Docker waits for MongoDB to be healthy before starting the app
- **Persistent Storage** — MongoDB data survives container restarts via Docker volumes

---

## 🛠️ Tech Stack

| Category        | Technology                     |
|-----------------|-------------------------------|
| Runtime         | Node.js 20 (Alpine)           |
| Framework       | Express.js                    |
| Database        | MongoDB 7 + Mongoose ODM      |
| Auth            | bcryptjs + express-session    |
| Session Store   | connect-mongo                 |
| Reverse Proxy   | Nginx Alpine                  |
| Containerisation| Docker + Docker Compose       |

---

## 📁 Project Structure

```
nodeapp/
├── Dockerfile              # Node.js app image
├── docker-compose.yml      # Multi-container orchestration
├── .dockerignore           # Excludes node_modules from build context
├── .env.example            # Environment variable template
├── package.json
├── nginx/
│   └── default.conf        # Nginx reverse proxy config
├── public/
│   ├── index.html          # Login & Register UI
│   └── dashboard.html      # Protected user dashboard
└── src/
    └── server.js           # Express app — routes, auth, DB models
```

---

## 🚀 Getting Started

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/) installed
- [Docker Compose](https://docs.docker.com/compose/) (included with Docker Desktop)

### Run the App

```bash
# Clone the repository
git clone https://github.com/your-username/nodeapp.git
cd nodeapp

# Start all containers
docker compose up --build

# Run in background (detached)
docker compose up --build -d
```

Open your browser at **http://localhost**

### Stop the App

```bash
docker compose down
```

---

## ⚙️ Environment Variables

Copy `.env.example` to `.env` and update the values:

```bash
cp .env.example .env
```

| Variable         | Default                          | Description                     |
|------------------|----------------------------------|---------------------------------|
| `NODE_ENV`       | `production`                     | Runtime environment             |
| `PORT`           | `3000`                           | Internal app port               |
| `MONGO_URI`      | `mongodb://mongo:27017/nodeapp`  | MongoDB connection string       |
| `SESSION_SECRET` | *(change this!)*                 | Secret key for session signing  |

---

## 🗄️ Database Queries

Access the running MongoDB container:

```bash
# Open MongoDB shell
docker exec -it mongo mongosh

# Switch to app database
use nodeapp

# View all registered users
db.users.find().pretty()

# Count total users
db.users.countDocuments()
```

---

## 🔐 Security Features

- Passwords hashed with **bcrypt** (12 salt rounds)
- Sessions signed with a secret key and stored server-side in MongoDB
- Route-level auth middleware protects `/dashboard`
- Security headers set via Nginx (`X-Frame-Options`, `X-Content-Type-Options`, `X-XSS-Protection`)
- `.dockerignore` prevents sensitive files from entering the build context

---

## 📡 API Endpoints

| Method | Endpoint        | Description                  | Auth Required |
|--------|-----------------|------------------------------|---------------|
| `GET`  | `/`             | Login / Register page        | No            |
| `GET`  | `/dashboard`    | User dashboard               | ✅ Yes         |
| `POST` | `/api/register` | Create new account           | No            |
| `POST` | `/api/login`    | Login and create session     | No            |
| `GET`  | `/api/me`       | Get current user info        | ✅ Yes         |
| `POST` | `/api/logout`   | Destroy session              | ✅ Yes         |

---

## 🧪 Useful Docker Commands

```bash
# View running containers
docker ps

# View app logs
docker logs nodeapp -f

# Rebuild after code changes
docker compose down && docker compose up --build

# Remove all containers, networks, and volumes
docker compose down -v

# Free up disk space
docker system prune -a --volumes
```

---

## 🗺️ Roadmap

- [ ] HTTPS with Let's Encrypt + Certbot
- [ ] GitHub Actions CI/CD pipeline
- [ ] Password reset via email
- [ ] Rate limiting on auth endpoints
- [ ] MongoDB scheduled backups with `mongodump`
- [ ] Monitoring with Portainer or Grafana

---

## 👤 Author

**PeterCzu**  
DevOps & Backend Developer —  Project  
📧 ipeterdevops@gmail.com 
🔗 [GitHub](https://github.com/peterczu) · [LinkedIn](https://linkedin.com/in/peter-madueke)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

