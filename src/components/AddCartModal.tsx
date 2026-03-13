import styles from "../pages/css/AddCartModal.module.css";
import { useNavigate } from "react-router-dom";
import ModalShell from "./ModalShell";

export default function AddCartModal({ onClose }: any) {
  const navigate = useNavigate();
  return (
    <ModalShell open onClose={onClose} panelClassName={styles.modal}>
        <div className={styles.title}>เพิ่มลงตะกร้าแล้ว</div>

        <div className={styles.text}>ต้องการทำอะไรต่อ?</div>

        <div className={styles.actions}>
          <button className={styles.continueBtn} onClick={onClose}>
            ช้อปปิ้งต่อ
          </button>

          <button className={styles.cartBtn} onClick={() => navigate("/cart")}>
            ไปที่ตะกร้า
          </button>
        </div>
    </ModalShell>
  );
}
