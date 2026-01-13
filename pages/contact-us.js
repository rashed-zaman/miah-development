import Link from "next/link";
import Head from "next/head";
import ContactForm from "../components/contact-us/ContactForm";

import { useRouter } from "next/router";
import { ROOT_URL } from "../service/serviceConfig";



export default function ContactUs() {

    const router = useRouter();
    const canonicalUrl = `${ROOT_URL}${router.asPath.split("?")[0]}`;

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Us - MIAH",
    url: "https://miah.shop/contact-us",
    mainEntity: {
      "@type": "ContactPoint",
      telephone: "+8801313767678",
      contactType: "customer service",
      email: "info@miah.shop",
      availableLanguage: ["English", "Bengali"],
    },
  };

  return (
    <>
      <Head>
        <title>Contact Us - Get in Touch | MIAH</title>
        <link rel="canonical" href={canonicalUrl} />
        <meta name="description" content="Have questions? Visit contact us to reach MIAH for assistance with orders, shipping, returns, and more. We’re here to help with all your fashion needs!" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </Head>

      <div className="ps-contact pb-0">
        <div className="container">
          <ul className="ps-breadcrumb">
            <li className="ps-breadcrumb__item">
              <Link href="/">
                <a>Home</a>
              </Link>
            </li>
            <li className="ps-breadcrumb__item">
              <a className="active" aria-current="page" href="#">
                Contact us
              </a>
            </li>
          </ul>
          <div className="ps-contact__content">
            <div className="row">
              <div className="col-12 col-md-6">
                <h2 className="ps-contact__title-1">
                  How can <br />
                  we help you?
                </h2>
                {/* <p className="ps-contact__text">
                  We are at your disposal 7 days a week!
                </p> */}
                <p>
                  <b>Corporate Office</b>
                </p>
                <p className="ps-contact__address">
                  90/1 Motijheel, City Centre (Level 24),
                  <br />
                  Dhaka 1000, Bangladesh
                </p>
                <p>
                  <b>Boutique House:</b>
                </p>
                <p className="ps-contact__address">
                  House #232, Road #03, Baridhara DOHS,
                  <br />
                  Dhaka 1000, Bangladesh
                </p>
                <div className="ps-contact__info">
                  <a className="ps-contact__phone" href="tel:+8801313767678">
                    +8801313767678
                  </a>
                  <a className="ps-contact__email" href="mailto:info@miah.shop">
                    info@miah.shop
                  </a>
                </div>
                <ul className="ps-social">
                  <li>
                    <a
                      className="ps-social__link facebook"
                      href="https://www.facebook.com/MiahAndMiah/"
                    >
                      <i className="fa fa-facebook"> </i>
                      <span className="ps-tooltip">Facebook</span>
                    </a>
                  </li>
                  <li>
                    <a
                      className="ps-social__link instagram"
                      href="https://www.instagram.com/miahandmiah/"
                    >
                      <i className="fa fa-instagram"></i>
                      <span className="ps-tooltip">Instagram</span>
                    </a>
                  </li>
                  <li>
                    <a
                      className="ps-social__link youtube"
                      href="https://www.youtube.com/miahandmiah"
                    >
                      <i className="fa fa-youtube-play"></i>
                      <span className="ps-tooltip">Youtube</span>
                    </a>
                  </li>
                  <li>
                    <a
                      className="ps-social__link pinterest"
                      href="https://www.pinterest.com/miahandmiah/"
                    >
                      <i className="fa fa-pinterest-p"></i>
                      <span className="ps-tooltip">Pinterest</span>
                    </a>
                  </li>
                  <li>
                    <a
                      className="ps-social__link linkedin"
                      href="https://www.linkedin.com/company/miahandmiah/"
                    >
                      <i className="fa fa-linkedin"></i>
                      <span className="ps-tooltip">Linkedin</span>
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-12 col-md-6">
                {/* <img src="/img/contact-icon.svg" alt="contact" /> */}
              </div>
            </div>
          </div>
          <ContactForm />
        </div>
        <div className="ps-contact__map">
          <div className="mapouter">
            <div className="gmap_canvas">
              <iframe
                width="1080"
                height="503"
                id="gmap_canvas"
                src="https://maps.google.com/maps?q=City%20Centre%20Dhaka,%20Dhaka&t=&z=13&ie=UTF8&iwloc=&output=embed"
                frameBorder="0"
                scrolling="no"
                marginHeight="0"
                marginWidth="0"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
