/* eslint-disable operator-linebreak */
import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  useTheme
} from '@mui/material';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useGetGenresQuery } from '../../services/TMDB';
import { Loader } from '..';
import genreIcons from '../../assets/genres';

import useStyles from './styles';
import { selectGenreOrCategory } from '../../features/currentGenreOrCategory';

const categories = [
  {
    label: 'Popular',
    value: 'popular'
  },
  {
    label: 'Top Rated',
    value: 'top_rated'
  },
  {
    label: 'Upcoming',
    value: 'upcoming'
  }
];

const redLogo =
  'https://fontmeme.com/permalink/210930/8531c658a743debe1e1aa1a2fc82006e.png';
const blueLogo =
  'https://fontmeme.com/permalink/210930/6854ae5c7f76597cf8680e48a2c8a50a.png';

const Sidebar = ({ setMobileOpen }) => {
  const { genreIdOrCategoryName } = useSelector(
    (state) => state.currentGenreOrCategory
  );

  const { data, isFetching } = useGetGenresQuery();
  const dispatch = useDispatch();

  const classes = useStyles();

  const theme = useTheme();
  useEffect(() => {
    return () => {};
  }, []);

  return (
    <>
      <Link to="/" className={classes.imageLink}>
        <img
          className={classes.image}
          src={theme.palette.mode === 'light' ? redLogo : blueLogo}
          alt="Filmpire Logo"
        />
      </Link>
      <Divider />
      <List>
        <ListSubheader>Categories</ListSubheader>
        {categories.map(({ label, value }) => (
          <Link key={value} className={classes.links} to="/">
            <ListItem
              onClick={() => dispatch(selectGenreOrCategory(value))}
              button
            >
              <ListItemIcon>
                <img
                  src={genreIcons[label.toLowerCase()]}
                  className={classes.genreImages}
                  height={30}
                />
              </ListItemIcon>
              <ListItemText primary={label} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        <ListSubheader>Genres</ListSubheader>
        {isFetching ? (
          <Loader />
        ) : (
          data.genres.map(({ name, id }) => (
            <Link key={name} className={classes.links} to="/">
              <ListItem
                onClick={() => dispatch(selectGenreOrCategory(id))}
                button
              >
                <ListItemIcon>
                  <img
                    src={genreIcons[name.toLowerCase()]}
                    className={classes.genreImages}
                    height={30}
                  />
                </ListItemIcon>
                <ListItemText primary={name} />
              </ListItem>
            </Link>
          ))
        )}
      </List>
    </>
  );
};

export default Sidebar;
