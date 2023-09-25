import dynamic from 'next/dynamic'
import Head from "next/head";
import EidBanner from '../components/route/home/banner/EidBanner';
import Blogs from '../components/route/home/blogs/Blogs';
import PromoAbaya from '../components/route/home/promo-abaya/PromoAbaya';
import PromoLungi from '../components/route/home/promo-lungi/PromoLungi';


// import Banner from "../components/route/home/banner/Banner";
// import Promo from "../components/route/home/promo/Promo";
// import Service from "../components/route/home/service/Service";
// import Feature from "../components/route/home/feature/Feature";

// import Video from "../components/route/home/video/Video";
// import Post from "../components/route/home/post/Post";
// import Instagram from "../components/route/home/instagram/Instagram";

// import Footer from "../components/shared/footer/Footer";
// import Header from "../components/shared/header/Header";
// import FooterNavigation from "../components/shared/header/parts/FooterNavigation";
// import MenuSlideBar from "../components/shared/menu-slidebar/MenuSlideBar";
// import PreLoader from "../components/shared/pre-loader/PreLoader";
// import ScrollToTop from "../components/shared/ScrollToTop/ScrollToTop";
// import Search from "../components/shared/search/Search";


const Header = dynamic(() => import("../components/shared/header/Header"))
const Banner = dynamic(() => import("../components/route/home/banner/Banner"))
const Promo = dynamic(() => import("../components/route/home/promo/Promo"))
const Service = dynamic(() => import("../components/route/home/service/Service"))
const Feature = dynamic(() => import("../components/route/home/feature/Feature"))

// const Video = dynamic(() => import("../components/route/home/video/Video"))
// const Post = dynamic(() => import("../components/route/home/post/Post"))
// const Instagram = dynamic(() => import("../components/route/home/instagram/Instagram"))

// const Footer = dynamic(() => import("../components/shared/footer/Footer"))
// const FooterNavigation = dynamic(() => import("../components/shared/header/parts/FooterNavigation"))
// const MenuSlideBar = dynamic(() => import("../components/shared/menu-slidebar/MenuSlideBar"))
// const PreLoader = dynamic(() => import("../components/shared/pre-loader/PreLoader"))
// const ScrollToTop = dynamic(() => import("../components/shared/ScrollToTop/ScrollToTop"))
// const Search = dynamic(() => import("../components/shared/search/Search"))

export default function Home() {
  return (
    <>
      <Head>
        <title>MIAH - Largest Traditional Online Shop</title>
        <meta name="description" content="Miah Bangladesh's largest traditional online shop. Buy online lungi, panjabi, t-shirt centu genji,  saree, salwar kameez, Cut piece fabrics Ect." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="ps-home ps-home--4">
        <Banner />
        {/* <EidBanner/> */}
        <Promo />
      </div>
      <div>
        <Feature />
        {/* <Video /> */}
        <PromoLungi />
        {/* <Post /> */}
        <PromoAbaya />
        <Service />
        <Blogs />
        {/* <Instagram /> */}
      </div>
    </>
  );
}
