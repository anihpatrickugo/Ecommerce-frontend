import React from "react";
import MainLayout from "@/layouts/MainLayout";

import Trending from "@/components/Trending";
import CallToAction from "@/components/CallToAction";
import Shipping from "@/components/Shipping";
import { API_URL } from "@/config/urls";
import { useState, useEffect } from "react";
import { useCategory } from "@/contexts/CategoriesContexts";

export default function Home(props) {
  const { category } = useCategory();
  const [data, setData] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const res = await fetch(`${API_URL}/products/?categories=${category}`);
      const data = await res.json();
      setData(data);
    };

    getProducts();
  }, [category]);

  return (
    <MainLayout>
      <Trending products={data} />
      <CallToAction />
      <Shipping />
    </MainLayout>
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
