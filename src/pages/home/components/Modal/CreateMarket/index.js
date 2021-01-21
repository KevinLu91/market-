import React, { useState } from 'react';
import {
  Modal,
  Typography,
  Card,
  TextField,
  CardContent,
  CardActions,
  Button,
  Backdrop,
  Fade,
  InputLabel,
  Select,
  FormControl,
  Box,
  Chip,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { API, graphqlOperation } from 'aws-amplify';
import { createMarket } from '../../../../../graphql/mutations';
import { initalTags } from '../../../../../utility/tags';

import { useStyles } from './modelStyle';

const CreateMarket = (props) => {
  const [inputValue, setInputValue] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState('');
  const classes = useStyles();

  const handleSubmit = async () => {
    try {
      const marketDetails = {
        name: inputValue,
        tags: [selectedTag],
        owner: props.userData.user.username,
      };
      const newMarket = await API.graphql(
        graphqlOperation(createMarket, { input: marketDetails })
      );
      console.log(newMarket);
      console.log('ssuuubmit');
      handleModalClose();
    } catch (err) {
      console.error(err);
    }
  };

  const handleModalClose = () => {
    setInputValue('');
    setSelectedTags([]);
    setSelectedTag('');
    props.setCreate(!props.create);
  };

  const handleAddTag = () => {
    if (selectedTags.includes(selectedTag) || !selectedTag) {
      return;
    }
    setSelectedTags([...selectedTags, selectedTag]);
  };

  const handleDeleteTag = (data) => {
    setSelectedTags(selectedTags.filter((tag) => tag !== data));
  };

  return (
    <Modal
      className={classes.modal}
      open={props.create}
      onClose={handleModalClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={props.create}>
        <Card className={classes.modal__card}>
          <CardContent>
            <Typography
              variant='h5'
              component='h2'
              className={classes.modal__title}
            >
              Create new market
            </Typography>
            <Typography color='textSecondary'>Add market name:</Typography>
            <TextField
              fullWidth
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <Box className={classes.modal__box}>
              <FormControl
                variant='outlined'
                className={classes.modal__formControl}
              >
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
            {selectedTags.length > 0 && (
              <Box>
                {selectedTags.map((tag, i) => (
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
          </CardContent>
          <CardActions className={classes.modal__cardActions}>
            <Button variant='contained' onClick={handleModalClose}>
              Cancel
            </Button>
            <Button
              variant='contained'
              color='primary'
              onClick={handleSubmit}
              disabled={inputValue ? false : true}
            >
              Create
            </Button>
          </CardActions>
        </Card>
      </Fade>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  return {
    userData: state.user,
  };
};

export default connect(mapStateToProps)(CreateMarket);
