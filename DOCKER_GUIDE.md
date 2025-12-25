# Docker Setup Guide

This guide will help you run the entire Todo Application stack using Docker.

## Prerequisites

- Docker and Docker Compose installed on your system
- Git (to clone the repository)

## Architecture

The application consists of 4 services:

1. **PostgreSQL** - Database (port 5432)
2. **pgAdmin** - Database management UI (port 5050)
3. **Backend (Spring Boot)** - REST API (port 8080, internal container only)
4. **Frontend (React/Vite)** - Web UI (port 80)

All services are connected via a custom Docker network for inter-service communication.

## Running the Application

### Step 1: Build and Start All Services

Navigate to the backend directory and run:

```bash
cd todo-application-backend
docker-compose up --build
```

**What this does:**
- Builds the backend Docker image from the Dockerfile
- Builds the frontend Docker image from the Dockerfile
- Starts all 4 services (PostgreSQL, pgAdmin, Backend, Frontend)
- Creates necessary networks and volumes
- Initializes the database

### Step 2: Access the Applications

Once all services are running and healthy:

- **Frontend:** http://localhost (port 80)
- **Backend API:** http://localhost:8080 (for debugging)
- **pgAdmin:** http://localhost:5050 (admin@local.com / admin)

### Step 3: Verify Services are Running

```bash
docker ps
```

You should see 4 containers running:
- `todo-postgres`
- `todo-pgadmin`
- `todo-backend`
- `todo-frontend`

## pgAdmin Database Setup

1. Open http://localhost:5050
2. Login: `admin@local.com` / `admin`
3. Click "Add New Server"
4. Fill in the details:
   - **Name:** PostgreSQL Todo DB
   - **Host:** `postgres` (Docker service name)
   - **Port:** 5432
   - **Username:** `todo_user`
   - **Password:** `todo_pass`
   - **Database:** `todo_db`

## Stopping Services

```bash
# Stop all services while keeping volumes
docker-compose down

# Stop and remove volumes (careful - data will be lost)
docker-compose down -v
```

## Viewing Logs

```bash
# View logs from all services
docker-compose logs -f

# View logs from a specific service
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f postgres
```

## Rebuilding Services

If you make code changes:

```bash
# Rebuild and restart services
docker-compose up --build

# Rebuild without cache
docker-compose up --build --no-cache
```

## Network Architecture

All services communicate internally within the `todo-network`:

- Frontend (nginx) → Backend: `http://backend:8080/`
- Backend → PostgreSQL: `jdbc:postgresql://postgres:5432/todo_db`
- pgAdmin → PostgreSQL: `postgres:5432`

The frontend's nginx server also:
- Serves static files from `/usr/share/nginx/html`
- Proxies requests to `/api/` to the backend service
- Provides SPA routing fallback for React Router

## Troubleshooting

### Backend not starting
- Check logs: `docker-compose logs backend`
- Ensure PostgreSQL is healthy: `docker-compose logs postgres`
- Verify port 8080 isn't already in use

### Frontend can't connect to backend
- Check nginx config: The frontend expects backend at `http://backend:8080`
- Verify CORS settings in TodoController include `http://frontend`

### Database connection errors
- Ensure PostgreSQL service is healthy
- Check environment variables in docker-compose.yml
- Verify `SPRING_DATASOURCE_URL` uses `postgres` as hostname (Docker service name)

### Rebuilding from scratch

```bash
# Remove all containers, networks, and volumes
docker-compose down -v

# Remove all images
docker image rm todo-application-backend todo-frontend-react

# Start fresh
docker-compose up --build
```

## Environment Variables

### Backend (Spring Boot)
- `SPRING_DATASOURCE_URL`: PostgreSQL connection string
- `SPRING_DATASOURCE_USERNAME`: Database user
- `SPRING_DATASOURCE_PASSWORD`: Database password
- `SPRING_JPA_HIBERNATE_DDL_AUTO`: Schema management (update)

### Frontend (React/Vite)
- `VITE_API_BASE_URL`: Backend API base URL (optional, can be hardcoded in code)

### PostgreSQL
- `POSTGRES_DB`: Database name
- `POSTGRES_USER`: Database user
- `POSTGRES_PASSWORD`: Database password
- `TZ`: Timezone (Asia/Kolkata)

## Production Considerations

For production deployment, consider:

1. **Use environment files:** Create `.env` files for sensitive data
2. **Resource limits:** Set CPU and memory limits in docker-compose.yml
3. **Restart policies:** All services use `restart: unless-stopped`
4. **Health checks:** All services have health checks configured
5. **Volumes:** Use named volumes for data persistence
6. **SSL/TLS:** Add reverse proxy with SSL certificates
7. **Load balancing:** Use Docker Swarm or Kubernetes for multiple instances
