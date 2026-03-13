import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import liff from "@line/liff";
import Home from "./pages/Home";
import Select from "./pages/Select";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import Star from "./pages/Star";
import Sell from "./pages/Sell";
import Donate from "./pages/Donate";

let liffInitPromise: Promise<void> | null = null;

async function initializeLiff(): Promise<void> {
  const liffId = import.meta.env.VITE_LIFF_ID;

  if (!liffId) {
    console.warn("[LIFF] Missing VITE_LIFF_ID. Skipping LIFF initialization.");
    return;
  }

  liffInitPromise ??= liff.init({ liffId }).then(() => {
    if (!liff.isLoggedIn()) {
      liff.login({ redirectUri: globalThis.location.href });
    }
  });

  await liffInitPromise;
}

function App() {
  useEffect(() => {
    void initializeLiff().catch((error) => {
      console.error("[LIFF] Initialization failed:", error);
    });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/select" element={<Select />} />
        <Route path="/products" element={<Products />} />
        <Route path="/sell" element={<Sell />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/star" element={<Star />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
