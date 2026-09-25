"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function DashboardPage() {
  const [info, setInfo] = useState(null);

  useEffect(function () {
    fetch("http://localhost:8000/api/account")
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        setInfo(data);
      });
  }, []);

  if (info == null) {
    return (
      <div className="page">
        <div className="demo">loading...</div>
      </div>
    );
  }

  var list = info.transactions;
  var items = [];
  for (var i = 0; i < list.length; i++) {
    var t = list[i];
    var sign = "+";
    if (t.type == "debit") {
      sign = "-";
    }
    items.push(
      <div key={t.id} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #eee" }}>
        <div>
          <div>{t.desc}</div>
          <div style={{ fontSize: "12px", color: "gray" }}>{t.date}</div>
        </div>
        <div>{sign}N{t.amount}</div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="demo">UNOFFICIAL DEMO - NOT ZENITH BANK</div>
      <div className="top">
        <p>Overview</p>
        <h3>{info.name}</h3>
        <p>{info.account} - {info.type}</p>
        <h2>N{info.balance}</h2>
      </div>

      <div className="links">
        <div className="link-item"><Link href="/transfer">Transfer</Link></div>
        <div className="link-item"><Link href="/airtime">Airtime</Link></div>
        <div className="link-item">Bills</div>
        <div className="link-item">QR Pay</div>
        <div className="link-item">My BVN</div>
        <div className="link-item">Cards</div>
        <div className="link-item">Settings</div>
        <div className="link-item"><Link href="/">Logout</Link></div>
      </div>

      <div className="box">
        <b>History</b>
        {items}
      </div>

      <div className="bottom">
        <Link href="/dashboard">Overview</Link>
        <Link href="/airtime">Airtime</Link>
        <Link href="/transfer">Transfer</Link>
        <Link href="/">Sign out</Link>
      </div>
    </div>
  );
}
