// components/Canonical.js
import Head from "next/head";
import { useRouter } from "next/router";
import { ROOT_URL } from "../../service/serviceConfig";


const Canonical = () => {
  const router = useRouter();
  const canonicalUrl = `${ROOT_URL}${router.asPath.split("?")[0]}`;

  return (
    <Head>
      <link rel="canonical" href={canonicalUrl} />
    </Head>
  );
};

export default Canonical;