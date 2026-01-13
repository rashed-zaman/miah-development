import Link from 'next/link';
import Head from "next/head";

export default function Custom404() {
  return (
    <>
      <Head>
         <title>404: This page could not be found</title>
      </Head>
      <main style={{ textAlign: 'center', padding: '50px' }}>
        <h1 style={{display:'block',margin:0,padding:'10px 0 10px 0',fontSize:'24px',fontWeight:'500',verticalAlign:'top'}}>404 - Page Not Found</h1>
        <p style={{fontSize:'14px',fontWeight:'normal',lineHeight:'inherit',margin:0,padding:0}}>Oops! The page you are looking for does not exist.</p>
        <Link href="/">
          <a style={{ color: '#000', textDecoration: 'underline', fontWeight:'500' }}>Go Back to Home</a>
        </Link>
      </main>
    </>
  );
}
