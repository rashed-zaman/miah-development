export const ALL_POSTS = `
query AllPosts {
  posts(first: 20, where: { orderby: { field: DATE, order: DESC}}) {
      nodes {
      id
      link
      title
      slug
      date
      featuredImage {
        node {
          altText
          mediaItemUrl
        }
      }
      date
      content(format: RENDERED)
      }
  }
}
`;
export const POSTS_BY_Id = `
query AllPosts {
  posts(first: 20, where: { orderby: { field: DATE, order: DESC}}) {
      nodes {
        id
        date
        title
        slug
        excerpt
      }
  }
}
`;
