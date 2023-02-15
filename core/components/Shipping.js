import React from "react";

const Shipping = () => {
  return (
    <section class="shipping-info">
      <div class="container">
        <ul>
          {/* Free Shipping */}
          <li>
            <div class="media-icon">
              <i class="lni lni-delivery"></i>
            </div>
            <div class="media-body">
              <h5>Free Shipping</h5>
              <span>On order over $99</span>
            </div>
          </li>
          {/* Money Return */}
          <li>
            <div class="media-icon">
              <i class="lni lni-support"></i>
            </div>
            <div class="media-body">
              <h5>24/7 Support.</h5>
              <span>Live Chat Or Call.</span>
            </div>
          </li>
          {/* Support 24/ */}
          <li>
            <div class="media-icon">
              <i class="lni lni-credit-cards"></i>
            </div>
            <div class="media-body">
              <h5>Online Payment.</h5>
              <span>Secure Payment Services.</span>
            </div>
          </li>
          {/* Safe Payment */}
          <li>
            <div class="media-icon">
              <i class="lni lni-reload"></i>
            </div>
            <div class="media-body">
              <h5>Easy Return.</h5>
              <span>Hassle Free Shopping.</span>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Shipping;
