"use client"

import Script from 'next/script'

export default function HeadScripts() {
  return (
    <>
      <Script src="/plugins/jquery.min.js" strategy="beforeInteractive" />
      <Script src="/plugins/popper.min.js" strategy="beforeInteractive" />
      <Script src="/plugins/bootstrap4/js/bootstrap.min.js" strategy="beforeInteractive" />
      <Script src="/plugins/select2/dist/js/select2.full.min.js" strategy="beforeInteractive" />
      <Script src="/plugins/owl-carousel/owl.carousel.min.js" strategy="beforeInteractive" />
      <Script src="/plugins/jquery-bar-rating/dist/jquery.barrating.min.js" strategy="beforeInteractive" />
      <Script src="/plugins/lightGallery/dist/js/lightgallery-all.min.js" strategy="beforeInteractive" />
      <Script src="/plugins/slick/slick/slick.min.js" strategy="beforeInteractive" />
      <Script src="/plugins/noUiSlider/nouislider.min.js" strategy="beforeInteractive" />
    </>
  )
}
