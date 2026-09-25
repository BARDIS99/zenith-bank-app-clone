"use client";

import { useState } from "react";
import Link from "next/link";

export default function AirtimePage() {
  const [network, setNetwork] = useState("MTN");
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  function buyAirtime(e) {
    e.preventDefault();

    fetch("http://localhost:8000/api/airtime", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        network: network,
        phone: phone,
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
        <h3>Buy Airtime</h3>
      </div>
      <form className="box" onSubmit={buyAirtime}>
        <p>Network</p>
        <select value={network} onChange={function (e) { setNetwork(e.target.value); }}>
          <option>MTN</option>
          <option>Airtel</option>
          <option>Glo</option>
          <option>9mobile</option>
        </select>
        <p>Phone</p>
        <input value={phone} onChange={function (e) { setPhone(e.target.value); }} />
        <p>Amount</p>
        <input value={amount} onChange={function (e) { setAmount(e.target.value); }} />
        <p>{message}</p>
        <button>Buy</button>
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
