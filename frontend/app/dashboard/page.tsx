"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

const API = "http://localhost:8000";

type Tx = { id: number; type: string; desc: string; amount: number; date: string };

export default function Dashboard() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch(`${API}/api/account`).then((r) => r.json()).then(setData);
  }, []);

  if (!data) return <div className="wrap"><div className="header"><h1>Loading...</h1></div></div>;

  return (
    <div className="wrap">
      <div className="header">
        <h1>Hello, {data.name}</h1>
        <p style={{ margin: "6px 0 0", fontSize: 13 }}>{data.type} · {data.account}</p>
      </div>
      <div className="card">
        <div style={{ fontSize: 13, color: "#6b7280" }}>Available balance</div>
        <div className="bal">₦{Number(data.balance).toLocaleString()}</div>
      </div>
      <div className="nav">
        <Link href="/transfer">Transfer</Link>
        <Link href="/airtime">Airtime</Link>
        <Link href="/">Logout</Link>
      </div>
      <div className="card">
        <strong>Recent transactions</strong>
        {data.transactions.map((t: Tx) => (
          <div className="tx" key={t.id}>
            <div>
              <div>{t.desc}</div>
              <div style={{ fontSize: 12, color: "#6b7280" }}>{t.date}</div>
            </div>
            <div className={t.type}>
              {t.type === "debit" ? "-" : "+"}₦{t.amount.toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
