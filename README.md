# Chat Application

A monorepo containing both frontend and backend applications for chat

## Structure

```
monorepo/
├── apps/
│   ├── frontend/     # React TypeScript app with Tailwind
│   └── backend/      # FastAPI Python backend
├── scripts/
│   └── get-client.js # Scripts to get API client for frontend
├── docker-compose.yml     # Docker Compose for production
├── docker-compose.dev.yml # Docker Compose for development
└── README.md
```

## Technology Stack

- **Frontend**:
  - React
  - TypeScript
  - Tailwind CSS
  - Zod for schema validation
  - PNPM for package management

- **Backend**:
  - FastAPI
  - Python
  - Pydantic for data validation
  - Structlog for logging

- **Root**:
  - @hey-api/openapi-ts for generating fetch client from backend's OpenAPI spec
  - Docker for containerization

## Getting Started

### Using Docker

#### Production Build

```bash
# Build and start all services
docker-compose up --build

# The frontend will be available at http://localhost:3000
# The backend will be available at http://localhost:8000
```

#### Development Build (with hot reloading)

```bash
# Build and start all services in development mode
docker-compose -f docker-compose.dev.yml up --build

# The frontend will be available at http://localhost:3000 (with hot reloading)
# The backend will be available at http://localhost:8000 (with hot reloading)
```

### Without Docker

#### Frontend

```bash
cd apps/frontend
pnpm install --frozen-lockfile
pnpm start
```

#### Backend

```bash
cd apps/backend
pip install -r requirements.txt
uvicorn app.main:app --reload
``` 

#### Root

```bash
pnpm install --frozen-lockfile
# Generate API Client for front
pnpm get-client
```
