import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logo02 from "../assets/images/LOGO-02.png";
import styles from "./HeaderNavMenu.module.css";

const menuItems = [
  { label: "เมนู", path: "/" },
  { label: "ตลาดเมี๊ยว", path: "/select" },
  { label: "เปิดแผง", path: "/sell" },
  { label: "ปันใจส่งต่อ", path: "/donate" },
];

type Props = {
  wrapClassName?: string;
  triggerClassName?: string;
  iconClassName?: string;
  panelClassName?: string;
  itemClassName?: string;
  backdropClassName?: string;
};

function joinClass(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function HeaderNavMenu({
  wrapClassName,
  triggerClassName,
  iconClassName,
  panelClassName,
  itemClassName,
  backdropClassName,
}: Readonly<Props>) {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) {
      return undefined;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    globalThis.addEventListener("keydown", onKeyDown);

    return () => {
      globalThis.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  function handleNavigate(path: string) {
    setMenuOpen(false);
    navigate(path);
  }

  return (
    <>
      {menuOpen && (
        <button
          type="button"
          className={joinClass(styles.backdrop, backdropClassName)}
          aria-label="Close navigation menu"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <div className={joinClass(styles.wrap, wrapClassName)}>
        <button
          type="button"
          className={joinClass(
            styles.trigger,
            menuOpen ? styles.triggerOpen : undefined,
            triggerClassName,
          )}
          aria-label="Open navigation menu"
          aria-expanded={menuOpen}
          aria-haspopup="menu"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <img src={logo02} alt="Menu" className={joinClass(styles.icon, iconClassName)} />
        </button>

        {menuOpen && (
          <div
            className={joinClass(styles.panel, styles.panelOpen, panelClassName)}
            role="menu"
            aria-label="Navigation menu"
          >
            {menuItems.map((item) => {
              const isCurrent = location.pathname === item.path;

              return (
                <button
                  key={item.path}
                  type="button"
                  className={joinClass(
                    styles.item,
                    isCurrent ? styles.itemCurrent : undefined,
                    itemClassName,
                  )}
                  role="menuitem"
                  aria-current={isCurrent ? "page" : undefined}
                  disabled={isCurrent}
                  onClick={() => handleNavigate(item.path)}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
