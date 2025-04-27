# Backend API

A FastAPI backend using Python with structlog and pydantic.

## Setup

```bash
# Create and activate virtual environment
uv venv
source .venv/bin/activate  # On Unix/MacOS
# OR
.venv\Scripts\activate     # On Windows

# Install dependencies
uv pip install -e .
```

## Development

```bash
# Run the development server
uvicorn app.main:app --reload
```

## Project Structure

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py         # FastAPI application
│   ├── api/            # API routes
│   ├── core/           # Core functionality (config, logging)
│   ├── models/         # Pydantic models
│   └── services/       # Business logic
├── tests/              # Unit tests
├── .env                # Environment variables
└── pyproject.toml      # Dependencies and project configuration
``` 