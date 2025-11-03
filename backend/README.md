# PlantrPrice Backend

FastAPI backend for the PlantrPrice application.

## Setup

1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Run the development server:
```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

## API Endpoints

- `GET /api/traders` - List all traders
- `GET /api/prices/published` - Get published prices for today (available after 11 AM)
- `GET /api/traders/{trader_id}/prices` - Get prices for a specific trader

## Development

- API documentation available at `/docs` when server is running
- OpenAPI spec available at `/openapi.json`