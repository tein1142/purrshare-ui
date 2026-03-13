import styles from "../pages/css/Sell.module.css";
import CloseIcon from "./CloseButton";
import ModalShell from "./ModalShell";

type Props = {
  open: boolean;
  onClose: () => void;
  onCycleImage: () => void;
  imageSrc: string;
  quickName: string;
  quickPrice: string;
  onChangeName: (value: string) => void;
  onChangePrice: (value: string) => void;
  onOpenForm: () => void;
  onSubmit: () => void;
  notice: string;
};

export default function SellQuickModal({
  open,
  onClose,
  onCycleImage,
  imageSrc,
  quickName,
  quickPrice,
  onChangeName,
  onChangePrice,
  onOpenForm,
  onSubmit,
  notice,
}: Readonly<Props>) {
  return (
    <ModalShell open={open} onClose={onClose} panelClassName={styles.sheet}>
      <div className={styles.sheetHead}>
        <div className={styles.sheetTitle}>เพิ่มสินค้าใหม่</div>
        <CloseIcon onClose={onClose} />
      </div>
      <div className={styles.sheetBody}>
        <div className={styles.previewRow}>
          <button type="button" className={styles.previewImgBtn} onClick={onCycleImage}>
            <img src={imageSrc} alt="preview" />
          </button>
          <div className={styles.previewSide}>
            <div className={styles.hint}>แตะรูปเพื่อเปลี่ยนตัวอย่าง</div>
            <button type="button" className={styles.miniBtn} onClick={onOpenForm}>
              เพิ่มรายละเอียด
            </button>
          </div>
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="quickName">ชื่อสินค้า</label>
          <input
            id="quickName"
            className={styles.input}
            value={quickName}
            onChange={(e) => onChangeName(e.target.value)}
          />
        </div>

        <div className={styles.row2}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="quickPrice">ราคา</label>
            <input
              id="quickPrice"
              className={styles.input}
              value={quickPrice}
              onChange={(e) => onChangePrice(e.target.value)}
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="quickStatus">สถานะ</label>
            <input id="quickStatus" className={styles.input} value="กำลังขาย" readOnly />
          </div>
        </div>

        <button type="button" className={styles.primaryBtnFull} onClick={onSubmit}>
          ลงขาย
        </button>

        {notice && <div className={styles.notice}>{notice}</div>}
      </div>
    </ModalShell>
  );
}
