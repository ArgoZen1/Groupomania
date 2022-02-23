import React from 'react';
import { BrowserRouter , Navigate, Route, Routes } from 'react-router-dom';
import Home from '../../pages/Home';
import Profil from '../../pages/Profil';
import Navbar from '../Navbar';

const index = () => {
    return (
        <div>
        <BrowserRouter>
        <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/profil" element={<Profil />} />
                <Route path="*" element={<Navigate to='/' replace />} />
            </Routes>
            
        </BrowserRouter>
        </div>
    );
};

export default index;