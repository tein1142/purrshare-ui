import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Select from "./pages/Select";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import Star from "./pages/Star";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/select" element={<Select />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/star" element={<Star />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
