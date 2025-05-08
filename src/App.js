import "./styles.css";
import { useState, useReducer } from "react";
import { Link, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dashboard";
import { useContext } from "react";
import { AuthContex } from "./Auth";

export default function App() {
  const { isLoggedIn, user, dispatch, handleLogout } = useContext(AuthContex);
  return (
    <div className="App">
      <nav>
        <div className="nav-bar">
          <p>Voting App</p>
          {isLoggedIn ? (
            <button className="logout" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <Link to="/login">Login </Link>
          )}
        </div>
      </nav>

      <div className="main-content">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </div>
  );
}
