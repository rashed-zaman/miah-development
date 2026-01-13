import { Typography } from "@mui/material";
import { POST_BY_SLUG, ALL_POSTS, ALL_CATEGORIES } from "@/app/wp-lib/api";
import fetcher from "@/app/wp-lib/fetcher";
import CategoryList from "@/components/route/blog/CategoryList";

/* --------------------------------
   Page component (Server Component)
----------------------------------*/
export default async function BlogPost({ params }) {
  const { slug } = await params;

  const postRes = await fetcher(POST_BY_SLUG, {
    variables: { id: slug, idType: "SLUG" },
  });

  const postsRes = await fetcher(ALL_POSTS);
  const categoriesRes = await fetcher(ALL_CATEGORIES);

  const post = postRes.data.post;
  const recentPosts = postsRes.data.posts.nodes.slice(0, 5);
  const categories = categoriesRes.data.categories.nodes;

  return (
    <div className="container mx-auto py-10 flex flex-col md:flex-row gap-10">
      <br />

      <CategoryList categories={categories} />

      <br />
      <br />

      <div className="w-full md:w-2/3 lg:w-3/4">
        <Typography
          variant="h4"
          gutterBottom
          component="h1"
          color="text.primary"
          className="text-capitalize text-center"
        >
          {post.title}
        </Typography>

        <br />
        <br />

        {post.featuredImage?.node?.mediaItemUrl && (
          <img
            src={post.featuredImage.node.mediaItemUrl}
            alt={post.featuredImage.node.altText}
            className="mb-6"
          />
        )}

        <div
          dangerouslySetInnerHTML={{ __html: post.content }}
          className="my-5 pb-5"
        />
      </div>
    </div>
  );
}
