import React, { useEffect, useState } from "react";
import ProfileLayout from "@/layouts/ProfileLayout";
import { API_URL } from "@/config/urls";
import cookie from "js-cookie";
// import Image from "next/image";

const Orders = ({ orders }) => {
  // const [orders, setOrders] = useState([]);

  // useEffect(() => {
  //   const getOrders = async () => {
  //     const res = await fetch(`${API_URL}/orders/`, {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${cookie.get("authToken")}`,
  //       },
  //     });

  //     const data = await res.json();
  //     setOrders(data);
  //   };
  //   getOrders();
  // }, []);

  return (
    <ProfileLayout>
      <div class="row">
        <div class="col-xl-12 col-lg-12 col-md-6 col-sm-12 col-12">
          <div class="card">
            <h5 class="card-header">Recent Orders</h5>
            <div class="card-body p-0">
              <div class="table-responsive">
                {orders !== null ? (
                  <table class="table">
                    <thead class="bg-light">
                      <tr class="border-0">
                        <th class="border-0">#</th>
                        <th class="border-0">Reference</th>
                        <th class="border-0">Quantity</th>
                        <th class="border-0">Price</th>
                        <th class="border-0">Order Time</th>
                        <th class="border-0">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order, idx) => (
                        <tr key={order.reference}>
                          <td>{idx + 1}</td>
                          <td>{order.reference}</td>
                          <td>{order.products.length}</td>
                          <td>${order.amount}</td>
                          <td>{Date(order.date)}</td>
                          {order.payment ? (
                            <td>
                              <span class="badge-dot badge-brand mr-1"></span>
                              InTransit{" "}
                            </td>
                          ) : (
                            <td>
                              <span class="badge-dot badge-danger mr-1"></span>
                              Pending{" "}
                            </td>
                          )}
                        </tr>
                      ))}

                      {/* <tr>
                      <td colspan="9">
                        <a href="#" class="btn btn-outline-light float-right">
                          View Details
                        </a>
                      </td>
                    </tr> */}
                    </tbody>
                  </table>
                ) : (
                  <h3>No order yets</h3>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProfileLayout>
  );
};

export const getServerSideProps = async ({ req }) => {
  const res = await fetch(`${API_URL}/orders/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${req.cookies["authToken"]}`,
    },
  });
  const data = await res.json();

  return {
    props: {
      orders: data,
    },
  };
};

export default Orders;
