import React from 'react';
import { Route, Router, Routes } from 'react-router-dom';
import HomePage from "./pages/HomePage";

const NavigationPage = () => {
    return (

        <Routes>
            <Route path='/' element={<HomePage />} />
        </Routes>

    )
}

export default NavigationPage;