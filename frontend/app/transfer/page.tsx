"use client";
import { useState } from "react";
import Link from "next/link";

const API = "http://localhost:8000";

export default function TransferPage() {
  const [to_account, setTo] = useState("");
  const [bank, setBank] = useState("Zenith Bank");
  const [amount, setAmount] = useState("");
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg("");
    setErr("");
    const res = await fetch(`${API}/api/transfer`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ to_account, bank, amount: Number(amount), narration: "Demo transfer" }),
    });
    const data = await res.json();
    if (!res.ok) setErr(data.detail || "Failed");
    else setMsg(data.message + " New balance: ₦" + Number(data.balance).toLocaleString());
  }

  return (
    <div className="wrap">
      <div className="header"><h1>Transfer</h1></div>
      <form className="card" onSubmit={onSubmit}>
        <label>Bank</label>
        <select value={bank} onChange={(e) => setBank(e.target.value)}>
          <option>Zenith Bank</option>
          <option>GTBank</option>
          <option>Access Bank</option>
          <option>UBA</option>
        </select>
        <label>Account number</label>
        <input value={to_account} onChange={(e) => setTo(e.target.value)} required />
        <label>Amount (₦)</label>
        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required />
        {err && <div className="err">{err}</div>}
        {msg && <div className="ok">{msg}</div>}
        <button type="submit">Send</button>
      </form>
      <div className="nav"><Link href="/dashboard">Back</Link></div>
    </div>
  );
}
