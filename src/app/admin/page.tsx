import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function Admin(){
  return (
    <>
      <Nav />
      <div className="container">
        <div className="card">
          <h2 className="h2">Admin Dashboard</h2>
          <p className="p">
            This is a placeholder. Your Core API already has the blueprint for admin endpoints.
            When those endpoints are ready, we can connect this page to manage users, orders, pricing, and devices.
          </p>
          <div className="notice" style={{marginTop:12}}>
            Next steps: add admin login, role guard, and pages for users/orders/bundles/pricing/devices.
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
