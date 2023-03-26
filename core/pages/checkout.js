import React, { useState } from "react";
import { useEffect } from "react";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { ACTIONS, useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { API_URL } from "@/config/urls";
import cookie from "js-cookie";

const checkout = () => {
  const { loading, setLoading } = useAuth();

  const { products, dispatch } = useCart();

  const [coupon, setCoupon] = useState("");

  const [error, setError] = useState(null);

  const router = useRouter();

  const totalPrice = products.reduce(
    (prevValue, currentValue) =>
      prevValue + currentValue.price * currentValue.quantity,
    0
  );

  let token = undefined;
  // geting token from local storage
  if (typeof window !== "undefined") {
    token = localStorage.getItem("authToken");
  }

  const submitCart = async () => {
    setLoading(true);

    const req = await fetch(`${API_URL}/orders/`, {
      method: "POST",
      body: JSON.stringify({ products, coupon }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookie.get("authToken")}`,
      },
    });

    const res = await req.json();

    if (req.ok) {
      setLoading(false);
      setError(null);
      router.push("/shipping-address");
    } else {
      setLoading(false);
      setError(
        res.message ||
          res.errors ||
          res.coupon ||
          "An error occured please try again"
      );
    }
  };

  useEffect(() => {
    if (!cookie.get("authToken")) {
      router.push("/login");
    }
  }, []);

  return (
    <>
      <Head>
        <link
          href="https://cdn.lineicons.com/4.0/lineicons.css"
          rel="stylesheet"
        />
      </Head>
      {/* start preloader */}
      {loading && (
        <div class="preloader">
          <div class="preloader-inner">
            <div class="preloader-icon">
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      )}
      {/* end preloader */}
      <section class="h-100" style={{ backgroundColor: "#eee" }}>
        <div class="container h-100 py-5">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-10">
              <div class="d-flex justify-content-between align-items-center mb-4">
                <h3 class="fw-normal mb-0 text-black">Shopping Cart</h3>
                {error && <p class="mb-5 link-danger">{error}</p>}
                <div>
                  <p class="mb-0">
                    {products.length} item{products.length > 1 && "s"}
                  </p>
                </div>
              </div>

              {products.map((product) => (
                <div key={product.id} class="card rounded-3 mb-4">
                  <div class="card-body p-4">
                    <div class="row d-flex justify-content-between align-items-center">
                      <div class="col-md-2 col-lg-2 col-xl-2">
                        <Image
                          src={product.image}
                          class="img-fluid rounded-3"
                          alt={product.name}
                          height={80}
                          width={100}
                        />
                      </div>
                      <div class="col-md-3 col-lg-3 col-xl-3">
                        <p class="lead fw-normal mb-2">{product.name}</p>
                        <p>
                          <span class="text-muted">price: </span> ₦
                          {product.price}
                        </p>
                      </div>
                      <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
                        <button
                          class="btn btn-link px-2"
                          onClick={() =>
                            dispatch({
                              type: ACTIONS.REMOVE_QUANTITY,
                              payload: product,
                            })
                          }
                        >
                          <i class="lni lni-minus"></i>
                        </button>

                        <input
                          id="form1"
                          onChange={(e) =>
                            dispatch({
                              type: ACTIONS.EDIT_QUANTITY,
                              payload: product,
                              value: e.target.value,
                            })
                          }
                          min="0"
                          name="quantity"
                          value={product.quantity}
                          type="number"
                          class="form-control form-control-sm"
                        />

                        <button
                          class="btn btn-link px-2"
                          onClick={() =>
                            dispatch({
                              type: ACTIONS.ADD_QUANTITY,
                              payload: product,
                            })
                          }
                        >
                          <i class="lni lni-plus"></i>
                        </button>
                      </div>
                      <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                        <h5 class="mb-0">
                          ₦{product.price * product.quantity}
                        </h5>
                      </div>
                      <div
                        class="col-md-1 col-lg-1 col-xl-1 text-end"
                        onClick={() =>
                          dispatch({
                            type: ACTIONS.REMOVE_FROM_CART,
                            payload: product,
                          })
                        }
                      >
                        <a href="#!" class="text-danger">
                          <i class="lni lni-trash-can"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {products.length > 0 && (
                <div class="card">
                  <div class="card-body">
                    <h5>
                      Total: <span>₦{totalPrice}</span>
                    </h5>
                  </div>
                </div>
              )}

              <div class="card mb-4">
                <div class="card-body p-4 d-flex flex-row">
                  <div class="form-outline flex-fill">
                    <input
                      type="text"
                      id="form1"
                      value={coupon}
                      placeholder="--optional--"
                      class="form-control form-control-lg"
                      onChange={(e) => setCoupon(e.target.value)}
                    />
                    <label class="form-label" htmlFor="form1">
                      Enter Coupon code
                    </label>
                  </div>
                </div>
              </div>

              <div class="card">
                <div
                  class="card-body"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Link
                    href="/"
                    type="button"
                    class="btn btn-primary btn-block btn-sm"
                  >
                    Back To Shop
                  </Link>
                  <button
                    type="button"
                    class="btn btn-success btn-block btn-sm "
                    onClick={submitCart}
                  >
                    Proceed
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default checkout;
