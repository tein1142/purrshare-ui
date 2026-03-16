import styles from "../pages/css/PaymentModal.module.css";
import CloseIcon from "./CloseButton";
import ModalShell from "./ModalShell";

type Props = {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

export default function PaymentModal({ open, onClose, onSuccess }: Readonly<Props>) {
  return (
    <ModalShell open={open} onClose={onClose} panelClassName={styles.modal}>
        {/* HEADER */}

        <div className={styles.header}>
          <CloseIcon onClose={onClose} />
          <div className={styles.title}>สแกนเพื่อชำระเงิน</div>
          <div className={styles.topSpacer} />
        </div>

        {/* QR */}

        <div className={styles.qrCard}>
          <img
            className={styles.qr}
            src="/external/qr_promptpay_demo.png"
            alt="QR PromptPay"
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
    </ModalShell>
  );
}
