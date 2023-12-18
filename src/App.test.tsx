import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import { MockedProvider } from '@apollo/client/testing';
import { GET_REPOS_BY_TERM } from './graphql/queries/GetReposByTerm';
import { SearchType } from './generated/graphql';
import {
  resetIntersectionMocking,
  setupIntersectionMocking,
} from 'react-intersection-observer/test-utils';

describe('App', () => {
  beforeEach(() => {
    setupIntersectionMocking(vi.fn);
    return () => {
      resetIntersectionMocking();
    };
  });
  it('renders initial UI elements correctly', () => {
    render(
      <MockedProvider>
        <App />
      </MockedProvider>,
    );
    expect(screen.getByText('Search a repository as you like.')).toBeVisible();
    expect(screen.getByText('react related repositories by default.')).toBeVisible();
    expect(screen.getByPlaceholderText('Search a repository name')).toBeVisible();
  });

  it('should show list when the search term changes', async () => {
    const mockData = {
      request: {
        query: GET_REPOS_BY_TERM,
        variables: { query: 'react', type: SearchType.Repository },
      },
      result: {
        data: {
          search: {
            nodes: [
              {
                name: 'react',
                url: 'https://github.com/typescript-cheatsheets/react',
                id: 'MDEwOlJlcG9zaXRvcnkxMzU3ODYwOTM=',
                forkCount: 4010,
                stargazerCount: 43107,
              },
            ],
            pageInfo: {},
          },
        },
      },
    };
    render(
      <MockedProvider mocks={[mockData]} addTypename={false}>
        <App />
      </MockedProvider>,
    );
    const searchInput = screen.getByPlaceholderText('Search a repository name');
    fireEvent.change(searchInput, { target: { value: 'react' } });

    expect(await screen.findAllByTestId('repo-item')).toHaveLength(1);
  });
});
