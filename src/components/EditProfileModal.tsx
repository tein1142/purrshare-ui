import { useState } from "react";
import styles from "../pages/css/EditProfileModal.module.css";
import CloseIcon from "./CloseButton";
import ModalShell from "./ModalShell";

interface ProfileData {
  name: string;
  email: string;
  phone: string;
  addr: string;
  since: string;
}

type Props = {
  open: boolean;
  profile: ProfileData;
  setProfile: (p: ProfileData) => void;
  onClose: () => void;
  onSave: (updated: ProfileData) => void;
};

export default function EditProfileModal({
  open,
  profile,
  setProfile,
  onClose,
  onSave,
}: Readonly<Props>) {
  const [tempProfile, setTempProfile] = useState<ProfileData>(profile);

  if (!open) return null;

  return (
    <ModalShell open={open} onClose={onClose} panelClassName={styles.sheet}>
        <div className={styles.top}>
          <CloseIcon onClose={onClose} />

          <div className={styles.title}>แก้ไขโปรไฟล์</div>

          <div style={{ width: 40 }} />
        </div>

        <div className={styles.body}>
          <div className={styles.field}>
            <label htmlFor="profileName">ชื่อ-นามสกุล</label>
            <input
              id="profileName"
              value={tempProfile.name}
              onChange={(e) =>
                setTempProfile({ ...tempProfile, name: e.target.value })
              }
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="profileEmail">อีเมล</label>
            <input
              id="profileEmail"
              value={tempProfile.email}
              onChange={(e) =>
                setTempProfile({ ...tempProfile, email: e.target.value })
              }
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="profilePhone">เบอร์โทร</label>
            <input
              id="profilePhone"
              value={tempProfile.phone}
              onChange={(e) =>
                setTempProfile({ ...tempProfile, phone: e.target.value })
              }
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="profileAddr">ที่อยู่</label>
            <input
              id="profileAddr"
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
              onSave(tempProfile);
            }}
          >
            บันทึก
          </button>
        </div>
    </ModalShell>
  );
}
