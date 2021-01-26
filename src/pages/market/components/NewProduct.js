import React, { useState } from 'react';
import { PhotoPicker } from 'aws-amplify-react';
import {
  Typography,
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  Button,
  Paper,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
  LinearProgress,
} from '@material-ui/core';
import { Euro } from '@material-ui/icons';
import { connect } from 'react-redux';
import { Storage, Auth, API, graphqlOperation } from 'aws-amplify';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

import { useStyles, photoPickerTheme } from './NewProductStyle';
import { createMarketProduct } from '../../../redux';
import aws_exports from '../../../aws-exports';
import { createProduct } from '../../../graphql/mutations';

const NewProduct = (props) => {
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [shipped, setShipped] = useState(true);
  const [productImage, setProductImage] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [percentUploaded, setPercentUploaded] = useState(0);
  const classes = useStyles();
  const { marketId } = useParams();

  const handePrice = (e) => {
    const reg = new RegExp('^\\d+$');
    if (!reg.test(e.target.value)) {
      return;
    }
    setPrice(e.target.value);
  };

  const handleShipped = () => {
    setShipped(!shipped);
  };

  const handleCreateProduct = async () => {
    try {
      setIsUploading(true);
      console.log(productImage);
      const visibility = 'public';
      const { identityId } = await Auth.currentCredentials();
      const filename = `/${visibility}/${identityId}/${Date.now()}-${
        productImage.name
      }`;
      const uploadedFile = await Storage.put(filename, productImage.file, {
        contentType: productImage.type,
        progressCallback: (progress) => {
          setPercentUploaded(
            Math.round(progress.loaded / progress.total) * 100
          );
        },
      });

      const file = {
        key: uploadedFile.key,
        bucket: aws_exports.aws_user_files_s3_bucket,
        region: aws_exports.aws_user_files_s3_bucket_region,
      };

      const input = {
        description,
        file,
        productMarketId: marketId,
        price,
        shipped,
      };

      const result = await API.graphql(
        graphqlOperation(createProduct, { input })
      );
      console.log(result);
      // props.createMarketProduct(input);
    } catch (err) {
      console.log(err);
    }
  };

  const LinearProgressWithLabel = (value) => {
    return (
      <Box display='flex' alignItems='center'>
        <Box width='100%' mr={1}>
          <LinearProgress variant='determinate' value={value} />
        </Box>
        <Box minWidth={35}>
          <Typography variant='body2' color='textSecondary'>{`${Math.round(
            value
          )}%`}</Typography>
        </Box>
      </Box>
    );
  };

  return (
    <Paper className={classes.paper}>
      <Typography variant='h5' className={classes.paper__title}>
        ADD NEW PRODUCT
      </Typography>
      <form>
        <Typography className={classes.paper__title}>
          Add Product Description
        </Typography>
        <TextField
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          label='Description'
          variant='outlined'
        />
        <Typography className={classes.paper__title}>
          Set Product Price
        </Typography>
        <FormControl variant='outlined'>
          <InputLabel htmlFor='outlined-adornment-password'>
            Product Price
          </InputLabel>
          <OutlinedInput
            value={price}
            type='number'
            onChange={handePrice}
            endAdornment={
              <InputAdornment position='end'>
                <Euro fontSize='small' color='inherit' />
              </InputAdornment>
            }
            labelWidth={70}
          />
        </FormControl>
        <Typography className={classes.paper__title}>
          Is the Product Shipped or Emailed to the Customer?
        </Typography>
        <FormControl component='fieldset'>
          <RadioGroup row value={shipped} onChange={handleShipped}>
            <FormControlLabel
              value={true}
              control={<Radio />}
              label='Shipped'
            />
            <FormControlLabel
              value={false}
              control={<Radio />}
              label='Emailed'
            />
          </RadioGroup>
        </FormControl>
        <Paper>
          <PhotoPicker
            preview
            theme={photoPickerTheme}
            onPick={(file) => setProductImage(file)}
          />
        </Paper>
        {LinearProgressWithLabel(percentUploaded)}
        <Button
          variant='contained'
          onClick={handleCreateProduct}
          disabled={!description || (!productImage && true)}
          className={classes.papper__button}
        >
          Add Product
        </Button>
      </form>
    </Paper>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    createMarketProduct: (data) => dispatch(createMarketProduct(data)),
  };
};

export default connect(null, mapDispatchToProps)(NewProduct);
