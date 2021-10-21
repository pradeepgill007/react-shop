/**
 * @desc This is the parent component for displaying repos
 * @author Pradeep Gill pradeepgill713@gmail.com
 */

import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import useGetRepos from './service';
import { InitialData } from './utils/interface/repoList';
import { RepoList } from './components/repoList/';
import './App.css';

const initialData: InitialData = {
  repos: [],
  currentPage: 1,
  totalPages: 0,
};

function App() {
  // search text filed value holder and setter
  const [dataTest, setTestData] = useState(initialData);
  const [value, setValue] = useState('allRepo');
  const [hasLoadMore, sethasLoadMore] = useState(false);

  // custome hook to get data from server
  const [data, isLoadMore, loading, error] = useGetRepos(dataTest, hasLoadMore);

  // update state when response from server
  useEffect(() => {
    setTestData(data);
  }, [data]);

  // update tab state
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  /**
   * Function to start the repo
   *
   * @param id  id of repo that need to be stared
   */
  const starRepo = (id: number) => {
    const clone = { ...dataTest };
    clone.repos.forEach((item) => {
      if (item.id === id) {
        item.isStarred = !item.isStarred;
      }
    });
    setTestData(clone);
  };

  /**
   * @desc this function is used to load more repos data from the server.
   */
  const loadMore = () => {
    const clone = { ...dataTest };
    clone.currentPage = clone.currentPage + 1;
    setTestData(clone);
    sethasLoadMore(true);
  };

  // return error if there is any
  if (error) {
    return <>{error}</>;
  }

  // repo list component with tab
  return (
    <TabContext value={value}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <TabList onChange={handleChange} centered>
          <Tab label='All Repo' value='allRepo' />
          <Tab label='Stared Repo' value='staredRepo' />
        </TabList>
      </Box>
      <TabPanel value='allRepo'>
        <RepoList
          repos={dataTest.repos}
          isLoadMore={isLoadMore}
          loading={loading}
          showStaredRepo={false}
          starRepo={starRepo}
          loadMore={loadMore}
        />
      </TabPanel>
      <TabPanel value='staredRepo'>
        <RepoList
          repos={dataTest.repos}
          isLoadMore={isLoadMore}
          loading={loading}
          showStaredRepo={true}
          starRepo={starRepo}
          loadMore={loadMore}
        />
      </TabPanel>
    </TabContext>
  );
}

export default App;
