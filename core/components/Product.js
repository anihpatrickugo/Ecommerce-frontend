import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ACTIONS, useCart } from "@/contexts/CartContext";

const Products = ({ product }) => {
  const { products, dispatch } = useCart();

  const isInCart = products.find((item) => item.id == product.id);

  return (
    <div className="col-lg-3 col-md-6 col-12">
      {/* start single product */}
      <div className="single-product">
        <div className="product-image">
          <Image
            src={product.image}
            alt={product.name}
            width={150}
            height={200}
            style={{ width: "auto", height: "auto" }}
            priority={true}
          />
          {product.discount && (
            <span class="sale-tag">-{product.discount}%</span>
          )}

          {!isInCart ? (
            <div className="button">
              <a
                onClick={() =>
                  dispatch({ type: ACTIONS.ADD_TO_CART, payload: product })
                }
                class="btn"
              >
                <i className="lni lni-cart"></i> Add to Cart
              </a>
            </div>
          ) : (
            <div className="button">
              <a
                onClick={() =>
                  dispatch({ type: ACTIONS.REMOVE_FROM_CART, payload: product })
                }
                class="btn"
              >
                <i className="lni lni-layers"></i> Remove From Cart
              </a>
            </div>
          )}
        </div>
        <div className="product-info">
          {/* <span className="category">electronics</span> */}
          <h4 className="title">
            <Link href={`product/${product.id}`}>{product.name}</Link>
          </h4>
          <div className="price">
            <span>₦{product.price}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
