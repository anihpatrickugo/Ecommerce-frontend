import React from "react";
import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import styles from "@/styles/Home.module.css";

const MainLayout = ({ children }) => {
  return (
    <>
      <Head>
        <link
          href="https://cdn.lineicons.com/4.0/lineicons.css"
          rel="stylesheet"
        />
      </Head>

      <main className={styles.main}>
        <Header />

        {children}

        <Footer />

        <a href="#" class="scroll-top">
          <i class="lni lni-chevron-up"></i>
        </a>
      </main>
    </>
  );
};

export default MainLayout;
