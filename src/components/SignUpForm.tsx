// src/components/SignUpForm.tsx
"use client";
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useRouter } from "next/navigation";

export default function SignUpForm() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pw !== confirmPw) {
      setError("Passwords do not match");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, pw);
      router.push("/");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={onSubmit} className="max-w-md mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl mb-4">Sign Up</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="w-full mb-3 px-3 py-2 border rounded"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={pw}
        onChange={e => setPw(e.target.value)}
        className="w-full mb-3 px-3 py-2 border rounded"
        required
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPw}
        onChange={e => setConfirmPw(e.target.value)}
        className="w-full mb-4 px-3 py-2 border rounded"
        required
      />
      <button type="submit" className="w-full bg-teal-600 text-white py-2 rounded">
        Create Account
      </button>
    </form>
  );
}
