"use client";

import { useState } from "react";
import { auth, db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function AlertForm() {
  const [itemName, setItemName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user) {
      alert("로그인 후 이용해주세요.");
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, "alerts"), {
        userId: user.uid,
        itemName,
        startDate,
        endDate,
        createdAt: serverTimestamp(),
        lastNotified: null,
      });
      alert("알림이 등록되었습니다!");
      setItemName("");
      setStartDate("");
      setEndDate("");
    } catch (err) {
      console.error(err);
      alert("등록 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center py-10 bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg p-6 bg-white rounded-lg shadow space-y-4"
      >
        <h2 className="text-xl font-medium text-gray-800">새 알림 등록</h2>

        {/* 숙소 이름 입력 */}
        <input
          type="text"
          placeholder="숙소 이름을 입력하세요"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
        />

        {/* 시작일 선택 */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            시작일
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
            className="mt-1 w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        {/* 종료일 선택 */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            종료일
          </label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
            className="mt-1 w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full py-2 text-white bg-green-600 rounded hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? "등록 중…" : "등록하기"}
        </button>
      </form>
    </div>
  );
}
