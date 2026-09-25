"use client";

import { useState } from "react";
import Link from "next/link";

export default function TransferPage() {
  const [bank, setBank] = useState("Zenith Bank");
  const [toAccount, setToAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  function sendMoney(e) {
    e.preventDefault();

    fetch("http://localhost:8000/api/transfer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        bank: bank,
        to_account: toAccount,
        amount: amount
      })
    })
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        if (data.ok == true) {
          setMessage(data.message + ". New balance: N" + data.balance);
        } else {
          setMessage(data.message);
        }
      })
      .catch(function () {
        setMessage("backend is not running");
      });
  }

  return (
    <div className="page">
      <div className="demo">UNOFFICIAL DEMO - NOT ZENITH BANK</div>
      <div className="top">
        <h3>Transfer Money</h3>
      </div>
      <form className="box" onSubmit={sendMoney}>
        <p>Bank</p>
        <select value={bank} onChange={function (e) { setBank(e.target.value); }}>
          <option>Zenith Bank</option>
          <option>GTBank</option>
          <option>Access Bank</option>
          <option>UBA</option>
        </select>
        <p>Account number</p>
        <input value={toAccount} onChange={function (e) { setToAccount(e.target.value); }} />
        <p>Amount</p>
        <input value={amount} onChange={function (e) { setAmount(e.target.value); }} />
        <p>{message}</p>
        <button>Send Money</button>
      </form>
      <div className="bottom">
        <Link href="/dashboard">Overview</Link>
        <Link href="/airtime">Airtime</Link>
        <Link href="/transfer">Transfer</Link>
        <Link href="/">Sign out</Link>
      </div>
    </div>
  );
}
