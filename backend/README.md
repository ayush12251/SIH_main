# Internix Backend

FastAPI backend for the Internix student and recruiter platform.

## Run locally

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
Copy-Item .env.example .env
uvicorn app.main:app --reload
```

API docs are available at `http://localhost:8000/docs`.

The default database is SQLite for local development. Set `DATABASE_URL` to a PostgreSQL connection string before deployment.
