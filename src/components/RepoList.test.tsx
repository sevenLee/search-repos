import {
  resetIntersectionMocking,
  setupIntersectionMocking,
} from 'react-intersection-observer/test-utils';
import { beforeEach, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import RepoList from './RepoList';
import { SearchType } from '../generated/graphql';
import { GET_REPOS_BY_TERM } from '../graphql/queries/GetReposByTerm';

describe('RepoList', () => {
  beforeEach(() => {
    setupIntersectionMocking(vi.fn);
    return () => {
      resetIntersectionMocking();
    };
  });

  it('renders loading state initially', () => {
    render(
      <MockedProvider>
        <RepoList searchTerm="react" />
      </MockedProvider>,
    );
    expect(screen.getByText('Loading...')).toBeVisible();
  });

  it('displays list correctly by query "react"', async () => {
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
                __typename: 'Repository',
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
        <RepoList searchTerm="react" />
      </MockedProvider>,
    );
    expect(await screen.findAllByTestId('repo-item')).toHaveLength(1);
    expect(await screen.findByText('react')).toBeVisible();
    expect(await screen.findByText(/4010/)).toBeVisible();
    expect(await screen.findByText(/43107/)).toBeVisible();
  });

  it('displays not found when data is empty', async () => {
    const mockData = {
      request: {
        query: GET_REPOS_BY_TERM,
        variables: { query: 'react', type: SearchType.Repository },
      },
      result: {
        data: {
          search: {
            nodes: [],
            pageInfo: {},
          },
        },
      },
    };
    render(
      <MockedProvider mocks={[mockData]} addTypename={false}>
        <RepoList searchTerm="react" />
      </MockedProvider>,
    );
    expect(await screen.findByText(/Not found any repository/)).toBeVisible();
  });

  it('displays error message when request error', async () => {
    const mockData = {
      request: {
        query: GET_REPOS_BY_TERM,
        variables: { query: 'react', type: SearchType.Repository },
      },
      result: {
        data: undefined,
      },
      error: new Error('404 Error'),
    };
    render(
      <MockedProvider mocks={[mockData]} addTypename={false}>
        <RepoList searchTerm="react" />
      </MockedProvider>,
    );
    expect(await screen.findByText(/404 Error/)).toBeVisible();
  });
});
