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
