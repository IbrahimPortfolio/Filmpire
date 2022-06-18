import React from 'react';
import { CssBaseline } from '@mui/material';
import { Route, Switch } from 'react-router-dom';
import {
  Actors,
  MovieInformation,
  Movies,
  NavBar,
  Profile
} from './components';

import useStyles from './styles';

export const App = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <NavBar />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Switch>
          <Route exact path="/movie/:id">
            <MovieInformation />
          </Route>
          <Route path="/actors/:id" element>
            <Actors />
          </Route>
          <Route exact path="/">
            <Movies />
          </Route>
          <Route path="/profile/:id" element>
            <Profile />
          </Route>
        </Switch>
      </main>
    </div>
  );
};
