"use client";
import Link from "next/link";

export default function Nav() {
  return (
    <div className="container">
      <div className="nav">
        <div className="brand">
          <div className="logo">K</div>
          <div>
            <div style={{ fontWeight: 800 }}>Kaypee</div>
            <div className="badge">Samic • WhatsApp: 0546183019</div>
          </div>
        </div>

        <div className="links">
          <Link className="btn small" href="/">Home</Link>
          <Link className="btn small" href="/dashboard">Buy Bundle</Link>
        </div>
      </div>
    </div>
  );
}
