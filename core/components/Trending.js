import React from "react";
import Product from "./Product";

const Trending = ({ products }) => {
  return (
    <section class="trending-product section">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="section-title">
              <h2>Trending Product</h2>
              <p>
                Welcome to the no.1 store where you can shop for anykind of
                accesories, gadgets or electronics.
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          {products.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Trending;
