import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Grid, Card, CardContent, Typography, Select, MenuItem, FormControl, InputLabel, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('');
  const [company, setCompany] = useState('');
  const [rating, setRating] = useState('');
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [availability, setAvailability] = useState('');

  useEffect(() => {
    fetchProducts();
  }, [category, company, rating, priceRange, availability]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`http://20.244.56.144/test/companies/${company}/categories/${category}/products`, {
        params: {
          top: 10,
          minPrice: priceRange[0],
          maxPrice: priceRange[1]
        }
      });
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  return (
    <Container>
      <FormControl fullWidth>
        <InputLabel>Category</InputLabel>
        <Select value={category} onChange={(e) => setCategory(e.target.value)}>
          {/* Add categories here */}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel>Company</InputLabel>
        <Select value={company} onChange={(e) => setCompany(e.target.value)}>
          {/* Add companies here */}
        </Select>
      </FormControl>
      {/* Add more filters for rating, price range, availability */}
      <Button onClick={fetchProducts}>Fetch Products</Button>
      <Grid container spacing={3}>
        {products.map(product => (
          <Grid item xs={12} sm={6} md={4} key={product.uniqueId}>
            <Card>
              <CardContent>
                <Typography variant="h5">{product.name}</Typography>
                <Typography variant="body2">{product.company}</Typography>
                <Typography variant="body2">{product.price}</Typography>
                <Link to={`/product/${product.uniqueId}`}>View Details</Link>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProductList;
