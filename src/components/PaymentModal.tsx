import styles from "../pages/css/PaymentModal.module.css";

type Props = {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

export default function PaymentModal({ open, onClose, onSuccess }: Props) {
  if (!open) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        {/* HEADER */}

        <div className={styles.header}>
          <button className={styles.closeBtn} onClick={onClose}>
            ✕
          </button>
          <div className={styles.title}>สแกนเพื่อชำระเงิน</div>
        </div>

        {/* QR */}

        <div className={styles.qrCard}>
          <img
            className={styles.qr}
            src="https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=promptpay-demo"
          />
        </div>

        {/* BANK INFO */}

        <div className={styles.bankCard}>
          <div className={styles.bankAvatar}></div>

          <div className={styles.bankInfo}>
            <div className={styles.bankName}>ธนาคารกสิกรไทย</div>
            <div className={styles.bankDetail}>ชื่อบัญชี: Purrshare Store</div>
            <div className={styles.bankDetail}>เลขบัญชี: 123-4-56789-0</div>
          </div>
        </div>

        {/* BUTTON */}

        <button
          className={styles.payBtn}
          onClick={() => {
            onClose(); 
            onSuccess();
          }}
        >
          ชำระเงินแล้ว
        </button>
      </div>
    </div>
  );
}
