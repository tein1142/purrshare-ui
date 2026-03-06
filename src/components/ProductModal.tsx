import styles from "../pages/css/ProductModal.module.css";

export default function ProductModal({ product, onClose, onAddCart }: any) {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* header */}
        <div className={styles.header}>
          <button className={styles.closeBtn} onClick={onClose}>
            ✕
          </button>

          <div className={styles.title}>รายละเอียดสินค้า</div>
        </div>

        {/* image */}
        <div className={styles.productCard}>
          <div className={styles.productImage}>
            <img src={product.img} />
          </div>

          {/* info */}
          <div className={styles.productInfo}>
            <div className={styles.productName}>{product.name}</div>

            <div className={styles.productDesc}>{product.desc}</div>

            <div className={styles.productPrice}>{product.price} THB</div>
          </div>
        </div>

        <div className={styles.metaBox}>
          <div className={styles.metaGrid}>
            <div className={styles.metaCol}>
              <div className={styles.metaItem}>
                <div className={styles.metaLabel}>วันที่ลง</div>
                <div className={styles.metaValue}>22/03/2024</div>
              </div>

              <div className={styles.metaItem}>
                <div className={styles.metaLabel}>ประเภท</div>
                <div className={styles.metaValue}>อาหารและโภชนาการ</div>
              </div>

              <div className={styles.metaItem}>
                <div className={styles.metaLabel}>สภาพ</div>
                <div className={styles.metaValue}>ใหม่</div>
              </div>
            </div>

            <div className={styles.metaCol}>
              <div className={styles.metaItem}>
                <div className={styles.metaLabel}>แบรนด์</div>
                <div className={styles.metaValue}>PawPaw</div>
              </div>

              <div className={styles.metaItem}>
                <div className={styles.metaLabel}>สี</div>
                <div className={styles.metaValue}>ส้ม</div>
              </div>

              <div className={styles.metaItem}>
                <div className={styles.metaLabel}>ส่งจาก</div>
                <div className={styles.metaValue}>ชลบุรี</div>
              </div>
            </div>
          </div>
        </div>

        {/* footer */}

        <div className={styles.sellerSection}>
          <div className={styles.sellerTitle}>ร้านค้า/ผู้ขาย</div>

          <div className={styles.sellerRow}>
            <div className={styles.sellerCard}>
              <div className={styles.sellerAvatar}>
                <img src="https://robohash.org/fafb2830147a924143b9dd45b8250089?set=set4&bgset=&size=400x400" />
              </div>

              <div className={styles.sellerName}>Meow & Co.</div>
              <div className={styles.sellerSub}>รีวิวดีมาก</div>
            </div>

            <div className={styles.sellerCard}>
              <div className={styles.sellerAvatar}>
                <img src="https://robohash.org/76bf070195f6c4772b2c57f5bbd52e6a?set=set4&bgset=&size=400x400" />
              </div>

              <div className={styles.sellerName}>ร้านแมวอ้วน</div>
              <div className={styles.sellerSub}>ตอบไว</div>
            </div>
          </div>
        </div>

        {/* bottom */}
        <div className={styles.bottomBar}>
          <div className={styles.bottomPrice}>{product.price} THB</div>

          <div className={styles.bottomActions}>
            <button className={styles.profileBtn}>โปรไฟล์ผู้ขาย</button>

            <button
              className={styles.cartBtn}
              onClick={() => {
                onClose(); // ปิด ProductModal
                onAddCart(); // เปิด AddCartModal
              }}
            >
              เพิ่มลงตะกร้า
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
