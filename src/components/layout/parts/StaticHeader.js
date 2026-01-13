import Head from "next/head";

export default function StaticHeader({ title, des }) {
  return (
    <Head>
      <title>{title}</title>
      <meta
        name="description"
        content={des}
      />
    </Head>
  );
}
