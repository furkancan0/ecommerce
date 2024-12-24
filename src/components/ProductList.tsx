import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../features/products/productsThunk';
import { AppDispatch, RootState } from '../app/store';
import ProductItem from './ProductItem';
import Spinner from './Spinner';

const ProductList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, status } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [dispatch]);

  if (status === 'loading') {
    return <Spinner/>
  }

  if (status === 'failed') {
    return <div>Failed to load products</div>;
  }

  return (
    <section className="bg-black-50 py-3 border-t-1 border-black-300 dark:bg-gray-900 md:py-12">
      <div className='mx-auto border-t-4 border-black-300 mb-2 text-xl w-3/4 p-2 2xl:px-0 rounded-lg '>Popüler Ürünler</div>
      <div className='bg-gray-100 p-2 w-3/4 mx-auto'>
      <div className="mx-auto max-w-screen-xl px-2 2xl:px-0">
            <div className="h-1/2 grid gap-4 sm:grid-cols-2 md:mb-2 lg:grid-cols-3 xl:grid-cols-5 mt-2">
                {products.slice(0,5).map((p) => (
                    <ProductItem key={p.id} {...p} />
                ))}
            </div>
      </div>
    </div>
    </section>
  );
};

export default ProductList;