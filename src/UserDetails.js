import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Container, Grid, Avatar, Paper, makeStyles, CircularProgress, IconButton } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
  },
  avatar: {
    width: theme.spacing(12),
    height: theme.spacing(12),
  },
  paper: {
    padding: theme.spacing(3),
    backgroundColor: '#333',
    color: '#fff',
    border: '1px solid #00ff00',
    boxShadow: '0px 4px 15px rgba(0, 255, 0, 0.3)', 
    borderRadius: '10px',
  },
  username: {
    color: '#00ff00',
  },
  centerAvatar: {
    margin: 'auto',
    display: 'block',
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  loadingText: {
    marginLeft: theme.spacing(1),
  },
  loadingIcon: {
    color: '#00ff00',
  },
  backButton: {
    color: '#000',
    marginBottom: theme.spacing(2),
  },
  greenText: {
    color: '#00ff00',
  },
}));

function UserDetails() {
  const classes = useStyles();
  const history = useNavigate();
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`https://api.github.com/users/${username}`)
      .then(response => response.json())
      .then(data => {
        setUser(data);
        setLoading(false);
      })
      .catch(error => console.error('Error fetching user:', error));
  }, [username]);

  const handleBack = () => {
    history("/")
  };

  if (loading) {
    return (
      <div className={classes.loadingContainer}>
        <CircularProgress className={classes.loadingIcon} />
        <Typography variant="body1" className={classes.loadingText}>Loading...</Typography>
      </div>
    );
  }

  return (
    <Container className={classes.root}>
      <IconButton className={classes.backButton} onClick={handleBack}>
        <ArrowBack />
      </IconButton>
      <Typography variant="h6" style={{ fontWeight: 'bold' }} gutterBottom>User Details</Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Paper className={classes.paper}>
            <Avatar className={`${classes.avatar} ${classes.centerAvatar}`} src={user.avatar_url} />
            <Typography variant="h6" align="center" className={classes.username}>{user.name}</Typography>
            <Typography variant="subtitle1" align="center" className={classes.username}>@{user.login}</Typography>
            {user.blog && (
              <Typography variant="body1" align="center" className={classes.greenText}>Website: <a href={user.blog} className={classes.greenText} target="_blank" rel="noopener noreferrer">{user.blog}</a></Typography>
            )}
          </Paper>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Paper className={classes.paper}>
            <Typography variant="body1">Company: {user.company || 'N/A'}</Typography>
            <Typography variant="body1">Followers: {user.followers}</Typography>
            <Typography variant="body1">Following: {user.following}</Typography>
            <Typography variant="body1">Public Repositories: {user.public_repos}</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default UserDetails;
