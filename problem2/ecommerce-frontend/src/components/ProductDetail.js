import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Typography } from '@mui/material';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`http://20.244.56.144/test/products/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.error("Error fetching product", error);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Typography variant="h2">{product.name}</Typography>
      <Typography variant="h4">{product.company}</Typography>
      <Typography variant="h6">{product.price}</Typography>
      <Typography variant="body1">{product.description}</Typography>
    </Container>
  );
};

export default ProductDetail;
