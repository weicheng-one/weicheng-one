import gql from "graphql-tag";

export const GET_POSTS = gql`
  query getPosts($first: Int!) {
    posts(where: { orderby: { field: DATE, order: DESC } }, first: $first) {
      nodes {
        id
        date
        title
        uri
        excerpt
      }
    }
  }
`;
