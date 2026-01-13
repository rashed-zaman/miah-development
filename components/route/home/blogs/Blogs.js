import React, { useRef, useState, useEffect } from "react";
import { Box } from "@mui/material";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination, Autoplay } from "swiper";

import { ALL_HOME_POSTS } from "../../../../wp-lib/api";
import fetcher from "../../../../wp-lib/fetcher";
import Link from "next/link";

export default function Blogs() {
  const [posts, setPosts] = useState([]);

  const getPost = async () => {
    const response = await fetcher(ALL_HOME_POSTS);
    const allPosts = response.data.posts.nodes;
    setPosts(allPosts);
  };

  useEffect(() => {
    getPost();
  }, []);

  return (
    <>
      <Box
        className="ps-home ps-home--5 mb-5 pb-5"
        sx={{ marginTop: { xs: 5 } }}
      >
        <section className="ps-section--default ps-instagram">
          <div className="container">
            <h3 className="ps-section__title">Miah Latest</h3>
            <div className="ps-section__content">
              <div className="row">
                <div className="col-md-12">
                  <Swiper
                    slidesPerView={1}
                    spaceBetween={10}
                    loop={true}
                    autoplay={{
                      delay: 2500,
                      disableOnInteraction: false,
                    }}
                    pagination={{
                      clickable: true,
                    }}
                    breakpoints={{
                      640: {
                        slidesPerView: 1,
                        spaceBetween: 10,
                      },
                      768: {
                        slidesPerView: 1,
                        spaceBetween: 10,
                      },
                      1024: {
                        slidesPerView: 3,
                        spaceBetween: 10,
                      },
                    }}
                    modules={[Pagination, Autoplay]}
                    className="blog-slider"
                  >
                    {posts.length > 0 &&
                      posts.map((post, index) => {
                        return (
                          <SwiperSlide key={post.id}>
                            <>
                              <Link href={"/blog/" + post.slug}>
                                <a>
                                  <img
                                    src={
                                      post?.featuredImage?.node?.mediaItemUrl
                                        ? post.featuredImage.node.mediaItemUrl
                                        : ""
                                    }
                                    width="100%"
                                  />
                                </a>
                              </Link>
                              <div>
                                <h3 className="my-4">{post.title}</h3>
                                {/* <div
                                  style={{
                                    height: "50px",
                                    overflow: "hidden",
                                  }}
                                  dangerouslySetInnerHTML={{
                                    __html: post.content,
                                  }}
                                /> */}
                              </div>
                              {/* <div className="my-4">
                                <Link href={post.link}>
                                  <a href={post.link}>
                                    <b>Read more</b>
                                  </a>
                                </Link>
                              </div> */}
                            </>
                          </SwiperSlide>
                        );
                      })}
                  </Swiper>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Box>
    </>
  );
}
