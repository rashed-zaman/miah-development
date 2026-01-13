import Link from "next/link";
import moment from "moment";

export default function BlogCard({ post, col, length }) {
  const nodes = post?.posts?.nodes || [];
  const { name, slug, description } = post;
  console.log({ slug, name });

  return (
    <>
      {nodes.length > 0 && (
        <div className="blog-card  mb-4">
          <div className="container">
            <div className="row">
              <div className={"col-md-12"}>
                <h2>{name}</h2>
                <p> {description}</p>
              </div>
              {nodes.map(
                (singlePost, i) =>
                  i <= length && (
                    <div className={"col-md-" + col} key={singlePost.id}>
                      <Link href={"/blog/" + singlePost.slug}>
                        <a>
                          {singlePost.featuredImage?.node?.mediaItemUrl && (
                            <img
                              src={singlePost.featuredImage.node.mediaItemUrl}
                              alt={
                                singlePost.featuredImage.node.altText ||
                                singlePost.title
                              }
                              className="img-fluid mb-3"
                            />
                          )}
                          <div>
                            <p className="mb-0">
                              <small> {name} </small>
                            </p>
                            <p className="my-1">{singlePost.title}</p>
                            <span>
                              {moment(singlePost.date).format("MM/DD")}
                            </span>
                          </div>
                        </a>
                      </Link>
                    </div>
                  )
              )}
              <div className="col-md-12 text-center my-5 pt-5">
                <Link href={"/blog/category/" + slug}>
                  <a>
                    <button className="btn btn-dark px-5">
                      Explore {name}
                    </button>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
