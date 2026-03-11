import { useEffect, useState } from "react";
import styles from "../pages/css/SuccessModal.module.css";
import { useNavigate } from "react-router-dom";


type Props = {
  open: boolean;
  onClose: () => void;
};

export default function SuccessModal({ open, onClose }: Props) {
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!open) return;

    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);

  }, [open]);

  if (!open) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>

        {loading ? (
          <>
            <div className={styles.loader}></div>
            <div className={styles.loadingText}>
              กำลังตรวจสอบการชำระเงิน
            </div>
          </>
        ) : (
          <>
            <div className={styles.successIcon}>✓</div>

            <div className={styles.title}>
              ชำระเงินสำเร็จแล้ว
            </div>

            <div className={styles.desc}>
              ระบบได้บันทึกคำสั่งซื้อเรียบร้อย
            </div>

            <button
              className={styles.okBtn}
              onClick={() => {
                onClose();
                navigate("/profile");
              }}
            >
              ตกลง
            </button>
          </>
        )}

      </div>
    </div>
  );
}