"use client";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import { useState } from "react";

export default function Dashboard() {
  const [phone, setPhone] = useState("");
  const [busyBuy, setBusyBuy] = useState(false);
  const [msg, setMsg] = useState("");

  const onBuy = async () => {
    setBusyBuy(true);
    setMsg("");

    try {
      const res = await fetch("/api/buy-bundle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          network: "mtn",
          reference: Date.now().toString(),
          msisdn: phone,
          capacity: 1
        })
      });

      const data = await res.json();

      if (data.success) {
        setMsg(data.message || "Bundle order placed successfully");
      } else {
        setMsg(data.message || "Order failed");
      }
    } catch {
      setMsg("Network error while ordering bundle");
    } finally {
      setBusyBuy(false);
    }
  };

  return (
    <>
      <Nav />
      <div className="container">
        <div className="card" style={{ maxWidth: 700, margin: "0 auto" }}>
          <h2 className="h2">Buy MTN Bundle</h2>
          <p className="p">
            Enter the phone number and place your bundle order directly.
          </p>

          <div className="label">Recipient phone number</div>
          <input
            className="input"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="0591234567"
          />

          <div className="row" style={{ marginTop: 14 }}>
            <button
              className="btn primary"
              onClick={onBuy}
              disabled={busyBuy || !phone}
            >
              {busyBuy ? "Processing..." : "Buy now"}
            </button>
          </div>

          {msg && <div className="notice" style={{ marginTop: 12 }}>{msg}</div>}

          <div style={{ marginTop: 16 }} className="notice">
            Current setup sends an MTN order with capacity 1 through GHDataConnect.
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
