
"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getToken, clearToken } from "../lib/auth";

export default function Nav() {
  const router = useRouter();
  const token = getToken();

  const onLogout = () => {
    clearToken();
    router.push("/login");
  };

  return (
    <div className="container">
      <div className="nav">
        <div className="brand">
          <div className="logo">K</div>
          <div>
            <div style={{fontWeight:800}}>Kaypee</div>
            <div className="badge">Samic • WhatsApp: 0546183019</div>
          </div>
        </div>
        <div className="links">
          <Link className="btn small" href="/">Home</Link>
          {token ? (
            <>
              <Link className="btn small" href="/dashboard">Dashboard</Link>
              <button className="btn small" onClick={onLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link className="btn small" href="/login">Login</Link>
              <Link className="btn small primary" href="/register">Create account</Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
