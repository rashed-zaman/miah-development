"use client"

import React, { useEffect, useState } from "react";
import fetcher from "@/app/wp-lib/fetcher";
import { ALL_CATEGORIES, ALL_POSTS } from "@/app/wp-lib/api";
import Link from "next/link";



export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    const getData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch posts and categories in parallel
        const [postResponse, categoryResponse] = await Promise.all([
          fetcher(ALL_POSTS, { signal }),
          fetcher(ALL_CATEGORIES, { signal })
        ]);

        setPosts(postResponse.data.posts.nodes);
        setCategories(categoryResponse.data.categories.nodes);
      } catch (err) {
        if (err.name === 'AbortError') {
          console.log('Fetch aborted');
        } else {
          setError(err.message);
          console.error("Error fetching data:", err);
        }
      } finally {
        setLoading(false);
      }
    };

    getData();

    // Cleanup function to abort pending requests
    return () => abortController.abort();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="blog-container">
      <h1>Blog Posts</h1>
      
      <div className="categories">
        <h2>Categories</h2>
        <ul>
          {categories.map(category => (
            <li key={category.id}><Link href={`/blog/category/${category.slug}`}>{category.name}</Link></li>
          ))}
        </ul>
      </div>

      <div className="posts">
        <h2>Latest Posts</h2>
        {posts.map(post => (
          <article key={post.id} className="post-card">
            <h3>{post.title}</h3>
            <div dangerouslySetInnerHTML={{ __html: post.excerpt }} />
          </article>
        ))}
      </div>
    </div>
  );
}