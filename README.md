# ✅ Full-Stack Todo App – Production Plan

**Goal:** Build and deploy a complete Todo app using Go, Supabase, and Vercel — full CRUD, HTTPS, and CLI tool.

---

## 🧠 Project Scope

- [x] Backend: Go + chi + Supabase
- [x] Database: Supabase PostgreSQL
- [x] Deployment: VPS + Docker + Nginx + Certbot
- [x] Frontend: Next.js + TypeScript + Tailwind CSS (on Vercel)
- [x] CLI Tool

---

## ⏱️ Day 1 – Supabase Setup + Go API (3 Hours)

### 🕐 Hour 1: Supabase

- [x] Create Supabase project
- [x] Create `todos` table:
  - `id UUID PRIMARY KEY`
  - `text TEXT`
  - `completed BOOLEAN`
  - `created_at TIMESTAMP DEFAULT now()`
- [x] Turn off RLS or allow full `anon` access
- [x] Save Supabase project URL and anon key

### 🕑 Hour 2: Go API Base

- [x] Init Go project: `go mod init`
- [x] Install `chi`, `pgx` or `sqlx`, `godotenv`
- [ ] Connect to Supabase PostgreSQL with connection string
- [ ] Create `POST /todo`: add a todo
- [ ] Create `GET /todos`: return all todos

### 🕒 Hour 3: Complete API

- [ ] Add `PATCH /todo/{id}` to toggle or edit
- [ ] Add `DELETE /todo/{id}`
- [ ] Use `json.NewDecoder`, `http.Error`, `chi.URLParam`
- [ ] Test routes with `curl` or `httpie`

---

## 🐳 Day 2 – Dockerize + Deploy (3 Hours)

### 🕐 Hour 1: Containerize

- [ ] Write `Dockerfile` for Go app
- [ ] Add `docker-compose.yml` for:
  - `go-api` container
  - `nginx` reverse proxy
- [ ] Nginx config:
  - Proxy `/api` → Go app
  - Serve on HTTP port 80

### 🕑 Hour 2: VPS Setup

- [ ] SSH into VPS
- [ ] Install Docker and Docker Compose
- [ ] Clone your repo to VPS
- [ ] Add A record pointing your domain to VPS IP

### 🕒 Hour 3: TLS + Deploy

- [ ] Run Certbot (`certonly` or Docker)
- [ ] Configure Nginx for HTTPS (port 443, certs)
- [ ] Reload Nginx
- [ ] `docker compose up -d`
- [ ] Verify `https://yourdomain.com/api/todos`

---

## 🌐 Day 3 – Next.js Frontend (3 Hours)

### 🕐 Hour 1: Setup

- [ ] Create app: `npx create-next-app todo-web --typescript`
- [ ] Install Tailwind CSS
- [ ] Add `.env.local`:
  - `NEXT_PUBLIC_API_URL=https://yourdomain.com/api`
- [ ] Setup page: `pages/index.tsx`

### 🕑 Hour 2: Integrate with API

- [ ] `GET` and render todos
- [ ] Add `POST` form
- [ ] Add complete toggle (`PATCH`)
- [ ] Add delete button (`DELETE`)

### 🕒 Hour 3: Polish + Deploy

- [ ] Add loading and error states
- [ ] Make responsive + minimal
- [ ] Push to GitHub
- [ ] Deploy via Vercel

---

## 💻 Optional CLI Tool (1 Hour)

Simple Go CLI to use your API:

- [ ] `go run cmd/main.go post --text "Buy milk"`
- [ ] `go run cmd/main.go list`
- [ ] `go run cmd/main.go done --id abcd12`
- [ ] `go run cmd/main.go delete --id abcd12`

---

## ✅ Final Checklist

- [ ] Full CRUD API works with Supabase
- [ ] HTTPS enabled with Certbot on VPS
- [ ] Frontend deployed to Vercel
- [ ] CLI tool built and tested
- [ ] Obsidian reflection note written

