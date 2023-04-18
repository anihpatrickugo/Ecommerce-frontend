import React, { useContext } from "react";
// import Image from "next/image";
import Link from "next/link";
import { ACTIONS, useCart } from "@/contexts/CartContext";

const NavbarCartItems = () => {
  const { products, dispatch } = useCart();

  const totalPrice = products.reduce(
    (prevValue, currentValue) =>
      prevValue + currentValue.price * currentValue.quantity,
    0
  );
  return (
    <div class="navbar-cart">
      <div class="cart-items">
        <a href="javascript:void(0)" class="main-btn">
          <i class="lni lni-cart"></i>
          <span class="total-items">{products.length}</span>
        </a>
        {/* Shopping Item */}
        <div class="shopping-item">
          <div class="dropdown-cart-header">
            <span>
              {products.length} item{products.length > 1 && "s"}
            </span>
          </div>
          <ul class="shopping-list">
            {products.map((product) => (
              <li key={product.id}>
                <a
                  onClick={() =>
                    dispatch({
                      type: ACTIONS.REMOVE_FROM_CART,
                      payload: product,
                    })
                  }
                  class="remove"
                  title="Remove this item"
                >
                  <i class="lni lni-close"></i>
                </a>
                <div class="cart-img-head">
                  <a class="cart-img" href="product-details.html">
                    {/* <Image src={product.image} alt="#" height={80} width={50} /> */}
                    <img
                      src={`http://res.cloudinary.com/dmhxcjyna/${product.image}`}
                    />
                  </a>
                </div>

                <div class="content">
                  <h4>
                    <Link href={`product/${product.id}`}>{product.name}</Link>
                  </h4>
                  <p class="quantity">
                    {product.quantity} x -{" "}
                    <span class="amount">₦{product.price}</span>
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <div class="bottom">
            <div class="total">
              <span>Total</span>
              <span class="total-amount">₦{totalPrice}</span>
            </div>
            {products.length > 0 && (
              <div class="button">
                <Link href="/checkout/" class="btn animate">
                  Veiw Cart
                </Link>
              </div>
            )}
          </div>
        </div>
        {/* End shopping item */}
      </div>
    </div>
  );
};

export default NavbarCartItems;
