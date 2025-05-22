"use client";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import LoginForm from "../components/LoginForm";
import AlertForm from "../components/AlertForm";

export default function Page() {
  const [user, loading] = useAuthState(auth);

  if (loading) return <p>로딩중…</p>;
  if (!user) return <LoginForm />;

  return (
    <div style={{ padding: 24 }}>
      <h1>예약 취소 알림 등록</h1>
      <AlertForm />
    </div>
  );
}
