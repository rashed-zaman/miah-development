import moment from "moment";

export default function BlogCard({ posts }) {
  const [post] = posts || [];

  if (!post) {
    // Handle missing post data gracefully
    return <div>No posts available.</div>;
  }

  // Use optional chaining and fallback values
  const mediaItemUrl = post?.featuredImage?.node?.mediaItemUrl || "";
  const title = post?.title || "Untitled Post";
  const excerpt = post?.excerpt || "";
  const date = post?.date || "";
  const name = post?.categories?.nodes[0]?.name || "";

  return (
    <div className="blog-card mb-4">
      <div className="container">
        <div className="row">
          <div className="col-md-12"></div>

          <div className="col-md-12">
            <img
              src={mediaItemUrl}
              alt={title}
              width="100%"
              className="img-fluid mb-3"
            />
            <div className="text-center">
              <p className="mb-0">
                <small> {name} </small>
              </p>
              <p className="my-1">{title}</p>
              <span>{moment(date).format("MM/DD")}</span>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
}
