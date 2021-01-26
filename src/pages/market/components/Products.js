import React, { useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';

import { listProducts } from '../../../graphql/queries';

const Products = () => {
  useEffect(() => {
    API.graphql(graphqlOperation(listProducts))
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <p>products</p>
    </div>
  );
};

export default Products;
