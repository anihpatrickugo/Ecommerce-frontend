import React from "react";
import Image from "next/image";
import Link from "next/link";
Link;

const Products = () => {
  return (
    <div className="col-lg-3 col-md-6 col-12">
      {/* start single product */}
      <div className="single-product">
        <div className="product-image">
          <Image src="/product-3.jpg" alt="#" width={150} height={200} />
          <div className="button">
            <Link href="/product" class="btn">
              <i className="lni lni-cart"></i> Add to Cart
            </Link>
          </div>
        </div>
        <div className="product-info">
          <span className="category">Speaker</span>
          <h4 className="title">
            <Link href="/product">Mini Bluetooth Speaker</Link>
          </h4>
          <ul className="review">
            <li>
              <i className="lni lni-star-filled"></i>
            </li>
            <li>
              <i className="lni lni-star-filled"></i>
            </li>
            <li>
              <i className="lni lni-star-filled"></i>
            </li>
            <li>
              <i className="lni lni-star-filled"></i>
            </li>
            <li>
              <i className="lni lni-star"></i>
            </li>
            <li>
              <span>4.0 Review(s)</span>
            </li>
          </ul>
          <div className="price">
            <span>$70.00</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
