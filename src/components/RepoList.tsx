import { useInView } from 'react-intersection-observer';
import { useGetReposByTermQuery, SearchType, Repository } from '../generated/graphql';
import { PulseLoader } from 'react-spinners';
import { useEffect } from 'react';
import colors from 'tailwindcss/colors';
import { NetworkStatus } from '@apollo/client';
import usePrevious from '../hooks/usePrevious';

type RepoList = {
  searchTerm: string;
};

const RepoList = ({ searchTerm }: RepoList) => {
  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  const preQuery = usePrevious<string>(searchTerm);
  const { data, networkStatus, error, fetchMore, client } = useGetReposByTermQuery({
    variables: { query: searchTerm || 'react', type: SearchType.Repository },
    notifyOnNetworkStatusChange: true,
  });

  const preNetworkStatus = usePrevious<NetworkStatus>(networkStatus);

  if (preQuery !== undefined && preQuery.length > searchTerm.length) {
    client.resetStore();
  }

  useEffect(() => {
    if (
      inView &&
      data?.search.pageInfo.hasNextPage &&
      preNetworkStatus !== NetworkStatus.fetchMore
    ) {
      fetchMore({
        variables: {
          cursor: data.search.pageInfo.endCursor,
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          const newRepos = fetchMoreResult.search.nodes as Repository[];
          const preRepos = previousResult.search.nodes as Repository[];

          return {
            search: {
              nodes: [...preRepos, ...newRepos],
              pageInfo: {
                endCursor: fetchMoreResult.search.pageInfo.endCursor,
                hasNextPage: fetchMoreResult.search.pageInfo.hasNextPage,
              },
            },
          };
        },
      });
    }
  }, [
    data?.search.pageInfo.endCursor,
    data?.search.pageInfo.hasNextPage,
    fetchMore,
    inView,
    preNetworkStatus,
  ]);

  if (error) {
    return <div className="rounded-lg p-4 bg-red-200">Search Error: {error.message}</div>;
  }

  if (!data || networkStatus === NetworkStatus.loading) {
    return <div className="bg-slate-200 rounded-lg p-4">Loading...</div>;
  }

  const repos = data.search.nodes as Repository[];
  if (repos.length === 0) {
    return (
      <div className="bg-slate-200 rounded-lg p-4">
        Not found any repository, please try another name.
      </div>
    );
  }

  return (
    <ul className="border border-slate-300 text-sm md:text-base overflow-y-auto h-[calc(100vh-263px)]">
      {repos.map((repo) => (
        <li
          key={repo.id}
          className="flex justify-between px-2 md:px-4 py-2 border-b"
          data-testid="repo-item"
        >
          <a
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-sky-600"
          >
            {repo.name}
          </a>
          <div className="flex">
            <div className="py-1 px-2 bg-slate-200 rounded-lg mr-2">🌟 {repo.stargazerCount}</div>
            <div className="py-1 px-2 bg-slate-200 rounded-lg">🍴 {repo.forkCount}</div>
          </div>
        </li>
      ))}
      <div className="flex justify-center py-2" ref={ref}>
        {data.search.pageInfo.hasNextPage ? <PulseLoader color={colors.sky[100]} /> : ''}
      </div>
    </ul>
  );
};

export default RepoList;
