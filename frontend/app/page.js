"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [account, setAccount] = useState("1234567890");
  const [password, setPassword] = useState("password");
  const [message, setMessage] = useState("");

  function loginUser(e) {
    e.preventDefault();
    setMessage("please wait...");

    fetch("http://localhost:8000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        account: account,
        password: password
      })
    })
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        if (data.ok == true) {
          localStorage.setItem("user", JSON.stringify(data));
          router.push("/dashboard");
        } else {
          setMessage("wrong account or password");
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
        <h2>ZENITH</h2>
        <p>Welcome back!</p>
      </div>
      <form className="box" onSubmit={loginUser}>
        <p>Account number</p>
        <input value={account} onChange={function (e) { setAccount(e.target.value); }} />
        <p>Password</p>
        <input type="password" value={password} onChange={function (e) { setPassword(e.target.value); }} />
        <p>{message}</p>
        <button>LOGIN</button>
      </form>
    </div>
  );
}
