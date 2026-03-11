import { useState, useEffect } from "react";
import styles from "../pages/css/EditProfileModal.module.css";
import CloseIcon from "./CloseButton";

type Props = {
  open: boolean;
  profile: any;
  setProfile: (p: any) => void;
  onClose: () => void;
  onSave: () => void;
};

export default function EditProfileModal({
  open,
  profile,
  setProfile,
  onClose,
  onSave,
}: Props) {
  const [tempProfile, setTempProfile] = useState(profile);

  useEffect(() => {
    if (open) {
      setTempProfile(profile);
    }
  }, [open, profile]);

  if (!open) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.sheet}>
        <div className={styles.top}>
          <CloseIcon onClose={onClose} />

          <div className={styles.title}>แก้ไขโปรไฟล์</div>

          <div style={{ width: 40 }} />
        </div>

        <div className={styles.body}>
          <div className={styles.field}>
            <label>ชื่อ-นามสกุล</label>
            <input
              value={tempProfile.name}
              onChange={(e) =>
                setTempProfile({ ...tempProfile, name: e.target.value })
              }
            />
          </div>

          <div className={styles.field}>
            <label>อีเมล</label>
            <input
              value={tempProfile.email}
              onChange={(e) =>
                setTempProfile({ ...tempProfile, email: e.target.value })
              }
            />
          </div>

          <div className={styles.field}>
            <label>เบอร์โทร</label>
            <input
              value={tempProfile.phone}
              onChange={(e) =>
                setTempProfile({ ...tempProfile, phone: e.target.value })
              }
            />
          </div>

          <div className={styles.field}>
            <label>ที่อยู่</label>
            <input
              value={tempProfile.addr}
              onChange={(e) =>
                setTempProfile({ ...tempProfile, addr: e.target.value })
              }
            />
          </div>

          <button
            className={styles.saveBtn}
            onClick={() => {
              setProfile(tempProfile);
              onSave();
            }}
          >
            บันทึก
          </button>
        </div>
      </div>
    </div>
  );
}
