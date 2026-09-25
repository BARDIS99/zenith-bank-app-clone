"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const API = "http://localhost:8000";

function ZMark({ size = 56 }: { size?: number }) {
  return (
    <svg className="zmark" width={size} height={size} viewBox="0 0 64 64" aria-hidden>
      <polygon points="6,8 58,8 28,32 58,32 6,56 36,32 6,32" fill="#5b5b5b" />
      <polygon points="10,34 58,10 58,34 22,56" fill="#e3000f" />
    </svg>
  );
}

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
    <div className="wrap login">
      <div className="demo">UNOFFICIAL DEMO · NOT ZENITH BANK</div>
      <div className="login-hero">
        <ZMark />
        <div style={{ fontWeight: 800, letterSpacing: 3, color: "#5b5b5b", marginTop: 8 }}>ZENITH</div>
        <h2 style={{ margin: "24px 0 0" }}>Welcome back!</h2>
        <p className="sub">Identify yourself to sign in. Demo only.</p>
      </div>
      <form onSubmit={onSubmit}>
        <label>ACCOUNT NUMBER</label>
        <input value={account} onChange={(e) => setAccount(e.target.value)} />
        <label>PASSWORD</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {err && <div className="err">{err}</div>}
        <button type="submit">LOGIN</button>
      </form>
    </div>
  );
}
