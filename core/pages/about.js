import React from "react";
import MainLayout from "@/layouts/MainLayout";

const about = () => {
  return (
    <MainLayout>
      <section id="about" class="about">
        <div class="container" data-aos="fade-up">
          <div class="section-title">
            <h2>About Us</h2>
          </div>

          <div class="row content">
            <div class="col-lg-12">
              <p>
                Over a decade ago, we started a store to sell electronics and
                gadgets online. None of the shopping solutions at the time gave
                us the control we needed to be successful—so we built our own.
                Today, people around the world use Shopgrids, whether they’re
                buying electronics, gadgets, or accesories use Shopgrids.
              </p>
            </div>
            <br />
            <div class="col-lg-12 pt-4 pt-lg-0">
              <p>
                Shopgrids has grown in recent years to over 10,000 across the
                globe. With millions of businesses powered by Shopgrids, we care
                deeply about the work we do. We’re constant learners who thrive
                on change and seek to have an impact in everything we do.
              </p>
            </div>
            <br />
            <div class="col-lg-12 pt-4 pt-lg-0">
              <p>
                We help people achieve independence by making it easier to shop
                products. We believe the future of commerce has more voices, not
                fewer, so we’re reducing the barriers to shopping to make
                commerce better for everyone.
              </p>
            </div>
            <br />
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default about;
