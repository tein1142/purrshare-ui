import { useEffect, useState } from "react";
import styles from "../pages/css/SuccessModal.module.css";
import { useNavigate } from "react-router-dom";
import ModalShell from "./ModalShell";


type Props = {
  open: boolean;
  onClose: () => void;
  scrollToPending?: boolean;
};

export default function SuccessModal({ open, onClose, scrollToPending = true }: Readonly<Props>) {
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!open) return;

    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);

  }, [open]);

  return (
    <ModalShell open={open} onClose={onClose} panelClassName={styles.modal}>

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
                
                // Scroll to pending items section after navigation
                if (scrollToPending) {
                  setTimeout(() => {
                    const element = document.querySelector('[data-section="pending-items"]');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }, 100);
                }
              }}
            >
              ตกลง
            </button>
          </>
        )}

    </ModalShell>
  );
}