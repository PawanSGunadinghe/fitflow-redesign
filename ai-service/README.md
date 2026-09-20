# FitFlow AI & Computer Vision Microservice

Dedicated high-performance microservice built using **Python 3.11**, **FastAPI**, **Pydantic**, and computer vision frameworks.

## Endpoints

- `GET /health`: Microservice liveness and health probe.
- `POST /api/v1/recommend-workout`: Adaptive workout generator taking user constraints (time, energy, soreness) and outputting custom exercise sequences.
- `POST /api/v1/analyze-meal`: Instant food image segmentation and macronutrient calculation.

## Getting Started

```bash
# Set up virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: .\venv\Scripts\activate

# Install requirements
pip install -r requirements.txt

# Run server with Uvicorn
uvicorn main:app --reload --port 8000
```
