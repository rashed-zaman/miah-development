import React from "react";
import { Grid, Typography } from "@mui/material";
import {
  POSTS_BY_CATEGORY,
  ALL_CATEGORIES,
  ALL_POSTS,
} from "@/app/wp-lib/api";
import fetcher from "@/app/wp-lib/fetcher";
import CategoryList from "@/components/route/blog/CategoryList";
import moment from "moment";
import Link from "next/link";

/* --------------------------------
   ISR (60 seconds)
----------------------------------*/
export const revalidate = 60;

/* --------------------------------
   Static params (replaces getStaticPaths)
----------------------------------*/
export async function generateStaticParams() {
  const res = await fetcher(ALL_CATEGORIES);
  const categories = res.data.categories.nodes;

  return categories.map((cat) => ({
    slug: cat.slug,
  }));
}

/* --------------------------------
   Page component
----------------------------------*/
export default async function BlogCategory({ params }) {
  const { slug } = await params;

  const postsRes = await fetcher(POSTS_BY_CATEGORY, {
    variables: { slug },
  });

  const recentPostsRes = await fetcher(ALL_POSTS);
  const categoriesRes = await fetcher(ALL_CATEGORIES);

  const posts = postsRes.data.posts.nodes;
  const recentPosts = recentPostsRes.data.posts.nodes.slice(0, 5);
  const categories = categoriesRes.data.categories.nodes;

 let result = decodeURIComponent(slug)
  .replace(/-/g, " ")

  return (
    <div className="container mb-5 pb-5">
      <Grid container spacing={4}>
        <Grid  size={12} className="mt-5">
          <CategoryList categories={categories} />
        </Grid>
      </Grid>

      <Grid container spacing={4} className="mt-4">
        <Grid size={12}>
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
              <Grid size={{xs:12, md:6}} key={i}>
                <Link href={"/blog/" + post.slug}>
                  <img
                    src={post.featuredImage?.node?.mediaItemUrl}
                    alt={post.title}
                    className="img-fluid mb-3"
                  />
                  <p className="my-0 text-capitalize">{result}</p>
                  <p className="mb-0">{post.title}</p>
                  <span>{moment(post.date).format("MM/DD")}</span>
                </Link>
              </Grid>
            ))}
          </>
        ) : (
          <Grid size={12}>
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
        )}
      </Grid>
    </div>
  );
}
