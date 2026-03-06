"use client";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { api } from "@/lib/api";
import { useEffect, useState } from "react";

export default function Orders(){
  const [items, setItems] = useState<any[]>([]);
  const [err, setErr] = useState("");

  useEffect(()=>{
    (async ()=>{
      try{
        const res = await api<any>("/orders?limit=50", { auth:true });
        setItems(Array.isArray(res) ? res : (res.items || res.data || []));
      }catch(ex:any){
        setErr(ex.message || "Failed to load orders");
      }
    })();
  },[]);

  return (
    <>
      <Nav />
      <div className="container">
        <div className="card">
          <h2 className="h2">Orders</h2>
          <p className="p">Your most recent bundle purchases.</p>
          {err && <div className="notice">{err}</div>}
          <table className="table">
            <thead>
              <tr>
                <th>Order Ref</th>
                <th>Status</th>
                <th>Phone</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {items.map((o)=>(
                <tr key={o.orderRef || o.id}>
                  <td>{o.orderRef}</td>
                  <td>{o.status}</td>
                  <td>{o.recipientPhone}</td>
                  <td>{o.amountCharged}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </>
  );
}
