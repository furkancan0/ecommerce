import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addToCart } from '../features/cart/cartThunk';
import axios from 'axios';
import { Product } from '../types/product';
import { AppDispatch } from '../app/store';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
const SingleProductPage: React.FC = () => {
  const { id }= useParams();
  const dispatch = useDispatch<AppDispatch>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get<Product>(`https://fakestoreapi.com/products/${id}`);
        setProduct(response.data);
      } catch (err) {
        setError('Failed to load product');
        toast.error('Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (product) {
      try {
        // Dispatch addToCart and unwrap to handle success or failure
        await dispatch(addToCart(product.id)).unwrap();
        toast.success(`${product.name} has been added to the cart!`);
      } catch (err) {
        toast.error('Failed to add product to cart');  // Show error toast if dispatch fails
      }
    }
  };

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    toast.error('Failed to add product to cart');
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (

<section className="h-screen bg-gray-50 flex  py-8 antialiased dark:bg-gray-900 md:py-12">
<div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
  <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">


  {product.images ? (
    <div className="shrink-0 max-w-md lg:max-w-lg mx-auto">
      <img className="w-full dark:hidden" src="https://as1.ftcdn.net/v2/jpg/08/04/16/32/1000_F_804163250_esXVmK3teI25YIFl5586rxkXMeTsToT2.jpg" alt="" />
    </div>):(
    <div className="w-full h-96 bg-gray-200 flex items-center justify-center">No Image Available</div>)}

    <div className="mt-6 sm:mt-8 lg:mt-0">
      <h1
        className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white"
      >
        {product.name}
      </h1>
      <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
        <p
          className="text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white"
        >
          $1,249.99
        </p>

        <div className="flex items-center gap-2 mt-2 sm:mt-0">
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"/>
            </svg>
          </div>
          <p className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400">
            (5.0)
          </p>
          <a href="#" className="text-sm font-medium leading-none text-gray-900 underline hover:no-underline dark:text-white">
            345 Reviews
          </a>
        </div>
      </div>

      <div className="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
        <button className="inline-flex items-center rounded-lg bg-primary-700 px-1 py-2 text-sm font-medium text-black hover:bg-gray-100 ">
        <svg className="feather feather-heart" fill="none" height="22" stroke="currentColor" stroke-linecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
              <div className='mx-1'>Favorilere Ekle</div>
        </button> 

        <button onClick={()=>handleAddToCart()} className="inline-flex items-center rounded-lg bg-primary-700 px-1 py-2 text-sm font-medium text-black hover:bg-gray-100 ">
        <svg className="feather feather-shopping-cart" fill="none" height="20" stroke="currentColor" stroke-linecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg> 
            <div className='mx-1'>Sepete Ekle</div>
        </button>
      </div>

      <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800" />

      <p className="mb-6 text-gray-500 dark:text-gray-400">
        Studio quality three mic array for crystal clear calls and voice
        recordings. Six-speaker sound system for a remarkably robust and
        high-quality audio experience. Up to 256GB of ultrafast SSD storage.
      </p>

      <p className="text-gray-500 dark:text-gray-400">
        Two Thunderbolt USB 4 ports and up to two USB 3 ports. Ultrafast
        Wi-Fi 6 and Bluetooth 5.0 wireless. Color matched Magic Mouse with
        Magic Keyboard or Magic Keyboard with Touch ID.
      </p>
    </div>
  </div>
</div>
</section>





















  );
};

export default SingleProductPage;