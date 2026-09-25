"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

const API = "http://localhost:8000";
type Tx = { id: number; type: string; desc: string; amount: number; date: string };

function ZMark() {
  return (
    <svg width="28" height="28" viewBox="0 0 64 64">
      <polygon points="6,8 58,8 28,32 58,32 6,56 36,32 6,32" fill="#fff" opacity=".85" />
      <polygon points="10,34 58,10 58,34 22,56" fill="#fff" />
    </svg>
  );
}

export default function Dashboard() {
  const [data, setData] = useState<any>(null);
  useEffect(() => {
    fetch(`${API}/api/account`).then((r) => r.json()).then(setData);
  }, []);
  if (!data) return <div className="wrap"><div className="demo">Loading...</div></div>;

  return (
    <div className="wrap">
      <div className="demo">UNOFFICIAL DEMO · NOT ZENITH BANK</div>
      <div className="top">
        <div>
          <div style={{ fontSize: 12, opacity: .9 }}>Overview</div>
          <strong>{data.name}</strong>
        </div>
        <ZMark />
      </div>
      <div className="acct">
        <small>{data.account} · {data.type}</small>
        <h2>₦{Number(data.balance).toLocaleString()}</h2>
        <small>Available balance</small>
      </div>
      <div className="links">
        <Link href="/transfer"><div className="icon">⇄</div>Transfer</Link>
        <Link href="/airtime"><div className="icon">☎</div>Airtime</Link>
        <div><div className="icon">▣</div>Bills</div>
        <div><div className="icon">◈</div>QR Pay</div>
        <div><div className="icon">☰</div>My BVN</div>
        <div><div className="icon">⏰</div>Scheduled</div>
        <div><div className="icon">♦</div>Cards</div>
        <div><div className="icon">⚙</div>Settings</div>
      </div>
      <div className="card">
        <strong>History</strong>
        {data.transactions.map((t: Tx) => (
          <div className="tx" key={t.id}>
            <div>
              <div>{t.desc}</div>
              <div style={{ fontSize: 11, color: "#888" }}>{t.date}</div>
            </div>
            <div className={t.type}>
              {t.type === "debit" ? "-" : "+"}₦{t.amount.toLocaleString()}
            </div>
          </div>
        ))}
      </div>
      <nav className="bottom">
        <Link className="active" href="/dashboard">Overview</Link>
        <Link href="/airtime">Airtime</Link>
        <Link href="/transfer">Transfer</Link>
        <Link href="/">Sign out</Link>
      </nav>
    </div>
  );
}
