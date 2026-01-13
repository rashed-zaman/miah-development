import fetcher from "../../wp-lib/fetcher";
import {
  ALL_CATEGORIES,
  ALL_POSTS,
  ALL_CATEGORIES_WITH_POSTS,
} from "../../wp-lib/api";
import BlogList from "../../components/route/blog/BlogList";
import { Box, Grid } from "@mui/material";
import CategoryList from "../../components/route/blog/CategoryList";

export default function index({ posts, categories, categoriesPostsList }) {
  return (
    <div className="container">
      <div className="px-5 text-center mt-5 pt-3 mb-5">
        <h1>BLOG</h1>
      </div>
      <Grid container spacing={2}>
        <Grid item md={12}>
          <Box
            sx={{
              maxWidth: {
                xs: 350, // extra small screens (mobile)
                sm: 540, // small screens
                md: 720, // tablets
                lg: 960, // small laptops
                xl: 1200, // large desktop
              },
              bgcolor: "background.paper",
            }}
          >
            <CategoryList categories={categories} />
          </Box>
        </Grid>
        <Grid item md={12}>
          <BlogList posts={posts} categoriesPostsList={categoriesPostsList} />
        </Grid>
      </Grid>
    </div>
  );
}

export async function getStaticProps() {
  const postsRes = await fetcher(ALL_POSTS);
  const categoriesRes = await fetcher(ALL_CATEGORIES);
  const categoriesPostsRes = await fetcher(ALL_CATEGORIES_WITH_POSTS);

  return {
    props: {
      posts: postsRes.data.posts.nodes,
      categories: categoriesRes.data.categories.nodes,
      categoriesPostsList: categoriesPostsRes.data.categories.nodes,
    },
    revalidate: 120, // ISR
  };
}
