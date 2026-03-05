import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import styles from "./css/Select.module.css";

export default function Select() {
  const navigate = useNavigate();

  useEffect(() => {
    const rows = ["fashionRow", "dailyRow", "healthRow"]
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    function attach(row: HTMLElement) {
      const tiles = Array.from(row.querySelectorAll(".tile")) as HTMLElement[];

      function update() {
        const r = row.getBoundingClientRect();
        const cx = r.left + r.width / 2;

        let best: HTMLElement | null = null;
        let bestDist = Infinity;

        tiles.forEach((t) => {
          const b = t.getBoundingClientRect();
          const tcx = b.left + b.width / 2;
          const d = Math.abs(tcx - cx);
          if (d < bestDist) {
            bestDist = d;
            best = t;
          }
        });

        tiles.forEach((t) => {
          t.classList.toggle("is-center", t === best);
        });
      }

      let raf = 0;

      row.addEventListener(
        "scroll",
        () => {
          cancelAnimationFrame(raf);
          raf = requestAnimationFrame(update);
        },
        { passive: true }
      );

      window.addEventListener("resize", update);
      update();
    }

    rows.forEach((r) => attach(r));
  }, []);

  return (
    <div className={styles.selectPage}>
      <div className={styles.app}>
        <header className={styles.top}>
          <div className={styles.searchRow}>
            <div className={styles.brandMark}>
              <div
                className={styles.brandLink}
                onClick={() => navigate("/")}
              >
                <img src="https://img5.pic.in.th/file/secure-sv1/LOGO-0383f8dd99c535b987.png" />
              </div>
            </div>

            <div className={styles.searchBox}>
              <input placeholder="ค้นหา..." />
            </div>

            {/* <button className={styles.actionBtn}>EN</button> */}
          </div>

          <div className={styles.sectionTitle}>หมวดหมู่สินค้า</div>

          <div className={styles.quickCats}>
            <div className={styles.quickCat} onClick={() => navigate("/products?cat=food")}>
              <div className={styles.quickIco}>
                <img src="https://img5.pic.in.th/file/secure-sv1/icon-08.png" />
              </div>
              <span>อาหาร<br />และโภชนาการ</span>
            </div>

            <div className={styles.quickCat} onClick={() => navigate("/products?cat=litter")}>
              <div className={styles.quickIco}>
                <img src="https://img5.pic.in.th/file/secure-sv1/icon-09415f32d6faf6a906.png" />
              </div>
              <span>ห้องน้ำ<br />ทรายแมว</span>
            </div>

            <div className={styles.quickCat} onClick={() => navigate("/products?cat=daily")}>
              <div className={styles.quickIco}>
                <img src="https://img5.pic.in.th/file/secure-sv1/icon-107aa0b07e7612da66.png" />
              </div>
              <span>ของใช้<br />ประจำวัน</span>
            </div>

            <div className={styles.quickCat} onClick={() => navigate("/products?cat=furniture")}>
              <div className={styles.quickIco}>
                <img src="https://img2.pic.in.th/icon-11.png" />
              </div>
              <span>ที่นอน<br />เฟอร์นิเจอร์</span>
            </div>

            <div className={styles.quickCat} onClick={() => navigate("/products?cat=toys")}>
              <div className={styles.quickIco}>
                <img src="https://img5.pic.in.th/file/secure-sv1/icon-12b9ced998f5e338f6.png" />
              </div>
              <span>ของเล่น</span>
            </div>
          </div>

          <div className={styles.bigButtons}>
            <div className={styles.bigBtn} onClick={() => navigate("/products?cat=new")}>
              <div className={styles.bigIco}>
                <img src="https://img2.pic.in.th/icon-13.png" />
              </div>
              <div className={styles.label}>ของใหม่ล่าสุด</div>
            </div>

            <div className={styles.bigBtn} onClick={() => navigate("/products?cat=popular")}>
              <div className={styles.bigIco}>
                <img src="https://img5.pic.in.th/file/secure-sv1/icon-14.png" />
              </div>
              <div className={styles.label}>ยอดนิยม</div>
            </div>
          </div>
        </header>

        <main className={styles.content}>
          <div className={styles.h1center}>แบ่งหมวดหมู่ตามไลฟ์สไตล์</div>

          <div className={styles.groupTitle}>แฟชั่น</div>

          <section className={styles.carousel}>
            <div className={styles.row} id="fashionRow">

              <div className={`${styles.tile} tile`} onClick={() => navigate("/products?cat=collar")}>
                <div className={styles.tileImg}>
                  <img src="https://images.unsplash.com/photo-1518791841217-8f162f1e1131" />
                </div>
                <div className={styles.name}>ปลอกคอ</div>
              </div>

              <div className={`${styles.tile} tile`} onClick={() => navigate("/products?cat=leash")}>
                <div className={styles.tileImg}>
                  <img src="https://images.unsplash.com/photo-1543852786-1cf6624b9987" />
                </div>
                <div className={styles.name}>สายจูง</div>
              </div>

              <div className={`${styles.tile} tile`} onClick={() => navigate("/products?cat=outfit")}>
                <div className={styles.tileImg}>
                  <img src="https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13" />
                </div>
                <div className={styles.name}>ชุดน่ารัก</div>
              </div>

              <div className={`${styles.tile} tile`} onClick={() => navigate("/products?cat=bow")}>
                <div className={styles.tileImg}>
                  <img src="https://images.unsplash.com/photo-1592194996308-7b43878e84a6" />
                </div>
                <div className={styles.name}>โบว์</div>
              </div>

              <div className={`${styles.tile} tile`} onClick={() => navigate("/products?cat=tag")}>
                <div className={styles.tileImg}>
                  <img src="https://images.unsplash.com/photo-1519052537078-e6302a4968d4" />
                </div>
                <div className={styles.name}>ป้ายชื่อ</div>
              </div>

              <div className={`${styles.tile} tile`} onClick={() => navigate("/products?cat=sweater")}>
                <div className={styles.tileImg}>
                  <img src="https://images.unsplash.com/photo-1503431128871-cd250803fa41" />
                </div>
                <div className={styles.name}>เสื้อกันหนาว</div>
              </div>

              <div className={`${styles.tile} tile`} onClick={() => navigate("/products?cat=hat")}>
                <div className={styles.tileImg}>
                  <img src="https://images.unsplash.com/photo-1532386236358-a33d8a9434e3" />
                </div>
                <div className={styles.name}>หมวก</div>
              </div>

            </div>
          </section>

          <div className={styles.groupTitle}>ชีวิตประจำวัน</div>

          <section className={styles.carousel}>
            <div className={styles.row} id="dailyRow">

              <div className={`${styles.tile} tile`}>
                <div className={styles.tileImg}>
                  <img src="https://images.unsplash.com/photo-1518791841217-8f162f1e1131" />
                </div>
                <div className={styles.name}>ของเล่น</div>
              </div>

              <div className={`${styles.tile} tile`}>
                <div className={styles.tileImg}>
                  <img src="https://images.unsplash.com/photo-1543852786-1cf6624b9987" />
                </div>
                <div className={styles.name}>ชามอาหาร</div>
              </div>

              <div className={`${styles.tile} tile`}>
                <div className={styles.tileImg}>
                  <img src="https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13" />
                </div>
                <div className={styles.name}>น้ำพุแมว</div>
              </div>

              <div className={`${styles.tile} tile`}>
                <div className={styles.tileImg}>
                  <img src="https://images.unsplash.com/photo-1592194996308-7b43878e84a6" />
                </div>
                <div className={styles.name}>ที่นอน</div>
              </div>

              <div className={`${styles.tile} tile`}>
                <div className={styles.tileImg}>
                  <img src="https://images.unsplash.com/photo-1519052537078-e6302a4968d4" />
                </div>
                <div className={styles.name}>คอนโดแมว</div>
              </div>

              <div className={`${styles.tile} tile`}>
                <div className={styles.tileImg}>
                  <img src="https://images.unsplash.com/photo-1503431128871-cd250803fa41" />
                </div>
                <div className={styles.name}>กรง/กระเป๋า</div>
              </div>

              <div className={`${styles.tile} tile`}>
                <div className={styles.tileImg}>
                  <img src="https://images.unsplash.com/photo-1532386236358-a33d8a9434e3" />
                </div>
                <div className={styles.name}>แผ่นรอง</div>
              </div>

            </div>
          </section>

          <div className={styles.groupTitle}>ดูแลสุขภาพ</div>

          <section className={styles.carousel}>
            <div className={styles.row} id="healthRow">

              <div className={`${styles.tile} tile`}>
                <div className={styles.tileImg}>
                  <img src="https://images.unsplash.com/photo-1518791841217-8f162f1e1131" />
                </div>
                <div className={styles.name}>วิตามิน</div>
              </div>

              <div className={`${styles.tile} tile`}>
                <div className={styles.tileImg}>
                  <img src="https://images.unsplash.com/photo-1543852786-1cf6624b9987" />
                </div>
                <div className={styles.name}>อาหารเฉพาะทาง</div>
              </div>

              <div className={`${styles.tile} tile`}>
                <div className={styles.tileImg}>
                  <img src="https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13" />
                </div>
                <div className={styles.name}>ดูแลช่องปาก</div>
              </div>

              <div className={`${styles.tile} tile`}>
                <div className={styles.tileImg}>
                  <img src="https://images.unsplash.com/photo-1592194996308-7b43878e84a6" />
                </div>
                <div className={styles.name}>แชมพู</div>
              </div>

              <div className={`${styles.tile} tile`}>
                <div className={styles.tileImg}>
                  <img src="https://images.unsplash.com/photo-1519052537078-e6302a4968d4" />
                </div>
                <div className={styles.name}>บำรุงขน</div>
              </div>

              <div className={`${styles.tile} tile`}>
                <div className={styles.tileImg}>
                  <img src="https://images.unsplash.com/photo-1503431128871-cd250803fa41" />
                </div>
                <div className={styles.name}>ป้องกันเห็บหมัด</div>
              </div>

              <div className={`${styles.tile} tile`}>
                <div className={styles.tileImg}>
                  <img src="https://images.unsplash.com/photo-1532386236358-a33d8a9434e3" />
                </div>
                <div className={styles.name}>อุปกรณ์ดูแล</div>
              </div>

            </div>
          </section>
        </main>

        <nav className={styles.tabbar}>
          <div className={`${styles.tab} ${styles.active}`} onClick={() => navigate("/")}>
            <img className={styles.tabIconImg} src="https://img5.pic.in.th/file/secure-sv1/icon-168f8d5a7adad294f0.png" />
          </div>

          <div className={styles.tab} onClick={() => navigate("/star")}>
            <img className={styles.tabIconImg} src="https://img5.pic.in.th/file/secure-sv1/icon-17.png" />
          </div>

          <div className={styles.tab} onClick={() => navigate("/cart")}>
            <img className={styles.tabIconImg} src="https://img5.pic.in.th/file/secure-sv1/icon-1507d739c217dd05c2.png" />
          </div>

          <div className={styles.tab} onClick={() => navigate("/profile")}>
            <img className={styles.tabIconImg} src="https://img5.pic.in.th/file/secure-sv1/icon-18.png" />
          </div>
        </nav>
      </div>
    </div>
  );
}
