import { Box } from "@mui/material";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ALL_POSTS } from "./../../../../wp-lib/api";
import fetcher from "./../../../../wp-lib/fetcher";

export default function Post() {
  const [posts, setPosts] = useState([]);

  const getPost = async () => {
    const response = await fetcher(ALL_POSTS);
    const allPosts = response.data.posts.nodes;
    setPosts(allPosts);
  };

  useEffect(() => {
    getPost();
  }, []);

  return (
    <div className="ps-home ps-home--5 mb-5 pb-5">
      <div className="container px-0">
        <section className="ps-post--grid">
          <div className="ps-post__grid">
            <div className="ps-post__thumbnail">
              <Link href="/women/abaya">
                <a className="ps-post__link">
                  <Box sx={{ display: { xs: "none", sm: "block" } }}>
                    <img src="/img/post/abaya.jpg" alt="alt" />
                  </Box>
                  <Box sx={{ display: { xs: "block", sm: "none" } }}>
                    <img src="/img/post/mobile/abya.jpg" alt="alt" />
                  </Box>
                </a>
              </Link>
            </div>
            <div className="ps-post__content px-5">
              <h3 className="ps-post__title">
                <Link href="/women/abaya">
                  <a>Elegant And Modern Abaya Designs</a>
                </Link>
              </h3>
              <Link href="/women/abaya">
                <a className="ps-btn ps-btn--rounded ps-btn--danger">
                  Shop Abaya
                </a>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
