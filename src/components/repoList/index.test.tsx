import React from 'react';
import { render, screen } from '@testing-library/react';
import { RepoList } from './index';

test('renders Repo list component if not repo is found', () => {
  render(
    <RepoList
      repos={[]}
      isLoadMore={false}
      loading={false}
      showStaredRepo={false}
      starRepo={() => {}}
      loadMore={() => {}}
    />
  );

  const loadMoreButton = screen.getByText(/Load More/i);
  expect(loadMoreButton).toBeInTheDocument();
});

test('renders Repo list component if found repos', () => {
  render(
    <RepoList
      repos={[
        {
          id: 2343212,
          name: 'vgo',
          description: 'Versioned Go Prototype',
          url: 'https://api.github.com/repos/golang/vgo',
          language: 'Go',
          stargazers_count: 1537,
          isStarred: false,
          owner: {
            id: 6028820,
            avatar_url: 'https://avatars.githubusercontent.com/u/6028820?v=4',
            url: 'https://api.github.com/users/Ramotion',
            starred_url:
              'https://api.github.com/users/Ramotion/starred{/owner}{/repo}',
          },
        },
      ]}
      isLoadMore={false}
      loading={false}
      showStaredRepo={false}
      starRepo={() => {}}
      loadMore={() => {}}
    />
  );

  const repoImage = screen.getByAltText(/vgo/i);
  expect(repoImage).toBeInTheDocument();

  const repoName = screen.getByText(/vgo/i);
  expect(repoName).toBeInTheDocument();

  const repoDescription = screen.getByText(/Versioned Go Prototype/i);
  expect(repoDescription).toBeInTheDocument();

  const respoStarCount = screen.getByText(/1537/i);
  expect(respoStarCount).toBeInTheDocument();

  const repoLink = screen.getByText(/Link/i);
  expect(repoLink).toBeInTheDocument();
});
