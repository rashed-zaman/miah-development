import React from "react";
import BlogCard from "./BlogCard";
import BlogSingleCard from "./BlogSingleCard";

export default function BlogList({ categoriesPostsList, posts }) {
  console.log({categoriesPostsList});
  
  return (
     <div>
      <BlogSingleCard posts={posts} />
      {categoriesPostsList.map((post, i) =>
        i % 2 === 0 ? (
          <BlogCard key={post.id || i} post={post} col={4} length={2} />
        ) : (
          <BlogCard key={post.id || i} post={post} col={6} length={3} />
        )
      )}
    </div>
  );
}
