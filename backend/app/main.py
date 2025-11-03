from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime, time
from typing import List, Optional
import json

app = FastAPI(title="PlantrPrice API")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mock data
with open("app/data/traders.json", "r") as f:
    traders = json.load(f)

def generate_prices(date: str):
    """Generate mock prices for traders."""
    base_arabica = 425
    base_robusta = 320
    
    return [
        {
            "traderId": trader["id"],
            "date": date,
            "prices": {
                "arabica": base_arabica + (15 if trader["type"] == "Premium Exporter" else 0) + 
                          ((-10 + (trader["id"] * 7)) % 20),  # Deterministic variation based on ID
                "robusta": base_robusta + (15 if trader["type"] == "Premium Exporter" else 0) + 
                          ((-7 + (trader["id"] * 5)) % 15),   # Deterministic variation based on ID
            }
        }
        for trader in traders
    ]

@app.get("/")
def read_root():
    return {"message": "Welcome to PlantrPrice API"}

@app.get("/api/traders")
def get_traders():
    return traders

@app.get("/api/prices/published")
def get_published_prices(date: Optional[str] = None):
    current_time = datetime.now().time()
    publish_time = time(11, 0)  # 11:00 AM
    
    if current_time < publish_time:
        return {"message": "Prices will be published at 11 AM"}
    
    if date is None:
        date = datetime.now().strftime("%Y-%m-%d")
    
    return generate_prices(date)

@app.get("/api/traders/{trader_id}/prices")
def get_trader_prices(trader_id: int, date: Optional[str] = None):
    # Check if trader exists
    trader = next((t for t in traders if t["id"] == trader_id), None)
    if not trader:
        return {"message": "Trader not found"}
    
    if date is None:
        date = datetime.now().strftime("%Y-%m-%d")
    
    prices = generate_prices(date)
    trader_prices = next((p for p in prices if p["traderId"] == trader_id), None)
    
    return trader_prices