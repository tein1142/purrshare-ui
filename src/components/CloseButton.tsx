import styles from "../pages/css/Button.module.css";

type Props = {
  size?: number;
  onClose?: () => void;
};

export default function CloseIcon({ size = 20, onClose }: Readonly<Props>) {
  return (
    <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="ปิด">
      <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M6 6l12 12M18 6L6 18"
          stroke="black"
          strokeWidth="3.2"
          strokeLinecap="round"
        />
      </svg>
    </button>
  );
}
