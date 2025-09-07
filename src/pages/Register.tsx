// src/pages/Register.tsx
import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";

export default function RegisterPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const initialWorkshop = searchParams.get("workshop") ?? "";
  const initialDate = searchParams.get("date") ?? "";

  const [workshop, setWorkshop] = useState(initialWorkshop);
  const [date, setDate] = useState(initialDate);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setWorkshop(initialWorkshop);
    setDate(initialDate);
  }, [initialWorkshop, initialDate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      alert("Please enter an email");
      return;
    }
    setLoading(true);

    // ✅ Match EXACTLY your template variables
    const templateParams = {
      workshop_name: workshop || "Workshop",
      user_name: name || "Student",
      date: date || "Not specified",
      email: email,             // must be "email", not "user_email"
      phone: phone || "Not provided",
    };

    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        throw new Error("❌ EmailJS environment variables not configured.");
      }

      await emailjs.send(serviceId, templateId, templateParams, publicKey);

      alert("✅ Registration successful — confirmation email sent!");
      navigate("/thank-you");
    } catch (err) {
      console.error("EmailJS error:", err);
      alert("❌ Failed to send confirmation email. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-3">Register for Workshop</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <div className="text-sm font-medium">Workshop</div>
            <input
              value={workshop}
              onChange={(e) => setWorkshop(e.target.value)}
              className="w-full border p-2 rounded"
            />
          </label>

          <label className="block">
            <div className="text-sm font-medium">Date</div>
            <input
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border p-2 rounded"
            />
          </label>

          <label className="block">
            <div className="text-sm font-medium">Full name</div>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border p-2 rounded"
            />
          </label>

          <label className="block">
            <div className="text-sm font-medium">Email</div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border p-2 rounded"
            />
          </label>

          <label className="block">
            <div className="text-sm font-medium">Phone (optional)</div>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border p-2 rounded"
            />
          </label>

          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
              disabled={loading}
            >
              {loading ? "Sending..." : "Register & Send Confirmation"}
            </button>
            <button
              type="button"
              className="px-4 py-2 rounded border"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
