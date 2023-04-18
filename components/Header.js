import React from "react";
import Image from "next/image";
import Link from "next/link";
import NavbarCartItems from "./NavbarCartItems";
import { useAuth } from "@/contexts/AuthContext";
import ProductCategories from "./ProductCategories";

const Header = () => {
  const { token } = useAuth();
  return (
    <header class="header navbar-area">
      {/*  */}
      <div class="topbar">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-lg-4 col-md-4 col-12">
              <div class="top-left">
                {/* <ul class="menu-top-link">

                </ul> */}
              </div>
            </div>
            <div class="col-lg-4 col-md-4 col-12">
              <div class="top-middle">
                <ul class="useful-links">
                  <li>
                    <Link href="/">Home</Link>
                  </li>
                  <li>
                    <Link href="/about">About Us</Link>
                  </li>
                  <li>
                    <Link href="/faqs">FAQs</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-lg-4 col-md-4 col-12">
              <div class="top-end">
                <div class="user">
                  <i class="lni lni-user"></i>
                  Hello
                </div>
                {token ? (
                  <ul class="user-login">
                    <li>
                      <Link href="/profile">Profile</Link>
                    </li>
                  </ul>
                ) : (
                  <ul class="user-login">
                    <li>
                      <Link href="/login">Sign In</Link>
                    </li>
                    <li>
                      <Link href="/signup">Register</Link>
                    </li>
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*  End Topbar */}
      {/* Start Header Middle */}
      <div class="header-middle">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-lg-3 col-md-3 col-7">
              {/* Start Header Logo */}
              <Link class="navbar-brand" href="index.html">
                <Image
                  src="/logo.svg"
                  alt="Logo"
                  height={50}
                  width={50}
                  style={{ width: "auto", height: "auto" }}
                />
              </Link>
              {/* End Header Logo */}
            </div>
            <div class="col-lg-5 col-md-7 d-xs-none">
              {/* Start Main Menu Search */}
              <div class="main-menu-search">
                {/* navbar search start */}
                <div class="navbar-search search-style-5">
                  <div class="search-select">
                    <div class="select-position">
                      <select id="select1">
                        <option selected>All</option>
                        <option value="1">option 01</option>
                        <option value="2">option 02</option>
                        <option value="3">option 03</option>
                        <option value="4">option 04</option>
                        <option value="5">option 05</option>
                      </select>
                    </div>
                  </div>
                  <div class="search-input">
                    <input type="text" placeholder="Search" />
                  </div>
                  <div class="search-btn">
                    <button>
                      <i class="lni lni-search-alt"></i>
                    </button>
                  </div>
                </div>
                {/* navbar search Ends */}
              </div>
              {/* End Main Menu Search */}
            </div>
            <div class="col-lg-4 col-md-2 col-5">
              <div class="middle-right-area">
                <div class="nav-hotline">
                  <i class="lni lni-phone"></i>
                  <h3>
                    Hotline:
                    <span>(+234) 905 920 9717</span>
                  </h3>
                </div>
                <NavbarCartItems />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End Header Middle */}
      {/* Start Header Bottom */}
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-8 col-md-6 col-12">
            <div class="nav-inner">
              {/* Start Mega Category Menu  */}
              <ProductCategories />
              {/* End Mega Category Menu */}
              {/* Start Navbar */}
              <nav class="navbar navbar-expand-lg">
                <button
                  class="navbar-toggler mobile-menu-btn"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span class="toggler-icon"></span>
                  <span class="toggler-icon"></span>
                  <span class="toggler-icon"></span>
                </button>

                {/* navbar collapse */}
              </nav>
              {/* End Navba */}
            </div>
          </div>
          <div class="col-lg-4 col-md-6 col-12">
            {/* Start Nav Social */}
            <div class="nav-social">
              <h5 class="title">Follow Us:</h5>
              <ul>
                <li>
                  <a href="javascript:void(0)">
                    <i class="lni lni-facebook"></i>
                  </a>
                </li>
                <li>
                  <a href="javascript:void(0)">
                    <i class="lni lni-twitter-original"></i>
                  </a>
                </li>
                <li>
                  <a href="javascript:void(0)">
                    <i class="lni lni-instagram"></i>
                  </a>
                </li>
                <li>
                  <a href="javascript:void(0)">
                    <i class="lni lni-skype"></i>
                  </a>
                </li>
              </ul>
            </div>
            {/* End Nav Social */}
          </div>
        </div>
      </div>
      {/* End Header Bottom */}
    </header>
  );
};

export default Header;
