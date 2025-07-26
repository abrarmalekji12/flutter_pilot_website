import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivacyPolicy from './PrivacyPolicy/PrivacyPolicy';
import Landing from './Landing';
import ContactUs from './ContactUs/ContactUs';
import AboutUs from './AboutUs/AboutUs';

export default function AppNav() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing/>} />
        <Route path="/privacyPolicy" element={<PrivacyPolicy/>} />
        <Route path="/contactUs" element={<ContactUs/>} />
        <Route path="/aboutUs" element={<AboutUs/>} />
      </Routes>
    </BrowserRouter>
  );
}