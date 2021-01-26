import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, InputBase, Divider } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { connect } from 'react-redux';
import { useDebounce } from 'use-debounce';

import { fetchSearch } from './../../../redux';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: '2rem',
    marginBottom: '1rem',
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  paper__input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  paper__iconButton: {
    padding: 10,
  },
  paper__divider: {
    height: 28,
    margin: 4,
  },
}));

const SearchField = (props) => {
  const [searchValue, setSearchValue] = useState('');
  const [value] = useDebounce(searchValue, 800);
  const classes = useStyles();

  useEffect(() => {
    props.fetchSearch(searchValue);
    // eslint-disable-next-line
  }, [value]);

  return (
    <Paper component='form' className={classes.paper}>
      <InputBase
        className={classes.paper__input}
        value={searchValue}
        placeholder='Search for markets...'
        onChange={(e) => setSearchValue(e.target.value)}
      />
      {searchValue && (
        <IconButton
          type='submit'
          className={classes.paper__iconButton}
          onClick={(e) => setSearchValue('')}
        >
          x
        </IconButton>
      )}
      <Divider className={classes.paper__divider} orientation='vertical' />
      <IconButton color='primary' className={classes.paper__iconButton}>
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

const mapStateToProps = (state) => {
  return {
    searchData: state.search,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSearch: (searchValue) => dispatch(fetchSearch(searchValue)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchField);
