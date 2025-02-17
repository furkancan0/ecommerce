import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../app/store';
import { toast } from 'react-toastify';
import { fetchCartItems } from '../features/cart/cartThunk';
import Spinner from './Spinner';
import { Link } from 'react-router-dom';

const SideCart: React.FC<{ isOpen: boolean; setIsSideCartOpen: (isOpen: boolean) => void }> = ({ isOpen, setIsSideCartOpen }) => {
  const cart = useSelector((state: RootState) => state.cart);

  return (
    <div className="w-1/4 rounded-xl bg-gray-50 w-1/4 mt-4 absolute rounded-r shadow-[0_3px_10px_rgb(0,0,0,0.2)] top-12 right-0 flex flex-col gap-6 z-20">
            <div className="sm:px-8 sm:py-6">
                <ul className="-my-12">
                <div className='flex mt-5 pt-5'>
                    <svg className="mt-1 feather feather-shopping-cart" fill="none" height="20" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg> 
                    <div className='ml-1'>Your Basket</div>
                </div>
                <hr className="h-px my-4 bg-gray-400 border-0 dark:bg-gray-700"></hr>
                {!cart?.cartItems? (
                    <div className="mt-3 pt-4">Cart is Empty</div>
                ) : (cart.cartItems.map(item => 
                <li key={item.id} className="flex flex-col space-y-3 pt-3 text-left sm:flex-row sm:space-x-5 sm:space-y-0">
                    <div className="shrink-0 relative mt-1">
                        <span className="absolute top-1 left-1 flex h-6 w-6 items-center justify-center rounded-full border bg-white text-sm font-medium text-gray-500 shadow sm:-top-2 sm:-right-2">{item.quantity}</span>
                        <img className="h-16 w-16 max-w-full rounded-lg object-cover" src="https://www.gaming.gen.tr/wp-content/uploads/2025/01/asus-prime-geforce-rtx-5080-oc-16gb-gddr7-256-bit-dlss-4-ekran-karti-478061-600x600.jpg" alt="" />
                    </div>

                    <div className="relative flex flex-1 flex-col justify-between">
                        <div className="sm:col-gap-5 sm:grid sm:grid-cols-2">
                            <div className="pr-1">
                                <p className="text-base font-semibold text-gray-900">{item.product.name}</p>
                                <p className="mx-0 mt-1 mb-0 text-sm text-gray-400">{item.product.description}</p>
                            </div>

                            <div className="mt-4 flex items-end justify-between sm:mt-0 sm:items-start sm:justify-end">
                            <p className="mt-1shrink-0 w-20 text-base font-semibold text-gray-900 sm:order-2 sm:ml-8 sm:text-right">${item.subTotal}.00</p>
                            </div>
                        </div>

                        <div className="absolute top-0 right-0 flex sm:bottom-0 sm:top-auto">
                            <button onClick={()=> setIsSideCartOpen(false)} type="button" className="flex rounded p-2 text-center text-gray-500 transition-all duration-200 ease-in-out focus:shadow hover:text-gray-900">
                            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" className=""></path>
                            </svg>
                            </button>
                        </div>
                    </div>
                </li>))
                }  
                </ul>

                <div className="mt-3 border-b py-8"></div>
                <div className="mt-6 flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900">Total</p>
                    <p className="text-sm font-semibold text-gray-900">${cart?.totalAmount}.00</p>
                </div>

                <Link to={"/checkout"} className="mt-1 text-center">
                    <button onClick={()=> setIsSideCartOpen(false)} type="button" className="group inline-flex w-full items-center justify-center border border-gray-400  rounded-md bg-gray-200 mt-1 px-3 py-2 text-sm font-semibold text-black focus:shadow hover:bg-gray-300">
                    Checkout
                    </button>
                </Link>
            </div>
        </div>
  );
};

export default SideCart;