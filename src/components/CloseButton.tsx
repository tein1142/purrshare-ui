import styles from "../pages/css/Button.module.css";

type Props = {
  size?: number;
  onClose?: () => void;
};

export default function CloseIcon({ size = 20, onClose }: Props) {
  return (
    <button className={styles.closeBtn} onClick={onClose}>
      <svg width={size} height="18" viewBox="0 0 24 24">
        <path
          d="M6 6L18 18M18 6L6 18"
          stroke="black"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    </button>
  );
}
