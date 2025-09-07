// src/pages/ThankYou.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
export default function ThankYou() {
  const nav = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2">Thank you!</h1>
        <p className="mb-4">You are registered. A confirmation email has been sent.</p>
        <button className="px-4 py-2 rounded bg-blue-600 text-white" onClick={() => nav("/")}>Back to Home</button>
      </div>
    </div>
  );
}
