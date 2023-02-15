import Head from "next/head";
import { Inter } from "@next/font/google";
import MainLayout from "@/layouts/MainLayout";
import Link from "next/link";
import Trending from "@/components/Trending";
import CallToAction from "@/components/CallToAction";
import Shipping from "@/components/Shipping";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
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
        <Trending />
        <CallToAction />
        <Shipping />
      </MainLayout>
    </>
  );
}
