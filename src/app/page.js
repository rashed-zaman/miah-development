import MainLayout from "@/components/layout/MainLayout";
import styles from "./page.module.css";
import Header from "@/components/layout/header/Header";
import Banner from "@/components/route/home/banner/Banner";
import Promo from "@/components/route/home/promo/Promo";
import Blog from "@/components/route/home/blogs/Blogs";
import Service from "@/components/route/home/service/Service";

export default function Home() {
  return (

    <>
      <div className="ps-home ps-home--4">
        <Banner />
        <Promo />
      </div>
      <div>
        <Blog />
        <Service />
      </div>
    </>
  );
}
