/**
 * @desc Interface for repo list component
 * @author Pradeep Gill pradeepgill713@gmail.com
 */

export interface IOwner {
  id: number;
  avatar_url: string;
  url: string;
  starred_url: string;
}

export interface IRepo {
  id: number;
  name: string;
  owner: IOwner;
  description: string;
  url: string;
  language: string;
  stargazers_count: number;
  isStarred: boolean;
}

export interface InitialData {
  repos: IRepo[];
  currentPage: number;
  totalPages: number;
}
