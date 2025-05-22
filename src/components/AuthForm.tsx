// src/components/AuthForm.tsx
"use client";

import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useRouter } from "next/navigation";

export default function AuthForm() {
  const [email, setEmail] = useState<string>("");    // email 상태
  const [password, setPassword] = useState<string>(""); // password 상태
  const [loginError, setLoginError] = useState<string | null>(null); // 에러 메시지

  const router = useRouter();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null); // 이전 에러 초기화

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/");
    } catch (e) {
      // unknown 타입 안전하게 처리
      const message = e instanceof Error ? e.message : "알 수 없는 오류가 발생했습니다";
      setLoginError(message);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="max-w-md mx-auto p-6 bg-white rounded-lg shadow"
    >
      <h2 className="text-2xl mb-4">Login</h2>

      {loginError && (
        <p className="text-red-500 mb-2" role="alert">
          {loginError}
        </p>
      )}

      <label className="block mb-2">
        <span className="text-sm font-medium">Email</span>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}  // setter 사용
          className="w-full mt-1 px-3 py-2 border rounded"
          required
        />
      </label>

      <label className="block mb-4">
        <span className="text-sm font-medium">Password</span>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}  // setter 사용
          className="w-full mt-1 px-3 py-2 border rounded"
          required
        />
      </label>

      <button
        type="submit"
        className="w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700"
      >
        Sign In
      </button>
    </form>
  );
}
