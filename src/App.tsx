import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import ProductList from './components/ProductList';
import CartPage from './page/CartPage';
import SingleProduct from './page/SingleProduct';
import Login from './page/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './page/Home';
import Payment from './page/Payment';
import Completion from './page/Completion';
import Order from './page/Order';
const App: React.FC = () => {
  return (<>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<SingleProduct />} />
          <Route path="/checkout" element={<CartPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/completion" element={<Completion />} />
          <Route path="/order" element={<Order />} />
        </Routes>
        <ToastContainer 
        position="bottom-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
      /></>
  );
};

export default App;