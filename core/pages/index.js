import Head from "next/head";
import { Inter } from "@next/font/google";
import MainLayout from "@/layouts/MainLayout";
import Link from "next/link";

import Trending from "@/components/Trending";
import CallToAction from "@/components/CallToAction";
import Shipping from "@/components/Shipping";
import { API_URL } from "@/config/urls";
import { useEffect, useState } from "react";
import { useCategory } from "@/contexts/CategoriesContexts";

const inter = Inter({ subsets: ["latin"] });

export default function Home(props) {
  const [data, setData] = useState([]);
  const { category } = useCategory();

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      console.log("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      console.log(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, []);

  useEffect(() => {
    const getProducts = async () => {
      const res = await fetch(`${API_URL}/products/?categories=${category}`);
      const data = await res.json();
      setData(data);
    };

    getProducts();
  }, [category]);

  return (
    <>
      <Head>
        <title>Welcome to shopgrid</title>
        <meta
          name="description"
          content="Your number one place to shop oline"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Link rel="icon" href="/white-logo.svg" />
      </Head>

      <MainLayout>
        <Trending products={data} />
        <CallToAction />
        <Shipping />
      </MainLayout>
    </>
  );
}

// export async function getStaticProps(context) {
//   const res = await fetch(`${API_URL}/products/`);
//   const data = await res.json();

//   return {
//     props: {
//       data: data,
//     },
//     revalidate: 5,
//   };
// }
