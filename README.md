# Chat Application

A monorepo containing both frontend and backend applications for chat

## Structure

```
monorepo/
├── apps/
│   ├── frontend/     # React TypeScript app with Tailwind
│   └── backend/      # FastAPI Python backend
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