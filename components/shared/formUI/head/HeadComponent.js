import Head from "next/head";
import { useRouter } from "next/router";
import { ROOT_URL } from "../../../../service/serviceConfig";

function HeadComponent({ data, type }) {
    const router = useRouter();
    const canonicalUrl = `${ROOT_URL}${router.asPath.split("?")[0]}`;

    const{breadCam} = data
    const{title, description, keywords} = breadCam
    
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="icon" href="/favicon.ico" />
      <link rel="canonical" href={canonicalUrl} />
    </Head>
  );
}

export default HeadComponent;
