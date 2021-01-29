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
  CircularProgress,
} from '@material-ui/core';
import { Euro } from '@material-ui/icons';
import { connect } from 'react-redux';
import { Storage, API, graphqlOperation } from 'aws-amplify';
import { useParams } from 'react-router-dom';

import { useStyles, photoPickerTheme } from './NewProductStyle';
import { postProductSuccess, postProductFailure } from '../../../redux';
import aws_exports from '../../../aws-exports';
import UploadBar from '../../../components/UploadBar';
import { createProduct } from '../../../graphql/mutations';
import Success from '../../../utility/success';
import Error from '../../../utility/error';

const NewProduct = (props) => {
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [shipped, setShipped] = useState(true);
  const [imagePreview, setImagePreview] = useState('');
  const [productImage, setProductImage] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [percentUploaded, setPercentUploaded] = useState(0);
  const classes = useStyles();
  const { marketId } = useParams();

  const handlePrice = (e) => {
    const reg = new RegExp('(^$)|\\d+$'); // regex only '' or 0-9
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
      const visibility = 'public';
      const filename = `/${visibility}/${
        props.userData.userCredentials.identityId
      }/${Date.now()}-${productImage.name}`;
      const uploadedFile = await Storage.put(filename, productImage.file, {
        contentType: productImage.type,
        progressCallback: (progress) => {
          setPercentUploaded(
            Math.round(progress.loaded / progress.total) * 100
          );
        },
      });

      const input = {
        description,
        file: {
          key: uploadedFile.key,
          bucket: aws_exports.aws_user_files_s3_bucket,
          region: aws_exports.aws_user_files_s3_bucket_region,
        },
        productMarketId: marketId,
        price,
        shipped,
      };

      await API.graphql(graphqlOperation(createProduct, { input }));
      props.postProductSuccess(true);

      setTimeout(() => {
        setIsUploading(false);
        setDescription('');
        setPrice('');
        setShipped(true);
        setProductImage('');
        setPercentUploaded(0);
        setImagePreview('');
      }, 2000);
    } catch (err) {
      props.postProductFailure(true);
      console.log(err);
      setIsUploading(false);
    }
  };

  return (
    <Paper className={classes.paper}>
      <Success message='Product successfully created!' />
      <Error message='Product creation failed, try again!' />
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
            onChange={handlePrice}
            endAdornment={
              <InputAdornment position='end'>
                <Euro fontSize='small' color='inherit' />
              </InputAdornment>
            }
            labelWidth={70}
          />
        </FormControl>
        <Typography className={classes.paper__title}>
          Is the Product Shipped or mailed to the Customer?
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
              label='Mailed'
            />
          </RadioGroup>
        </FormControl>
        <Paper>
          {imagePreview && (
            <img
              src={imagePreview}
              alt='product'
              className={classes.paper__image}
            />
          )}
          <PhotoPicker
            preview='hidden'
            theme={photoPickerTheme}
            onLoad={(url) => setImagePreview(url)}
            onPick={(file) => setProductImage(file)}
          />
        </Paper>
        <UploadBar value={percentUploaded} />
        {isUploading ? (
          <Button
            variant='contained'
            onClick={handleCreateProduct}
            disabled={!description || (!productImage && true)}
            className={classes.paper__button}
          >
            <CircularProgress />
          </Button>
        ) : (
          <Button
            variant='contained'
            onClick={handleCreateProduct}
            disabled={!description || (!productImage && true)}
            className={classes.paper__button}
          >
            Add Product
          </Button>
        )}
      </form>
    </Paper>
  );
};

const mapStateToProps = (state) => {
  return {
    userData: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    postProductSuccess: (boolean) => dispatch(postProductSuccess(boolean)),
    postProductFailure: (boolean) => dispatch(postProductFailure(boolean)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewProduct);
