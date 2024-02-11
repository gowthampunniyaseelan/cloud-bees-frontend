import React, { useState, useEffect } from 'react';
import { Typography, Container, Card, CardContent, CardHeader, Avatar, Grid, makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  card: {
    backgroundColor: '#222',
    color: '#fff',
    borderRadius: '12px',
    transition: 'transform 0.3s ease-in-out',
    '&:hover': {
      transform: 'scale(1.02)',
    },
  },
  avatar: {
    backgroundColor: '#333',
  },
  link: {
    color: '#ff4081',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  whiteText: {
    color: '#fff',
  },
}));

function UserListPage() {
  const classes = useStyles();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('https://api.github.com/users')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  return (
    <Container className={classes.container}>
      <Grid container spacing={3}>
        {users.map(user => (
          <Grid item xs={12} sm={6} md={4} key={user.id}>
            <Card className={classes.card}>
              <CardHeader
                avatar={<Avatar className={classes.avatar} src={user.avatar_url} />}
                title={<Typography variant="subtitle1" className={classes.whiteText}>{user.login}</Typography>} 
                subheader={<Typography variant="body2" className={classes.whiteText}>{user.type}</Typography>} 
              />
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p" className={classes.whiteText}>
                  {user.bio || 'No bio available'}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p" className={classes.whiteText}>
                  Public Repositories: {user.public_repos}
                </Typography>
                <Link className={classes.link} to={`/user/${user.login}`}>View Details</Link>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default UserListPage;
