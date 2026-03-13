import type { ReactNode } from "react";
import styles from "../pages/css/ModalShell.module.css";

type Props = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  panelClassName?: string;
};

export default function ModalShell({
  open,
  onClose,
  children,
  panelClassName,
}: Readonly<Props>) {
  if (!open) return null;

  return (
    <div className={styles.overlay}>
      <button
        type="button"
        className={styles.backdrop}
        onClick={onClose}
        aria-label="ปิดหน้าต่าง"
      />
      <div className={`${styles.panel} ${panelClassName || ""}`.trim()}>{children}</div>
    </div>
  );
}
