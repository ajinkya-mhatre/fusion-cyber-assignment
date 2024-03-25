import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    if (router.pathname === "/") {
      void router.replace("/home");
    }
  }, [router]);

  return (
    <>
      <Head>
        <title>Fusion cyber</title>
        <meta name="description" content="FusionCyber" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
  );
}
