import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { AppDispatch, RootState } from '../app/store';
import SideCart from './SideCart';
import { Link } from 'react-router-dom';
import { logout } from '../features/auth/authSlice';
import { ReactComponent as YourSvg } from '../OriginalLogo.svg'
import { fetchUser } from '../features/auth/authThunks';
import { useNavigate } from 'react-router-dom';
const Header: React.FC = () => {
  const [isSideCartOpen, setIsSideCartOpen] = useState(false);
  const cart = useSelector((state: RootState) => state.cart);
  const { loading, error,user } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
      dispatch(fetchUser());
  }, [dispatch]);

  const handleToggleSideCart = () => {
    setIsSideCartOpen(!isSideCartOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const cartItemsCount = cart?.cartItems.reduce((total,item)=> total + item.quantity,0) ?? 0;

  
  console.log("heheheheh",user)

  return (
    <div className='relative bg-gray-50 z-50 '>
    <nav className="fixed top-0 bg-gray-50 top-0 w-full px-4 pt-2 border-b-2 border-black-600">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-5">

              <a href={"/"} className="shrink-0 text-xs  "><YourSvg className='bg-gray-50'/>Elephant</a>

              <ul className="hidden lg:flex items-center justify-start gap-6 md:gap-8 py-3 sm:justify-center">
                <li>
                  <a href="#" title="" className="flex text-base font-medium text-gray-900 hover:text-primary-700 dark:text-white dark:hover:text-primary-500">
                    Spor
                  </a>
                </li>
                <li className="shrink-0">
                  <a href="#" title="" className="flex text-base font-medium text-gray-900 hover:text-primary-700 dark:text-white dark:hover:text-primary-500">
                    Electronic
                  </a>
                </li>
                <li className="shrink-0">
                  <a href="#" title="" className="flex text-base font-medium text-gray-900 hover:text-primary-700 dark:text-white dark:hover:text-primary-500">
                    Moda
                  </a>
                </li>
              </ul>
            </div>
              <div>
                {!user ? <Link to={"/login"}>
                <button className="inline-flex font-bold border-2 border-transparent rounded-lg items-center hover:border-gray-300 rounded ">
                    <svg height="24" viewBox="0 0 32 32" width="24" xmlns="http://www.w3.org/2000/svg"><title/><g data-name="1" id="_1"><path d="M27,3V29a1,1,0,0,1-1,1H6a1,1,0,0,1-1-1V27H7v1H25V4H7V7H5V3A1,1,0,0,1,6,2H26A1,1,0,0,1,27,3ZM12.29,20.29l1.42,1.42,5-5a1,1,0,0,0,0-1.42l-5-5-1.42,1.42L15.59,15H5v2H15.59Z" id="login_account_enter_door"/></g></svg>
                    <div className='p-2'>Login</div>
                </button>
                </Link> : <Link to={"/"}>
                <button onClick={handleLogout} className="inline-flex font-bold border-2 border-transparent rounded-lg items-center hover:border-gray-300 rounded ">
                    <svg height="24" viewBox="0 0 32 32" width="24" xmlns="http://www.w3.org/2000/svg"><title/><g data-name="1" id="_1"><path d="M27,3V29a1,1,0,0,1-1,1H6a1,1,0,0,1-1-1V27H7v1H25V4H7V7H5V3A1,1,0,0,1,6,2H26A1,1,0,0,1,27,3ZM12.29,20.29l1.42,1.42,5-5a1,1,0,0,0,0-1.42l-5-5-1.42,1.42L15.59,15H5v2H15.59Z" id="login_account_enter_door"/></g></svg>
                    <div className='p-2'>Logout</div>
                </button>
                </Link>}      
                <Link to={"/order"}>
                <button className="inline-flex font-bold border-2 border-transparent rounded-lg items-center hover:border-gray-300 rounded ">
                    <svg height="24" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"><rect fill="none" height="256" width="256"/><path d="M224,177.3V78.7a8.1,8.1,0,0,0-4.1-7l-88-49.5a7.8,7.8,0,0,0-7.8,0l-88,49.5a8.1,8.1,0,0,0-4.1,7v98.6a8.1,8.1,0,0,0,4.1,7l88,49.5a7.8,7.8,0,0,0,7.8,0l88-49.5A8.1,8.1,0,0,0,224,177.3Z" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/><polyline fill="none" points="177 152.5 177 100.5 80 47" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/><polyline fill="none" points="222.9 74.6 128.9 128 33.1 74.6" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/><line fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" x1="128.9" x2="128" y1="128" y2="234.8"/></svg>
                    <div className='p-1'>Orders</div>
                </button>
                </Link>
                <button className="px-3 hover:text-gray-400">
                <svg className="feather feather-heart" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                </button> 
                <button onClick={() => handleToggleSideCart()} className=" py-4 px-1 relative border-2 border-transparent text-gray-800 rounded-full hover:text-gray-400 focus:outline-none focus:text-gray-500 transition duration-150 ease-in-out" aria-label="Cart">
                <svg className="feather feather-shopping-cart" fill="none" height="20" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg> 
                    <span className="absolute inset-0 object-right-top ml-4">
                      <div className="inline-flex items-center px-1 border-2 border-white rounded-full text-xs font-semibold leading-4 bg-red-500 text-white">
                        {cartItemsCount}
                      </div>
                    </span>
                  </button>
              </div>
              {isSideCartOpen && <SideCart isOpen={isSideCartOpen} setIsSideCartOpen={setIsSideCartOpen}/>}
            </div>
      </nav>
      </div>
  );
};

export default Header;
