import React from "react";
import { Grid, Typography } from "@mui/material";
import {
  POSTS_BY_CATEGORY,
  ALL_CATEGORIES,
  ALL_POSTS,
} from "../../../wp-lib/api";
import fetcher from "../../../wp-lib/fetcher";
import BlogList from "../../../components/route/blog/BlogList";
import Sidebar from "../../../components/route/blog/Sidebar";
import CategoryList from "../../../components/route/blog/CategoryList";
import moment from "moment";
import Link from "next/link";

export default function BlogCategory({ posts, slug, recentPosts, categories }) {
  let result = slug.replace(/-/g, " ");

  return (
    <div className="container mb-5 pb-5">
      <Grid container spacing={4}>
        <Grid item xs={12} md={12} className="mt-5">
          <CategoryList categories={categories} />
        </Grid>
      </Grid>
      <Grid container spacing={4} className="mt-4">
        <Grid item xs={12} md={12}>
          <Typography
            variant="h4"
            gutterBottom
            component="h1"
            color="text.primary"
            className="text-capitalize text-center"
          >
            {result}
          </Typography>
        </Grid>

        {posts.length > 0 ? (
          <>
            {posts.map((post, i) => (
              <Grid item xs={12} md={6} key={i}>
                <Link href={"/blog/"+ post.slug}>
                  <a>
                    <img
                      src={post.featuredImage?.node?.mediaItemUrl}
                      alt={post.title}
                      className="img-fluid mb-3"
                    />
                    <p className="my-0 text-capitalize">{result}</p>
                    <p className="mb-0">{post.title}</p>
                    <span>{moment(post.date).format("MM/DD")}</span>
                  </a>
                </Link>
              </Grid>
            ))}
          </>
        ) : (
          <>
            <Grid item xs={12} md={12}>
              <Typography
                variant="h6"
                gutterBottom
                component="h3"
                color="text.primary"
                className="text-capitalize text-center"
              >
                No posts found.
              </Typography>
            </Grid>
          </>
        )}
      </Grid>
    </div>
  );
}

export async function getStaticPaths() {
  // Fetch categories at build time
  const res = await fetcher(ALL_CATEGORIES);
  const categories = res.data.categories.nodes;

  return {
    paths: categories.map((cat) => ({
      params: { slug: cat.slug },
    })),
    fallback: "blocking", // Generate new categories on-demand
  };
}

export async function getStaticProps({ params }) {
  const postsRes = await fetcher(POSTS_BY_CATEGORY, {
    variables: { slug: params.slug },
  });
  const recentPostsRes = await fetcher(ALL_POSTS);
  const categoriesRes = await fetcher(ALL_CATEGORIES);

  return {
    props: {
      posts: postsRes.data.posts.nodes,
      slug: params.slug,
      recentPosts: recentPostsRes.data.posts.nodes.slice(0, 5),
      categories: categoriesRes.data.categories.nodes,
    },
    revalidate: 60, // ISR: refresh every 60 seconds
  };
}
