export const ALL_POSTS = `
query AllPosts {
  posts(first: 1, where: { orderby: { field: DATE, order: DESC}}) {
      nodes {
      id
      link
      title
      slug
      excerpt
      date
      featuredImage {
        node {
          altText
          mediaItemUrl
        }
      }
      date
      content(format: RENDERED)
      categories {
        nodes {
          name
          slug
        }
      }
      }
  }
}
`;

export const ALL_HOME_POSTS = `
query AllPosts {
  posts(first: 10, where: { orderby: { field: DATE, order: DESC}}) {
      nodes {
      id
      link
      title
      slug
      excerpt
      date
      featuredImage {
        node {
          altText
          mediaItemUrl
        }
      }
      date
      content(format: RENDERED)
      categories {
        nodes {
          name
          slug
        }
      }
      }
  }
}
`;

export const ALL_CATEGORIES_WITH_POSTS = `
query AllCategoriesWithPosts {
  categories {
    nodes {
      id
      name
      slug
      description
      posts(first: 10, where: { orderby: { field: DATE, order: DESC}}) {
        nodes {
          id
          title
          slug
          date
          excerpt
          link
          featuredImage {
            node {
              mediaItemUrl
              altText
            }
          }
        }
      }
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

// Single post by slug
export const POST_BY_SLUG = `
  query PostBySlug($id: ID!, $idType: PostIdType!) {
    post(id: $id, idType: $idType) {
      id
      title
      content
      date
      featuredImage {
        node {
          mediaItemUrl
          altText
        }
      }
      categories {
        nodes {
          id
          name
          slug
        }
      }
    }
  }
`;

// Get all categories
export const ALL_CATEGORIES = `
  query AllCategories {
    categories(first: 20) {
      nodes {
        id
        name
        slug
      }
    }
  }
`;

// Posts by category
export const POSTS_BY_CATEGORY = `
  query PostsByCategory($slug: String!) {
    posts(where: { categoryName: $slug }, first: 10) {
      nodes {
        id
        title
        slug
        date
        excerpt
        featuredImage {
          node {
            mediaItemUrl
            altText
          }
        }
      }
    }
  }
`;
