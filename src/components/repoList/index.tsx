/**
 * @desc Component to display repos
 * @author Pradeep Gill pradeepgill713@gmail.com
 */

import React, { FunctionComponent } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import CodeIcon from '@mui/icons-material/Code';
import StarsIcon from '@mui/icons-material/Stars';
import StarOutlineRoundedIcon from '@mui/icons-material/StarOutlineRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';

import { IRepo } from '../../utils/interface/repoList';

interface IPropTypes {
  //   repos: { [key: number]: IRepo};
  repos: IRepo[];
  loading: boolean;
  showStaredRepo: boolean;
  isLoadMore: boolean;
  starRepo: (id: number) => void;
  loadMore: () => void;
}

// Component for displaying the repos
export const RepoList: FunctionComponent<IPropTypes> = (props) => {
  const { repos, loading, showStaredRepo, isLoadMore, starRepo, loadMore } =
    props;

  /**
   * Template to display all repos and stared repos
   *
   * @param repo repo data that need to be shown
   */
  const getRepoTemplate = (repo: IRepo) => {
    return (
      <Paper
        key={repo.id}
        sx={{
          p: 2,
          margin: 'auto',
          mb: 1.5,
          mt: 1.5,
          maxWidth: 500,
          flexGrow: 1,
        }}
      >
        <Grid container spacing={2}>
          <Grid item>
            <img
              alt={`${repo.name}`}
              src={`${repo.owner.avatar_url}`}
              style={{ width: 128, height: 128 }}
            />
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction='column' spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant='subtitle1' component='div'>
                  {repo.name}
                </Typography>
                <Typography variant='body2' gutterBottom>
                  {repo.description || 'Description not available'}
                </Typography>
                <Box display='flex'>
                  <StarsIcon />
                  <Box ml={1}>
                    <Typography>{repo.stargazers_count}</Typography>
                  </Box>
                </Box>

                <Box display='flex'>
                  <CodeIcon />
                  <Box ml={1}>
                    <Typography>{repo.language}</Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item>
                <Button
                  variant='contained'
                  target='_blank'
                  href={`${repo.url}`}
                >
                  Link
                </Button>
              </Grid>
            </Grid>
            <Grid item>
              <Button onClick={() => starRepo(repo.id)}>
                {repo.isStarred ? (
                  <StarRoundedIcon />
                ) : (
                  <StarOutlineRoundedIcon />
                )}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    );
  };

  // return loading state if loading
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <CircularProgress />
      </Box>
    );
  }

  // show all repos and stared repo
  return (
    <>
      {repos.map((repo: IRepo) => {
        if (showStaredRepo && repo.isStarred) {
          return getRepoTemplate(repo);
        }
        if (!showStaredRepo) {
          return getRepoTemplate(repo);
        }
        return null;
      })}
      {!showStaredRepo ? (
        !isLoadMore ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Button variant='contained' onClick={() => loadMore()}>
              Load More
            </Button>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <CircularProgress />
          </Box>
        )
      ) : null}
    </>
  );
};
