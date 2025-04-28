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
  - uv for package management

- **Root**:
  - @hey-api/openapi-ts for generating fetch client from backend's OpenAPI spec

## Getting Started

### Frontend

```bash
cd apps/frontend
pnpm install --frozen-lockfile
pnpm start
```

### Backend

```bash
cd apps/backend
uv run -- uvicorn app.main:app --reload # uv should automatically install dependencies for you
``` 

### Root

```bash
pnpm install --frozen-lockfile
# Generate API Client for front
pnpm get-client
```
