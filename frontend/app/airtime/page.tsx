"use client";
import { useState } from "react";
import Link from "next/link";

const API = "http://localhost:8000";

export default function AirtimePage() {
  const [network, setNetwork] = useState("MTN");
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(""); setErr("");
    const res = await fetch(`${API}/api/airtime`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ network, phone, amount: Number(amount) }),
    });
    const data = await res.json();
    if (!res.ok) setErr(data.detail || "Failed");
    else setMsg(data.message + " Balance: ₦" + Number(data.balance).toLocaleString());
  }

  return (
    <div className="wrap">
      <div className="demo">UNOFFICIAL DEMO · NOT ZENITH BANK</div>
      <div className="top"><strong>Airtime</strong></div>
      <form className="card" onSubmit={onSubmit}>
        <label>Network</label>
        <select value={network} onChange={(e) => setNetwork(e.target.value)}>
          <option>MTN</option>
          <option>Airtel</option>
          <option>Glo</option>
          <option>9mobile</option>
        </select>
        <label>Phone</label>
        <input value={phone} onChange={(e) => setPhone(e.target.value)} required />
        <label>Amount (₦)</label>
        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required />
        {err && <div className="err">{err}</div>}
        {msg && <div className="ok">{msg}</div>}
        <button type="submit">Buy Airtime</button>
      </form>
      <nav className="bottom">
        <Link href="/dashboard">Overview</Link>
        <Link className="active" href="/airtime">Airtime</Link>
        <Link href="/transfer">Transfer</Link>
        <Link href="/">Sign out</Link>
      </nav>
    </div>
  );
}
