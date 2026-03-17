import TabBar from "../components/TabBar";
import styles from "./css/Cart.module.css";
import PaymentModal from "../components/PaymentModal";
import SuccessModal from "../components/SuccessModal";
import { useState, useEffect } from "react";

interface CartItem {
  id: string;
  name: string;
  price: number;
  img: string;
  qty: number;
}

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [openPayment, setOpenPayment] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);

  useEffect(() => {
    const loadCart = () => {
      try {
        const data = JSON.parse(localStorage.getItem("ps_cart") || "[]");
        setCartItems(data);
      } catch {
        setCartItems([]);
      }
    };
    
    loadCart();
  }, []);

  function updateCart(items: CartItem[]) {
    setCartItems(items);
    localStorage.setItem("ps_cart", JSON.stringify(items));
    globalThis.dispatchEvent(new Event("cart-updated"));
  }

  function increaseQty(index: number) {
    const items = [...cartItems];
    items[index].qty += 1;
    updateCart(items);
  }

  function decreaseQty(index: number) {
    const items = [...cartItems];

    items[index].qty -= 1;

    if (items[index].qty <= 0) {
      items.splice(index, 1);
    }

    updateCart(items);
  }

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const shipping = cartItems.length ? 25 : 0;

  const totalPrice = subtotal + shipping;

  function saveOrder() {
    const order = {
      id: Date.now(),
      items: cartItems,
      total: totalPrice,
      status: "pending",
    };

    const pending = JSON.parse(localStorage.getItem("ps_pending") || "[]");

    pending.unshift(order);

    localStorage.setItem("ps_pending", JSON.stringify(pending));

    localStorage.removeItem("ps_cart");
    globalThis.dispatchEvent(new Event("cart-updated"));

    setCartItems([]);
  }

  return (
    <div className={styles.cartpage}>
      {/* HEADER */}

      <div className={styles.header}>
        <div className={styles.title}>ตะกร้า</div>
      </div>

      {/* CART ITEMS */}

      {cartItems.map((item, index) => (
        <div className={styles.cartItem} key={item.id}>
          <img className={styles.productImg} src={item.img} alt={item.name} />

          <div className={styles.productInfo}>
            <div className={styles.productName}>{item.name}</div>

            <div className={styles.productDesc}>สินค้า</div>

            <div className={styles.bottomRow}>
              <div className={styles.productPrice}>
                {item.price} THB
              </div>

              <div className={styles.qtyBox}>
                <button
                  className={styles.qtyBtn}
                  onClick={() => decreaseQty(index)}
                >
                  -
                </button>

                <div className={styles.qtyNumber}>{item.qty}</div>

                <button
                  className={styles.qtyBtn}
                  onClick={() => increaseQty(index)}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* PAYMENT */}

      <div className={styles.paymentBox}>
        <div className={styles.paymentTitle}>ข้อมูลการชำระเงิน</div>

        <div className={styles.paymentRow}>
          <span className={styles.paymentLabel}>รวมการสั่งซื้อ</span>
          <span className={styles.paymentValue}>{subtotal} THB</span>
        </div>

        <div className={styles.paymentRow}>
          <span className={styles.paymentLabel}>การจัดส่ง</span>
          <span className={styles.paymentValue}>{shipping} THB</span>
        </div>

        <div className={styles.divider}></div>

        <div className={styles.paymentTotal}>
          <span>ยอดชำระเงินทั้งหมด</span>
          <span>{totalPrice} THB</span>
        </div>
      </div>

      {/* CHECKOUT */}

      <div className={styles.checkoutBar}>
        <div className={styles.checkoutPrice}>{totalPrice} THB</div>

        <button
          className={styles.checkoutBtn}
          disabled={!cartItems.length}
          onClick={() => setOpenPayment(true)}
        >
          ชำระเงิน
        </button>
      </div>

      {/* MODALS */}

      <PaymentModal
        open={openPayment}
        onClose={() => setOpenPayment(false)}
        onSuccess={() => {
          saveOrder();
          setOpenSuccess(true);
        }}
      />

      <SuccessModal
        open={openSuccess}
        onClose={() => setOpenSuccess(false)}
      />

      <TabBar />
    </div>
  );
}