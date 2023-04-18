import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "@/contexts/AuthContext";

const ProfileLayout = ({ children }) => {
  const { logout } = useAuth();
  const router = useRouter();

  const logoutBtn = () => {
    const confirmLogout = confirm("Are you sure you want to logout?");
    if (confirmLogout == true) {
      logout();
      router.push("/login");
    }
  };
  return (
    <body>
      <div class="dashboard-main-wrapper">
        <div class="dashboard-wrapper">
          <div class="dashboard-ecommerce">
            <div class="container-fluid dashboard-content ">
              <div class="row">
                <div class="col-xl-9 col-lg-12 col-md-12 col-sm-12 col-12">
                  <div class="page-header">
                    <h2 class="pageheader-title">
                      E-commerce Dashboard Template{" "}
                    </h2>
                    <p class="pageheader-text">
                      Nulla euismod urna eros, sit amet scelerisque torton
                      lectus vel mauris facilisis faucibus at enim quis massa
                      lobortis rutrum.
                    </p>
                    <div class="page-breadcrumb">
                      <nav aria-label="breadcrumb">
                        <ol class="breadcrumb">
                          <li class="breadcrumb-item">
                            <Link href="/" class="breadcrumb-link">
                              Back To Shop
                            </Link>
                          </li>
                          <li class="breadcrumb-item">
                            <Link href="/profile" class="breadcrumb-link">
                              Profile
                            </Link>
                          </li>
                          <li
                            class="breadcrumb-item active"
                            aria-current="page"
                          >
                            <Link
                              href="/profile/orders"
                              class="breadcrumb-link"
                            >
                              Orders
                            </Link>
                          </li>
                          <li
                            onClick={logoutBtn}
                            class="breadcrumb-item active"
                            aria-current="page"
                          >
                            <a href="#" class="breadcrumb-link">
                              Logout
                            </a>
                          </li>
                        </ol>
                      </nav>
                    </div>
                  </div>
                </div>
              </div>

              <div class="ecommerce-widget">{children}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="footer">
        <div class="container-fluid">
          <div class="row">
            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
              Copyright © 2023 Concept. All rights reserved. Dashboard by{" "}
              <a href="https://github.com/anihpatrickugo/">
                Anih-Patrick Ugochukwu
              </a>
              .
            </div>
            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
              <div class="text-md-right footer-links d-none d-sm-block">
                <Link href="/about">About</Link>
                <Link href="/faqs">FAQs</Link>
                <Link href="/contact">Contact Us</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </body>
  );
};

export default ProfileLayout;
