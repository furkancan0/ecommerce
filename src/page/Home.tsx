import React, { useState, useEffect } from 'react';
import Banner from '../components/Banner'
import ProductList from '../components/ProductList'
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../app/store';
import { fetchCartItems } from '../features/cart/cartThunk';
import { toast } from 'react-toastify';

const Home:React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  
  useEffect(() => {
      dispatch(fetchCartItems())
        .unwrap()
        .catch((err) => {
          //toast.error(err.message);  // Show error toast
        });
  }, [dispatch]);

  
  return (
    <>
    <Banner/>
    <ProductList/>
    </>
  )
}

export default Home