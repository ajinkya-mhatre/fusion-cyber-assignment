import { Inter } from "next/font/google";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Fusion cyber</title>
        <meta name="description" content="FleetOZ" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
  );
}
