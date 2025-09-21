import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './App.css';
import LookbookButton from './LookbookButton';
import LookbookPopup from './LookbookPopup';
import CreateLookbook from './components/CreateLookbook';
import UploadLookbook from './UploadLookbook';
import Lookbooks from './Lookbooks'; 
import ProductPage from './ProductPage';
import Navbar from './components/Navbar/Navbar.js';
import Home from "./components/Home/Home.js";
import MNavbar from "./components/Navbar/MobileNav/MNavbar.js";
import Login from "./components/Login/Login";
import Otpverify from "./components/Login/otpverify";
import Registeruser from "./components/Login/Registeruser";
import { getuser } from "./action/useraction";
import Overview from "./components/Login/Dashboard/overview";
import Allproductpage from "./components/Product/Allproduct";
import Ppage from "./components/Productpage/Ppage";
import MPpage from "./components/Productpage/MPpage";
import Footer from "./components/Footer/Footer";
import Coupon from "./components/Coupon/Coupon";
import AIWishlist from "./components/AIWishlist/AIWishlist";
import Bag from './components/Bag/Bag';
import AIWardrobe from './components/Navbar/AIWardrobe/Wardrobe.jsx';
import Address from "./components/Bag/Address";
import Try from "../src/components/Navbar/Submenu/try.jsx";
import AIStylistChat from "./components/AIStylist/AIStylistChat";
import 'react-lazy-load-image-component/src/effects/blur.css';
import Canvas from "./components/Canvas/Canvas";

function App() {
  const [showPopup, setShowPopup] = React.useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };
  const dispatch = useDispatch();
  const { loading, user, isAuthentication, error } = useSelector(state => state.user);

  const [state, setstate] = useState(false);

  useEffect(() => {
    if (state === false) {
      dispatch(getuser());
      setstate(true);
    }

    let url = document.URL;
    if (url.includes('&')) {
      if (!url.includes('?')) {
        let url1=  url.replace('&','?');
        window.location = url1;
      }
    }

    if (isAuthentication === true) {
      console.log(url);
      if (url === `${window.location.protocol}//${window.location.host}/Login`) {
        window.location.href = `${window.location.protocol}//${window.location.host}`;
      }
      if (url === `${window.location.protocol}//${window.location.host}/verifying`) {
        window.location.href = `${window.location.protocol}//${window.location.host}`;
      }
      if (url === `${window.location.protocol}//${window.location.host}/registeruser`) {
        window.location.href = `${window.location.protocol}//${window.location.host}`;
      }
    }

  }, [dispatch, state, isAuthentication]);

  return (
    <Router>
      <Navbar user={user} />
      <MNavbar user={user} />
      <Coupon />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ColorAnalysis" element={<Try />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/verifying" element={<Otpverify />} />
        <Route path="/registeruser" element={<Registeruser />} />
        {!loading && (isAuthentication ? <Route path="/dashboard" element={<Overview user={user} />} /> : <Route path="/dashboard" element={<Navigate to="/" />} />)}
        <Route path="/products" element={<Allproductpage />} />
        {window.screen.width > 1024 ? <Route path="/products/:id" element={<Ppage />} /> : <Route path="/products/:id" element={<MPpage />} />}
        <Route path="/ai_wishlist" element={<AIWishlist/>} />
        <Route path="/bag" element={<Bag user={user} />} />
        <Route path="/address/bag" element={<Address user={user} />} />
        <Route path="/ai-stylist" element={<AIStylistChat />} />
        <Route path="/product-1" element={<>
            <LookbookPopup show={showPopup} onClose={togglePopup} />
            <LookbookButton onClick={togglePopup} />
            <ProductPage />

          </>} />
          <Route path="/CreateLookbook" element={<CreateLookbook/>}/>
          <Route path="/canvas" element={<Canvas />} />
          <Route path="/uploadLookbook" element={<UploadLookbook />} />
          <Route path="/Lookbooks" element={<Lookbooks />} />
          <Route path="/ai_wardrobe" element={<AIWardrobe/>}/>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;