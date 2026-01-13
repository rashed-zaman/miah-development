import React from "react";
import { useState, useEffect } from "react";
import { ALL_POSTS } from "./../../../../wp-lib/api";
import fetcher from "./../../../../wp-lib/fetcher";

export default function Instagram() {
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
      <section className="ps-section--default ps-instagram">
        <div className="container">
          <h3 className="ps-section__title">
            Express yourself with
            <u>#miah</u>
            <br />
            on instagram
          </h3>
          <div className="ps-section__content">
            <div className="row m-0">
              {posts.length > 0 &&
                posts.map((post, index) => {
                  return (
                    index < 3 && (
                      <div className="col-12 col-md-4 mb-3" key={post.id}>
                        <a href={post.link}>
                          <img
                            src={
                              post.featuredImage.node.mediaItemUrl
                                ? post.featuredImage.node.mediaItemUrl
                                : ""
                            }
                            width="100%"
                          />
                        </a>
                        <div>
                          <h3 className="my-4">{post.title}</h3>
                          <div
                            style={{ height: "100px", overflow: "hidden" }}
                            dangerouslySetInnerHTML={{
                              __html: post.content,
                            }}
                          />
                        </div>
                        <div className="my-4">
                          <a href={post.link}>
                            <b>Read more</b>
                          </a>
                        </div>
                      </div>
                    )
                  );
                })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
