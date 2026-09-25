from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="Zenith Bank Demo API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DEMO_USER = {
    "account": "1234567890",
    "password": "password",
    "name": "Ada Okafor",
    "balance": 2450000.50,
}

TRANSACTIONS = [
    {"id": 1, "type": "credit", "desc": "Salary", "amount": 850000, "date": "2026-09-20"},
    {"id": 2, "type": "debit", "desc": "Transfer to GTBank", "amount": 25000, "date": "2026-09-22"},
    {"id": 3, "type": "debit", "desc": "Airtime MTN", "amount": 2000, "date": "2026-09-24"},
]


class LoginIn(BaseModel):
    account: str
    password: str


class TransferIn(BaseModel):
    to_account: str
    bank: str
    amount: float
    narration: str = ""


class AirtimeIn(BaseModel):
    network: str
    phone: str
    amount: float


@app.post("/api/login")
def login(data: LoginIn):
    if data.account == DEMO_USER["account"] and data.password == DEMO_USER["password"]:
        return {"ok": True, "name": DEMO_USER["name"], "account": DEMO_USER["account"]}
    raise HTTPException(status_code=401, detail="Invalid account or password")


@app.get("/api/account")
def account():
    return {
        "name": DEMO_USER["name"],
        "account": DEMO_USER["account"],
        "type": "Savings",
        "balance": DEMO_USER["balance"],
        "transactions": TRANSACTIONS,
    }


@app.post("/api/transfer")
def transfer(data: TransferIn):
    if data.amount <= 0:
        raise HTTPException(status_code=400, detail="Invalid amount")
    if data.amount > DEMO_USER["balance"]:
        raise HTTPException(status_code=400, detail="Insufficient funds")
    DEMO_USER["balance"] -= data.amount
    TRANSACTIONS.insert(
        0,
        {
            "id": len(TRANSACTIONS) + 1,
            "type": "debit",
            "desc": f"Transfer to {data.bank} {data.to_account}",
            "amount": data.amount,
            "date": "2026-09-25",
        },
    )
    return {"ok": True, "balance": DEMO_USER["balance"], "message": "Transfer successful"}


@app.post("/api/airtime")
def airtime(data: AirtimeIn):
    if data.amount <= 0:
        raise HTTPException(status_code=400, detail="Invalid amount")
    if data.amount > DEMO_USER["balance"]:
        raise HTTPException(status_code=400, detail="Insufficient funds")
    DEMO_USER["balance"] -= data.amount
    TRANSACTIONS.insert(
        0,
        {
            "id": len(TRANSACTIONS) + 1,
            "type": "debit",
            "desc": f"{data.network} airtime {data.phone}",
            "amount": data.amount,
            "date": "2026-09-25",
        },
    )
    return {"ok": True, "balance": DEMO_USER["balance"], "message": "Airtime purchase successful"}
