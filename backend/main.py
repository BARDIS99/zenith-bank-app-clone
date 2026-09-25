# simple backend for the demo bank app
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# this lets the Next.js page talk to python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# fake user so we do not need a real database
user = {
    "account": "1234567890",
    "password": "password",
    "name": "Ada Okafor",
    "balance": 2450000.50
}

# fake transaction list
transactions = [
    {"id": 1, "type": "credit", "desc": "Salary", "amount": 850000, "date": "2026-09-20"},
    {"id": 2, "type": "debit", "desc": "Transfer to GTBank", "amount": 25000, "date": "2026-09-22"},
    {"id": 3, "type": "debit", "desc": "Airtime MTN", "amount": 2000, "date": "2026-09-24"}
]


@app.post("/api/login")
def login(data: dict):
    account = data.get("account")
    password = data.get("password")

    if account == user["account"] and password == user["password"]:
        return {
            "ok": True,
            "name": user["name"],
            "account": user["account"]
        }
    else:
        return {"ok": False, "message": "wrong account or password"}


@app.get("/api/account")
def get_account():
    return {
        "name": user["name"],
        "account": user["account"],
        "type": "Savings",
        "balance": user["balance"],
        "transactions": transactions
    }


@app.post("/api/transfer")
def transfer(data: dict):
    amount = float(data.get("amount", 0))
    to_account = data.get("to_account")
    bank = data.get("bank")

    if amount <= 0:
        return {"ok": False, "message": "amount is not valid"}

    if amount > user["balance"]:
        return {"ok": False, "message": "not enough money"}

    user["balance"] = user["balance"] - amount

    new_item = {
        "id": len(transactions) + 1,
        "type": "debit",
        "desc": "Transfer to " + str(bank) + " " + str(to_account),
        "amount": amount,
        "date": "2026-09-25"
    }
    transactions.insert(0, new_item)

    return {
        "ok": True,
        "message": "Transfer successful",
        "balance": user["balance"]
    }


@app.post("/api/airtime")
def airtime(data: dict):
    amount = float(data.get("amount", 0))
    network = data.get("network")
    phone = data.get("phone")

    if amount <= 0:
        return {"ok": False, "message": "amount is not valid"}

    if amount > user["balance"]:
        return {"ok": False, "message": "not enough money"}

    user["balance"] = user["balance"] - amount

    new_item = {
        "id": len(transactions) + 1,
        "type": "debit",
        "desc": str(network) + " airtime " + str(phone),
        "amount": amount,
        "date": "2026-09-25"
    }
    transactions.insert(0, new_item)

    return {
        "ok": True,
        "message": "Airtime purchase successful",
        "balance": user["balance"]
    }


# this starts the server when you run: python main.py
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
