import styles from "./css/Star.module.css";
import Tabbar from "../components/TabBar";
import infoRichMenu from "../assets/images/Info_Rich_Menu-01.jpg";

export default function Star() {
  return (
    <div className={styles.page}>
      {/* HEADER */}

      <header className={styles.top}>
        {/* <button
          type="button"
          className={styles.logoBtn}
          onClick={() => navigate("/select")}
          aria-label="กลับหน้าหมวดหมู่"
        >
          <img
            className={styles.logoImg}
            src={logo02}
            alt="Purrshare"
          />
        </button> */}
        <div className={styles.topTitle}>อันดับและคุณภาพผู้ขาย</div>
      </header>

      {/* CONTENT */}

      <div className={styles.content}>
        {/* TOP SELLER */}

        <div className={styles.card}>
          <div className={styles.cardPad}>
            <div className={styles.h1}>ผู้ขายยอดนิยม 3 อันดับประจำเดือน</div>

            <div className={styles.subHead}>Top 1</div>

            <div className={styles.top3}>
              <div className={`${styles.podium} ${styles.rank2}`}>
                <div className={styles.starBadge}>★</div>

                <div className={styles.ava}>
                  <img src="/external/unsplash_1524504388940-b1c1722653e1.jpg" />
                </div>

                <div className={styles.pName}>Mimi Shop</div>
                <div className={styles.pScore}>ยอดขาย 18,200</div>
              </div>

              <div className={`${styles.podium} ${styles.rank1}`}>
                <div className={styles.starBadge}>★</div>

                <div className={styles.ava}>
                  <img src="/external/unsplash_1535713875002-d1d0cf377fde.jpg" />
                </div>

                <div className={styles.pName}>Purr Premium</div>
                <div className={styles.pScore}>ยอดขาย 25,900</div>
              </div>

              <div className={`${styles.podium} ${styles.rank3}`}>
                <div className={styles.starBadge}>★</div>

                <div className={styles.ava}>
                  <img src="/external/unsplash_1544723795-3fb6469f5b39.jpg" />
                </div>

                <div className={styles.pName}>Catty Corner</div>
                <div className={styles.pScore}>ยอดขาย 14,650</div>
              </div>
            </div>

            {/* FEATURE PRODUCT */}

            {/* <div className={styles.feature}>
              <div className={styles.featImg}>
                <img src="/external/unsplash_1543852786-1cf6624b9987.jpg?w=600" />
              </div>

              <div className={styles.featTxt}>
                <div className={styles.featTitle}>Name 000111</div>

                <div className={styles.featSub}>Lorem ipsum dolor sit amet</div>

                <div className={styles.featPrice}>200 THB</div>
              </div>
            </div> */}
          </div>
        </div>

        {/* REVIEW */}

        <div className={styles.sec}>
          <div className={styles.secHead}>
            <div className={styles.secTitle}>รีวิวชื่อผู้ขาย</div>
            <div className={styles.secLink}>ดูทั้งหมด ›</div>
          </div>

          <div className={styles.reviewCard}>
            <div className={styles.reviewRow}>
              <div className={styles.reviewLeft}>
                <img
                  className={styles.rDot}
                  src="/external/randomuser_women_44.jpg"
                />

                <div>
                  <div className={styles.rName}>มินนี่</div>
                  <div className={styles.rSub}>ประทับใจมาก</div>
                </div>
              </div>

              <div className={styles.stars}>★★★★☆</div>
            </div>

            <div className={styles.reviewRow}>
              <div className={styles.reviewLeft}>
                <img
                  className={styles.rDot}
                  src="/external/randomuser_men_32.jpg"
                />

                <div>
                  <div className={styles.rName}>ก้องภพ</div>
                  <div className={styles.rSub}>แพ็คดี ส่งไว</div>
                </div>
              </div>

              <div className={styles.stars}>★★★★★</div>
            </div>

            <div className={styles.reviewRow}>
              <div className={styles.reviewLeft}>
                <img
                  className={styles.rDot}
                  src="/external/randomuser_women_68.jpg"
                />

                <div>
                  <div className={styles.rName}>พลอยใส</div>
                  <div className={styles.rSub}>คุณภาพดี</div>
                </div>
              </div>

              <div className={styles.stars}>★★★★★</div>
            </div>
          </div>
        </div>

        {/* GUIDE */}

        <div className={styles.sec}>
          <div className={styles.secHead}>
            <div className={styles.secTitle}>วิธีทำคะแนนของสมาชิกในระบบ</div>

            <div className={styles.secLink}>ดูทั้งหมด ›</div>
          </div>

          <div className={styles.guideCard}>
            <div className={styles.guideBox}>กราฟที่ “แสดงรายงาน”</div>

            <button className={styles.guideBtn}>แสดงรายงาน</button>

            <div className={styles.guideNote}>
              บันทึก: คะแนนจะอัปเดตตามยอดขายและการรีวิวของลูกค้า
              ระบบจะคำนวณเป็นรายเดือน โดยอิงจากคำสั่งซื้อที่ชำระเงินสำเร็จ
            </div>
          </div>
        </div>

        {/* INFO IMAGE */}

        <div className={styles.infoSection}>
          <img src={infoRichMenu} alt="ข้อมูลเมนู" />
        </div>
      </div>

      <Tabbar />
    </div>
  );
}
