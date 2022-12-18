import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Navigation from "./Navigation";
import Profile from "../routes/Profile";

const AppRouter = ({ isLoggedIn, userObj, refreshUser }) => {
  return (
      <Router>
        {isLoggedIn ? <Navigation userObj={userObj} /> : ""}
        <Routes>
          {isLoggedIn ? (
            <>
              <Route path="/home" element={<Home userObj={userObj} />} />
              <Route
                path="/profile"
                element={
                  <Profile userObj={userObj} refreshUser={refreshUser} />
                }
              />
            </>
          ) : (
            <Route path="/home" element={<Auth />} />
          )}
        </Routes>
      </Router>
  );
};
export default AppRouter;
