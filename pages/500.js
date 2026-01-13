import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function Custom500() {
  const router = useRouter();

  useEffect(() => {
    const prevUrl = document.referrer;

    // If the referrer is from the same origin, redirect back to it
    if (prevUrl && prevUrl.includes(window.location.origin)) {
      const path = prevUrl.replace(window.location.origin, '');
      router.push(path);
    } else {
      // Otherwise, fallback to homepage
      router.push('/');
    }
  }, [router]);

  return (
    <>
      <Head>
        <title>Something went wrong</title>
      </Head>
      <main style={{ textAlign: 'center', padding: '50px' }}>
        <h1 style={{ margin: 0, padding: '10px 0', fontSize: '24px', fontWeight: '500' }}>
          Something went wrong. Redirecting...
        </h1>
        <p style={{ fontSize: '14px', marginTop: '10px' }}>
          If you are not redirected, <a href="/">click here</a>.
        </p>
      </main>
    </>
  );
}
