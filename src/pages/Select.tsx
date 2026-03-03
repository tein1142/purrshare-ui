import { useNavigate } from "react-router-dom";
import "./Select.css";

export default function Select() {
  const navigate = useNavigate();

  return (
    <div className="app">

      {/* ===== HEADER ===== */}
      <header className="top">
        <div className="searchRow">
          <div className="brandMark">
            <div className="brandLink" onClick={() => navigate("/")}>
              <img src="https://img5.pic.in.th/file/secure-sv1/LOGO-0383f8dd99c535b987.png" />
            </div>
          </div>

          <div className="searchBox">
            <input placeholder="ค้นหา..." />
          </div>

          <button className="actionBtn">EN</button>
        </div>

        <div className="sectionTitle">
          หมวดหมู่สินค้า
        </div>

        <div className="quickCats">
          <div className="quickCat" onClick={() => navigate("/products?cat=food")}>
            <div className="quickIco">
              <img src="https://img5.pic.in.th/file/secure-sv1/icon-08.png" />
            </div>
            <span>อาหาร<br/>และโภชนาการ</span>
          </div>

          <div className="quickCat" onClick={() => navigate("/products?cat=litter")}>
            <div className="quickIco">
              <img src="https://img5.pic.in.th/file/secure-sv1/icon-09415f32d6faf6a906.png" />
            </div>
            <span>ห้องน้ำ<br/>ทรายแมว</span>
          </div>

          <div className="quickCat" onClick={() => navigate("/products?cat=daily")}>
            <div className="quickIco">
              <img src="https://img5.pic.in.th/file/secure-sv1/icon-107aa0b07e7612da66.png" />
            </div>
            <span>ของใช้<br/>ประจำวัน</span>
          </div>

          <div className="quickCat" onClick={() => navigate("/products?cat=furniture")}>
            <div className="quickIco">
              <img src="https://img2.pic.in.th/icon-11.png" />
            </div>
            <span>ที่นอน<br/>เฟอร์นิเจอร์</span>
          </div>

          <div className="quickCat" onClick={() => navigate("/products?cat=toys")}>
            <div className="quickIco">
              <img src="https://img5.pic.in.th/file/secure-sv1/icon-12b9ced998f5e338f6.png" />
            </div>
            <span>ของเล่น</span>
          </div>
        </div>

        <div className="bigButtons">
          <div className="bigBtn" onClick={() => navigate("/products?cat=new")}>
            <div className="bigIco">
              <img src="https://img2.pic.in.th/icon-13.png" />
            </div>
            <div className="label">ของใหม่ล่าสุด</div>
          </div>

          <div className="bigBtn" onClick={() => navigate("/products?cat=popular")}>
            <div className="bigIco">
              <img src="https://img5.pic.in.th/file/secure-sv1/icon-14.png" />
            </div>
            <div className="label">ยอดนิยม</div>
          </div>
        </div>
      </header>

      {/* ===== CONTENT ===== */}
      <main className="content">
        <div className="h1center">แบ่งหมวดหมู่ตามไลฟ์สไตล์</div>
      </main>

      {/* ===== TABBAR ===== */}
      <nav className="tabbar">
        <div className="tab active" onClick={() => navigate("/")}>
          <img className="tabIconImg"
            src="https://img5.pic.in.th/file/secure-sv1/icon-168f8d5a7adad294f0.png" />
        </div>

        <div className="tab" onClick={() => navigate("/star")}>
          <img className="tabIconImg"
            src="https://img5.pic.in.th/file/secure-sv1/icon-17.png" />
        </div>

        <div className="tab" onClick={() => navigate("/cart")}>
          <img className="tabIconImg"
            src="https://img5.pic.in.th/file/secure-sv1/icon-1507d739c217dd05c2.png" />
        </div>

        <div className="tab" onClick={() => navigate("/profile")}>
          <img className="tabIconImg"
            src="https://img5.pic.in.th/file/secure-sv1/icon-18.png" />
        </div>
      </nav>

    </div>
  );
}