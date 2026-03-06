
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Link from "next/link";

export default function Home(){
  return (
    <>
      <Nav />
      <div className="container">
        <div className="grid">
          <div className="card">
            <div className="badge">MTN Bundles • Wallet Funding • Instant Delivery</div>
            <h1 className="h1">Kaypee Data Shop</h1>
            <p className="p">Buy MTN bundles for yourself or your customers. Fund your wallet with Paystack, place orders, and track delivery from your dashboard.</p>
            <div className="row" style={{marginTop:14}}>
              <Link className="btn primary" href="/register">Get started</Link>
              <Link className="btn" href="/login">Login</Link>
              <a className="btn" href="https://wa.me/233546183019" target="_blank">WhatsApp Support</a>
            </div>
            <div style={{marginTop:16}} className="notice">Tip: Start with small funding to test, then scale your reseller business.</div>
          </div>
          <div className="card">
            <h2 className="h2">How it works</h2>
            <ol className="p">
              <li>Create account</li>
              <li>Fund wallet (Paystack)</li>
              <li>Select bundle and recipient number</li>
              <li>Track status and history</li>
            </ol>
            <div style={{height:12}} />
            <h2 className="h2">Slogan</h2>
            <p className="p"><b>Samic</b> — Simple, fast, reliable.</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
