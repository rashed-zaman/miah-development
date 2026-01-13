import Link from 'next/link';
import Head from "next/head";

export default function Custom503() {
  return (
    <>
     <Head>
         <title>503: Service Unavailable</title>
      </Head>
    <main style={{ textAlign: 'center', padding: '50px' }}>
      <h1 style={{display:'block',margin:0,padding:'10px 0 10px 0',fontSize:'24px',fontWeight:'500',verticalAlign:'top'}}>503 - Service Unavailable</h1>
      <p style={{fontSize:'14px',fontWeight:'normal',lineHeight:'inherit',margin:0,padding:0}}>The server is unable to handle a request.</p>
      <Link href="/">
        <a style={{ color: '#000', textDecoration: 'underline', fontWeight:'500' }}>Go Back to Home</a>
      </Link>
    </main>
    </>
  );
}
