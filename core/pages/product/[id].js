import React from "react";
import Head from "next/head";
import Image from "next/image";
import MainLayout from "@/layouts/MainLayout";
import { ACTIONS, useCart } from "@/contexts/CartContext";
import { API_URL } from "@/config/urls";

export const getStaticPaths = async () => {
  const res = await fetch(`${API_URL}/products/`);
  const data = await res.json();

  return {
    paths: data.map((product) => ({ params: { id: product.id.toString() } })),
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params }) => {
  const res = await fetch(`${API_URL}/products/${params.id}/`);
  const data = await res.json();

  return {
    props: {
      product: data,
    },
    revalidate: 5,
  };
};

const Index = ({ product }) => {
  const { products, dispatch } = useCart();
  const isInCart = products.find((item) => item.id == product.id);
  // const item = products.filter((item) => (item.id = product.id), 0);

  return (
    <>
      <Head>
        <title>{product.name}</title>
        <meta name="description" content={product.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href={product.image} />
      </Head>

      <MainLayout>
        {/* Start Item Details */}
        <section class="item-details section">
          <div class="container">
            <div class="top-area">
              <div class="row align-items-center">
                <div class="col-lg-6 col-md-12 col-12">
                  <div class="product-images">
                    <main id="gallery">
                      <div class="main-img">
                        <Image
                          src={product.image}
                          id="current"
                          alt="#"
                          height={350}
                          width={250}
                        />
                      </div>
                    </main>
                  </div>
                </div>
                <div class="col-lg-6 col-md-12 col-12">
                  <div class="product-info">
                    <h2 class="title">{product.name}</h2>
                    {product.categories.map((category) => (
                      <p key={category.id} class="category">
                        <i class="lni lni-tag"></i>
                        {category.name}
                      </p>
                    ))}

                    <h3 class="price">
                      ₦{product.price}
                      {product.discount && (
                        <span>₦{product.initial_price}</span>
                      )}
                    </h3>

                    <div class="bottom-content">
                      <div class="row align-items-end">
                        {isInCart ? (
                          <div class="col-lg-8 col-md-8 col-12">
                            <div class="button cart-button">
                              <button
                                class="btn"
                                onClick={() =>
                                  dispatch({
                                    type: ACTIONS.REMOVE_FROM_CART,
                                    payload: product,
                                  })
                                }
                              >
                                Remove From Cart
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div class="col-lg-8 col-md-8 col-12">
                            <div class="button cart-button">
                              <button
                                class="btn"
                                onClick={() =>
                                  dispatch({
                                    type: ACTIONS.ADD_TO_CART,
                                    payload: product,
                                  })
                                }
                              >
                                Add To Cart
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="product-details-info">
              <div class="single-block">
                <div class="row">
                  <div class="col-lg-12 col-12">
                    <div class="info-body custom-responsive-margin">
                      <h4>Description</h4>
                      <p>{product.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* End Item Details */}

        {/* Review Modal */}
        <div
          class="modal fade review-modal"
          id="exampleModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Leave a Review
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <div class="row">
                  <div class="col-sm-6">
                    <div class="form-group">
                      <label for="review-name">Your Name</label>
                      <input
                        class="form-control"
                        type="text"
                        id="review-name"
                        required
                      />
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <div class="form-group">
                      <label for="review-email">Your Email</label>
                      <input
                        class="form-control"
                        type="email"
                        id="review-email"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-6">
                    <div class="form-group">
                      <label for="review-subject">Subject</label>
                      <input
                        class="form-control"
                        type="text"
                        id="review-subject"
                        required
                      />
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <div class="form-group">
                      <label for="review-rating">Rating</label>
                      <select class="form-control" id="review-rating">
                        <option>5 Stars</option>
                        <option>4 Stars</option>
                        <option>3 Stars</option>
                        <option>2 Stars</option>
                        <option>1 Star</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <label for="review-message">Review</label>
                  <textarea
                    class="form-control"
                    id="review-message"
                    rows="8"
                    required
                  ></textarea>
                </div>
              </div>
              <div class="modal-footer button">
                <button type="button" class="btn">
                  Submit Review
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* End Review Modal */}
      </MainLayout>
    </>
  );
};

export default Index;
