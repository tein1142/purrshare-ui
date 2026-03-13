import styles from "../pages/css/Sell.module.css";
import CloseIcon from "./CloseButton";
import ModalShell from "./ModalShell";

type Props = {
  open: boolean;
  onClose: () => void;
  onCycleImage: () => void;
  imageSrc: string;
  formName: string;
  formDesc: string;
  formProvince: string;
  formContact: string;
  formUsed: string;
  formAge: string;
  formRemain: string;
  onChangeName: (value: string) => void;
  onChangeDesc: (value: string) => void;
  onChangeProvince: (value: string) => void;
  onChangeContact: (value: string) => void;
  onChangeUsed: (value: string) => void;
  onChangeAge: (value: string) => void;
  onChangeRemain: (value: string) => void;
  onConfirm: () => void;
};

export default function SellFormModal({
  open,
  onClose,
  onCycleImage,
  imageSrc,
  formName,
  formDesc,
  formProvince,
  formContact,
  formUsed,
  formAge,
  formRemain,
  onChangeName,
  onChangeDesc,
  onChangeProvince,
  onChangeContact,
  onChangeUsed,
  onChangeAge,
  onChangeRemain,
  onConfirm,
}: Readonly<Props>) {
  return (
    <ModalShell open={open} onClose={onClose} panelClassName={styles.sheet}>
      <div className={styles.sheetHead}>
        <div className={styles.sheetTitle}>รายละเอียดสินค้า</div>
        <CloseIcon onClose={onClose} />
      </div>
      <div className={styles.sheetBody}>
        <div className={styles.previewRow}>
          <button type="button" className={styles.previewImgBtnWide} onClick={onCycleImage}>
            <img src={imageSrc} alt="preview" />
          </button>
          <div className={styles.previewSide}>
            <div className={styles.hint}>แตะรูปเพื่อเปลี่ยนตัวอย่าง</div>
            <div className={styles.hint}>ตัวอย่างข้อมูล (Mock) ปรับได้ภายหลัง</div>
          </div>
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="fName">ชื่อสินค้า</label>
          <input id="fName" className={styles.input} value={formName} onChange={(e) => onChangeName(e.target.value)} />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="fDesc">รายละเอียดสินค้า</label>
          <textarea id="fDesc" className={`${styles.input} ${styles.textarea}`} value={formDesc} onChange={(e) => onChangeDesc(e.target.value)} />
        </div>

        <div className={styles.row2}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="fProvince">จังหวัด</label>
            <input id="fProvince" className={styles.input} value={formProvince} onChange={(e) => onChangeProvince(e.target.value)} />
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="fContact">เบอร์ติดต่อ</label>
            <input id="fContact" className={styles.input} value={formContact} onChange={(e) => onChangeContact(e.target.value)} />
          </div>
        </div>

        <div className={styles.row2}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="fUsed">วันเปิดใช้</label>
            <input id="fUsed" className={styles.input} value={formUsed} onChange={(e) => onChangeUsed(e.target.value)} />
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="fAge">รับหมดอายุ</label>
            <input id="fAge" className={styles.input} value={formAge} onChange={(e) => onChangeAge(e.target.value)} />
          </div>
        </div>

        <div className={styles.fieldNoMargin}>
          <label className={styles.label} htmlFor="fRemain">ปริมาณคงเหลือ</label>
          <input id="fRemain" className={styles.input} value={formRemain} onChange={(e) => onChangeRemain(e.target.value)} />
        </div>
      </div>

      <div className={styles.sheetActions}>
        <button type="button" className={styles.ghostBtn} onClick={onClose}>
          ยกเลิก
        </button>
        <button type="button" className={styles.primaryBtn} onClick={onConfirm}>
          ลงขาย
        </button>
      </div>
    </ModalShell>
  );
}
