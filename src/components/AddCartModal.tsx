import styles from "../pages/css/AddCartModal.module.css";

export default function AddCartModal({ onClose }: any) {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.title}>
          เพิ่มลงตะกร้าแล้ว
        </div>

        <div className={styles.text}>
          ต้องการทำอะไรต่อ?
        </div>

        <div className={styles.actions}>
          <button
            className={styles.continueBtn}
            onClick={onClose}
          >
            ช้อปปิ้งต่อ
          </button>

          <button className={styles.cartBtn}>
            ไปที่ตะกร้า
          </button>
        </div>
      </div>
    </div>
  );
}