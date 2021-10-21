/**
 * @desc this is the custome hook to get data from the server.
 * @author Pradeep Gill pradeepgill713@gmail.com
 */

import { useState, useEffect } from 'react';
import axios from 'axios';

import { CONFIG } from '../config/';
import { InitialData } from '../utils/interface/repoList';

const { BASE_URL_DEV, BASE_URL_PROD, LIMIT_PER_PAGE } = CONFIG;

// best repo from last 7 day from now
const date = new Date();
date.setDate(date.getDate() - 7);
const queryDateTime = date.toISOString().substr(0, 10);

// API service to get the result from server
const getRepos = async (pageNumber: number, language: string) => {
  let response: any;
  let error: string = '';
  let query = `q=created:>${queryDateTime}+language:${language}&sort=stars&order=desc&per_page=${LIMIT_PER_PAGE}&page=${pageNumber}`;

  let requestUrl = BASE_URL_DEV;
  if (process.env.NODE_ENV === 'production') {
    requestUrl = BASE_URL_PROD;
  }

  if (query) {
    requestUrl = `${requestUrl}?${query}`;
  }

  try {
    response = await axios.get(requestUrl);
    response = response as any;
  } catch (err) {
    error = (err as Error).message;
  }

  return { response, error };
};

/**
 * 
 * @param initialData initial data for repo and count the number of pages
 * @param hasLoadMore loader for load more repos on load more button click
 */
const useGetRepos = (initialData: InitialData, hasLoadMore: boolean, language: string) => {

  const [data, setData] = useState(initialData);
  const [error, setError] = useState('');
  const [loading, setloading] = useState(false);
  const [isLoadMore, setIsLoadMore] = useState(false);

  useEffect(() => {
    hasLoadMore ? setIsLoadMore(true) : setloading(true);
    const getData = async () => {
      const { response, error } = await getRepos(initialData.currentPage, language);

      const normalizedResponse = {
        ...initialData,
        repos: [
          ...initialData.repos,
          ...parseResponse(response?.data.items || []),
        ],
        currentPage: initialData.currentPage,
        totalPages: Math.ceil(response?.data.total_count / LIMIT_PER_PAGE) || 0,
      };
      setData(normalizedResponse);
      setIsLoadMore(false);
      setloading(false);
      setError(error);
    };

    getData();
  }, [initialData.currentPage, language]);

  return [data, isLoadMore, loading, error] as const;
};

/**
 * 
 * @param items api response
 * @returns normalized data as repo list
 */
const parseResponse = (items: Object[]) => {
  return items.map((item: any) => ({
    id: item.id,
    name: item.name,
    description: item.description,
    url: item.html_url,
    language: item.language,
    stargazers_count: item.stargazers_count,
    isStarred: item.isStarred || false,
    owner: {
      id: item.owner.id,
      avatar_url: item.owner.avatar_url,
      url: item.owner.url,
      starred_url: item.owner.starred_url,
    },
  }));
};

export default useGetRepos;
