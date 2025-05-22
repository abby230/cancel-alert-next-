"use client";

import { useState } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isLoginMode) {
        // 로그인
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        // 회원가입
        await createUserWithEmailAndPassword(auth, email, password);
      }
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 360, margin: "0 auto" }}>
      <h2>{isLoginMode ? "로그인" : "회원가입"}</h2>
      <div>
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: "100%", padding: 8, marginBottom: 8 }}
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: "100%", padding: 8, marginBottom: 12 }}
        />
      </div>
      <button type="submit" disabled={loading} style={{ width: "100%", padding: 10 }}>
        {loading ? "처리 중…" : isLoginMode ? "로그인" : "회원가입"}
      </button>
      <p style={{ textAlign: "center", marginTop: 12 }}>
        {isLoginMode ? "계정이 없으신가요? " : "이미 계정이 있으신가요? "}
        <button
          type="button"
          onClick={() => setIsLoginMode(!isLoginMode)}
          style={{ color: "blue", background: "none", border: "none", cursor: "pointer" }}
        >
          {isLoginMode ? "회원가입" : "로그인"}
        </button>
      </p>
    </form>
  );
}
