import Link from "next/link";

export default function Sidebar({ recentPosts, categories }) {
  return (
    <aside className="w-full md:w-1/3 lg:w-1/4 p-4 border-l border-gray-200">
      {/* Recent Posts */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Recent Posts</h3>
        <ul className="space-y-3">
          {recentPosts.map((post) => (
            <li key={post.id}>
              <Link href={`/blog/${post.slug}`}>
                <span className="hover:underline">{post.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Categories */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Categories</h3>
        <ul className="space-y-3">
          {categories.map((cat) => (
            <li key={cat.id}>
              <Link href={`/blog/category/${cat.slug}`}>
                <span className="hover:underline">{cat.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
