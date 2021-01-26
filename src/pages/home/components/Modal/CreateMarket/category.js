import React, { useState } from 'react';
import {
  Button,
  InputLabel,
  Select,
  FormControl,
  Box,
  Chip,
} from '@material-ui/core';
import { connect } from 'react-redux';

import { useStyles } from './modelStyle';
import { initalTags } from '../../../../../utility/tags';
import { addMarketTag, removeMarketTag } from './../../../../../redux';

const Category = (props) => {
  const [selectedTag, setSelectedTag] = useState('');
  const classes = useStyles();

  const handleAddTag = () => {
    if (props.marketData.selectedTags.includes(selectedTag) || !selectedTag) {
      return;
    }
    props.addMarketTag(selectedTag);
    setSelectedTag('');
  };

  const handleDeleteTag = (data) => {
    props.removeMarketTag(data);
  };

  return (
    <>
      <Box className={classes.modal__box}>
        <FormControl variant='outlined' className={classes.modal__formControl}>
          <InputLabel htmlFor='modal__inputLabel'>Category</InputLabel>
          <Select
            native
            id='modal__inputLabel'
            label='Category'
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.target.value)}
            inputProps={{
              name: 'Category',
              id: 'modal__inputLabel',
            }}
          >
            <option value='' />
            {initalTags.map((category) => (
              <optgroup key={category.category} label={category.category}>
                {category.tags.map((tag) => (
                  <option key={tag} value={tag}>
                    {tag}
                  </option>
                ))}
              </optgroup>
            ))}
          </Select>
        </FormControl>
        <Button
          variant='contained'
          color='primary'
          className={`${classes.modal__button}--add`}
          onClick={handleAddTag}
        >
          Add
        </Button>
      </Box>
      {props.marketData.selectedTags.length > 0 && (
        <Box>
          {props.marketData.selectedTags.map((tag, i) => (
            <Chip
              key={tag}
              variant='outlined'
              label={tag}
              className={classes.modal__chip}
              onDelete={() => handleDeleteTag(tag)}
            />
          ))}
        </Box>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    marketData: state.market,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addMarketTag: (tag) => dispatch(addMarketTag(tag)),
    removeMarketTag: (tag) => dispatch(removeMarketTag(tag)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Category);
