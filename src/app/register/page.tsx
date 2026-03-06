"use client";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { api } from "@/lib/api";
import { setToken } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Register(){
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");
    setBusy(true);
    try{
      // Expected: POST /auth/register -> { accessToken }
      const res = await api<{accessToken:string}>("/auth/register", { method:"POST", body:{ fullName, phone, email, password }});
      setToken(res.accessToken);
      router.push("/dashboard");
    }catch(ex:any){
      setErr(ex.message || "Registration failed");
    }finally{
      setBusy(false);
    }
  }

  return (
    <>
      <Nav />
      <div className="container">
        <div className="card" style={{maxWidth:560, margin:"0 auto"}}>
          <h2 className="h2">Create account</h2>
          <p className="p">Join Kaypee (Samic) and start buying/reselling bundles.</p>
          <form onSubmit={onSubmit}>
            <div className="label">Full name</div>
            <input className="input" value={fullName} onChange={e=>setFullName(e.target.value)} placeholder="Your name" />
            <div className="label">Phone</div>
            <input className="input" value={phone} onChange={e=>setPhone(e.target.value)} placeholder="054xxxxxxx" />
            <div className="label">Email</div>
            <input className="input" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@email.com" />
            <div className="label">Password</div>
            <input className="input" value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="Create a strong password" />
            {err && <div className="notice" style={{marginTop:12}}>{err}</div>}
            <div className="row" style={{marginTop:14}}>
              <button className="btn primary" disabled={busy}>{busy ? "Creating..." : "Create account"}</button>
              <a className="btn" href="/login">Login</a>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
