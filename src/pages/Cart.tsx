import TabBar from "../components/TabBar";
import styles from "./css/Cart.module.css";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const navigate = useNavigate();

  return (
    <div className={styles.cartpage}>
      <div className={styles.header}>
        <button className={styles.backBtn} onClick={() => navigate(-1)}>
          <span className={styles.arrow}>‹</span>
        </button>

        <div className={styles.title}>ตะกร้า</div>
      </div>

      <div className={styles.cartItem}>
        <img
          className={styles.productImg}
          src="https://images.unsplash.com/photo-1503431128871-cd250803fa41?w=400"
        />

        <div className={styles.productInfo}>
          <div className={styles.productName}>อาหารเปียกพรีเมียม 6 ซอง</div>

          <div className={styles.productDesc}>เนื้อแน่น ไม่เค็ม</div>

          <div className={styles.bottomRow}>
            <div className={styles.productPrice}>279 THB</div>

            <div className={styles.qtyBox}>
              <button className={styles.qtyBtn}>-</button>
              <div className={styles.qtyNumber}>4</div>
              <button className={styles.qtyBtn}>+</button>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.cartItem}>
        <img
          className={styles.productImg}
          src="https://images.unsplash.com/photo-1503431128871-cd250803fa41?w=400"
        />

        <div className={styles.productInfo}>
          <div className={styles.productName}>อาหารเปียกพรีเมียม 6 ซอง</div>

          <div className={styles.productDesc}>เนื้อแน่น ไม่เค็ม</div>

          <div className={styles.bottomRow}>
            <div className={styles.productPrice}>279 THB</div>

            <div className={styles.qtyBox}>
              <button className={styles.qtyBtn}>-</button>
              <div className={styles.qtyNumber}>4</div>
              <button className={styles.qtyBtn}>+</button>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.paymentBox}>
        <div className={styles.paymentTitle}>ข้อมูลการชำระเงิน</div>

        <div className={styles.paymentRow}>
          <span className={styles.paymentLabel}>รวมการสั่งซื้อ</span>
          <span className={styles.paymentValue}>837 THB</span>
        </div>

        <div className={styles.paymentRow}>
          <span className={styles.paymentLabel}>การจัดส่ง</span>
          <span className={styles.paymentValue}>25 THB</span>
        </div>

        <div className={styles.divider}></div>

        <div className={styles.paymentTotal}>
          <span>ยอดชำระเงินทั้งหมด</span>
          <span>862 THB</span>
        </div>
      </div>

      <div className={styles.checkoutBar}>
        <div className={styles.checkoutPrice}>304 THB</div>

        <button className={styles.checkoutBtn}>ชำระเงิน</button>
      </div>

      <TabBar />
    </div>
  );
}
