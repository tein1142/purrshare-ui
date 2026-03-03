import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import './Home.css'
export default function Home() {
  const navigate = useNavigate();

  return (
    <Layout>
      <img
        className="logo"
        src="https://img5.pic.in.th/file/secure-sv1/LOGO-02248815be29cf3b94.png"
      />

      <div className="gridTop">
        <div className="tile" onClick={() => navigate("/select")}>
          <img src="https://img2.pic.in.th/icon-20.png" />
        </div>

        <div className="tile" onClick={() => navigate("/sell")}>
          <img src="https://img5.pic.in.th/file/secure-sv1/icon-21.png" />
        </div>
      </div>

      <div className="gridBottom">
        <div className="tile" onClick={() => navigate("/donate")}>
          <img src="https://img2.pic.in.th/icon-22.png" />
        </div>
      </div>
    </Layout>
  );
}