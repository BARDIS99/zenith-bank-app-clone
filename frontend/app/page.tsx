"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const API = "http://localhost:8000";

export default function LoginPage() {
  const router = useRouter();
  const [account, setAccount] = useState("1234567890");
  const [password, setPassword] = useState("password");
  const [err, setErr] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    const res = await fetch(`${API}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ account, password }),
    });
    if (!res.ok) {
      setErr("Invalid account or password");
      return;
    }
    const data = await res.json();
    localStorage.setItem("zenith_user", JSON.stringify(data));
    router.push("/dashboard");
  }

  return (
    <div className="wrap">
      <div className="header">
        <h1>Zenith Bank</h1>
        <p style={{ margin: "6px 0 0", fontSize: 13, opacity: 0.9 }}>Mobile Banking Demo</p>
      </div>
      <form className="card" onSubmit={onSubmit}>
        <label>Account number</label>
        <input value={account} onChange={(e) => setAccount(e.target.value)} />
        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {err && <div className="err">{err}</div>}
        <button type="submit">Sign in</button>
      </form>
    </div>
  );
}
