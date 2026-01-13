import fetcher from "@/app/wp-lib/fetcher";
import {
  ALL_CATEGORIES,
  ALL_POSTS,
  ALL_CATEGORIES_WITH_POSTS,
} from "@/app/wp-lib/api";
import BlogList from "@/components/route/blog/BlogList";
import CategoryList from "@/components/route/blog/CategoryList";
import { Box, Grid } from "@mui/material";

/* --------------------------------
   ISR revalidation (120 seconds)
----------------------------------*/
export const revalidate = 120;

export default async function BlogPage() {
  const [postsRes, categoriesRes, categoriesPostsRes] = await Promise.all([
    fetcher(ALL_POSTS),
    fetcher(ALL_CATEGORIES),
    fetcher(ALL_CATEGORIES_WITH_POSTS),
  ]);

  const posts = postsRes.data.posts.nodes;
  const categories = categoriesRes.data.categories.nodes;
  const categoriesPostsList = categoriesPostsRes.data.categories.nodes;

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
                xs: 350,
                sm: 540,
                md: 720,
                lg: 960,
                xl: 1200,
              },
              bgcolor: "background.paper",
            }}
          >
            <CategoryList categories={categories} />
          </Box>
        </Grid>

        <Grid item md={12}>
          <BlogList
            posts={posts}
            categoriesPostsList={categoriesPostsList}
          />
        </Grid>
      </Grid>
    </div>
  );
}
