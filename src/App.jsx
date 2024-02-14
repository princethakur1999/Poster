import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navigation from "./components/Navigation/Navigation.jsx";
import Signup from './components/Signup/Signup.jsx';
import Login from './components/Login/Login.jsx';
import ForgotPassword from "./components/ForgotPassword/ForgotPassword.jsx";
import Home from './pages/Home/Home.jsx';
import Creator from './pages/Creator/Creator.jsx';
import Profile from './pages/Profile/Profile.jsx';
import Edit from './pages/Profile/Edit/Edit.jsx';
import User from './pages/User/User.jsx';
import Footer from './components/Footer/Footer.jsx';

import { Toaster } from 'react-hot-toast';


export default function App() {


    return (

        <BrowserRouter>

            <div className="app">


                <Toaster />

                <Navigation />

                <Routes>

                    <Route path="/" element={<Home />} />

                    <Route path="/signup" element={<Signup />} />

                    <Route path="/login" element={<Login />} />

                    <Route path="/forgot-password" element={<ForgotPassword />} />

                    <Route path="/create" element={<Creator />} />

                    <Route path="/edit-profile" element={<Edit />} />

                    <Route path="/profile" element={<Profile />} />

                    <Route path="/user/:username" element={<User />} />

                    <Route path="/*" element={<Home />} />

                </Routes>


                <Footer />

            </div >

        </BrowserRouter>

    )
}
