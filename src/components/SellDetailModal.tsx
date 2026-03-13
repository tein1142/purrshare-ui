import styles from "../pages/css/Sell.module.css";
import CloseIcon from "./CloseButton";
import ModalShell from "./ModalShell";

type SellItem = {
  name: string;
  img: string;
  desc: string;
  price: number;
  province: string;
  contact: string;
  used: string;
  age: string;
  remain: string;
};

type Props = {
  open: boolean;
  item: SellItem | null;
  onClose: () => void;
};

export default function SellDetailModal({ open, item, onClose }: Readonly<Props>) {
  if (!item) return null;

  return (
    <ModalShell open={open} onClose={onClose} panelClassName={styles.sheet}>
      <div className={styles.sheetHead}>
        <div className={styles.sheetTitle}>รายละเอียดสินค้า</div>
        <CloseIcon onClose={onClose} />
      </div>
      <div className={styles.sheetBody}>
        <div className={styles.previewRow}>
          <div className={styles.previewImgStatic}>
            <img src={item.img} alt={item.name} />
          </div>
          <div className={styles.previewSide}>
            <div className={styles.detailName}>{item.name}</div>
            <div className={styles.hint}>{item.desc}</div>
            <div className={styles.price}>{item.price.toLocaleString()} THB</div>
          </div>
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="dProvince">จังหวัด</label>
          <input id="dProvince" className={styles.input} value={item.province} readOnly />
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="dContact">เบอร์ติดต่อ</label>
          <input id="dContact" className={styles.input} value={item.contact} readOnly />
        </div>
        <div className={styles.row2}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="dUsed">วันเปิดใช้</label>
            <input id="dUsed" className={styles.input} value={item.used} readOnly />
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="dAge">รับหมดอายุ</label>
            <input id="dAge" className={styles.input} value={item.age} readOnly />
          </div>
        </div>
        <div className={styles.fieldNoMargin}>
          <label className={styles.label} htmlFor="dRemain">ปริมาณคงเหลือ</label>
          <input id="dRemain" className={styles.input} value={item.remain} readOnly />
        </div>
        <button type="button" className={styles.primaryBtnFull} onClick={onClose}>
          ปิด
        </button>
      </div>
    </ModalShell>
  );
}
