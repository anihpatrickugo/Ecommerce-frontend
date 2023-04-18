import React from "react";
import Link from "next/link";
import Head from "next/head";
// import styles from "/@styles/PaymentSuccess.Module.css";

const paymentsuccess = () => {
  const styles = {
    payment: {
      border: "1px solid #f2f2f2",
      height: "280px",
      borderRadius: "20px",
      background: "#ededed",
    },
    paymentHeader: {
      background: "rgb(0, 225, 123)",
      padding: "20px",
      borderRadius: "20px 20px 0px 0px",
    },
    check: {
      margin: "0px auto",
      width: "50px",
      height: "50px",
      borderRadius: "100%",
      background: "#fff",
      textAlign: "center",
    },
  };

  return (
    <>
      <Head>
        {/* <link
          rel="stylesheet"
          type="text/css"
          href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
        ></link> */}
        <Link rel="icon" href="/white-logo.svg" />
      </Head>
      <div class="container">
        <div class="row">
          <div class="col-md-6 mx-auto mt-5">
            <div style={styles.payment}>
              <div style={styles.paymentHeader}>
                <div style={styles.check}>
                  <i
                    class="fa fa-check"
                    aria-hidden="true"
                    style={{
                      verticalAlign: "middle",
                      lineHeight: "50px",
                      fontSize: "30px",
                    }}
                  ></i>
                </div>
              </div>
              <div style={{ textAlign: "center" }}>
                <h1
                  style={{
                    fontSize: "25px",
                    paddingTop: "25px",
                  }}
                >
                  Payment Success !
                </h1>
                <p>
                  An email with your Order details have been sent to your email
                  address.
                </p>
                <p>Expected delivery is in few days time.</p>
                <Link href="/" className="btn btn-secondary">
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default paymentsuccess;
