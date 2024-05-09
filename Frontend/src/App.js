import "./App.css";

import { Route, Router, Routes, Navigate } from "react-router-dom";
import React, { useContext } from "react";
import HomePage from "./pages/HomePage.js";
import PageNotFound from "./pages/PageNotFound.js";
import Shortterm from "./pages/Recommendation/ShortTerm.js";
import Midterm from "./pages/Recommendation/MidTerm.js";
import Prediction from "./pages/Prediction.js";
import Recommendation from "./pages/Recommendation.js";
import Signup from "./components/Auth/SignUp.js";
import Login from "./components/Auth/LoginUser.js";
import { AuthProvider } from "./components/Auth/AuthContext.js";
import { ProtectedRoute } from "./components/Auth/ProtectedRoute.js";
import Portfolio from "./pages/Portfolio.js";


function App() {
  return (
    <AuthProvider>
      <Routes>
      <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/portfolio"
          element={
            <ProtectedRoute>
              <Portfolio />
            </ProtectedRoute>
          }
        />
        <Route path="/prediction" element={<Prediction />} />
        {/* <Route element={<Navigate to="/home" />} /> */}
        {/* <Route path='/home' component={<HomePage/>} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<Signup />} />
        <Route path="/recommendation" element={<Recommendation />} />
        {/* <Route path='/analysis' element={<Analysis/>} />  */}
        <Route path="/recommendation/shortterm" element={<Shortterm />} />
        <Route path="/recommendation/midterm" element={<Midterm />} />
        
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </AuthProvider>
  );
}


export default App;
