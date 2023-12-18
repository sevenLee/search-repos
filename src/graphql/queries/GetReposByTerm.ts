import { gql } from '@apollo/client';

export const GET_REPOS_BY_TERM = gql`
  query GetReposByTerm($query: String!, $type: SearchType!, $cursor: String) {
    search(query: $query, type: $type, first: 30, after: $cursor) {
      nodes {
        ... on Repository {
          name
          url
          id
          forkCount
          stargazerCount
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;
