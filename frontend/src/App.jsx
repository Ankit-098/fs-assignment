import { useState } from "react";

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";
import Login from "./auth/login";
import Signup from "./auth/signup";
import Dashboard from "./home/dashboard";

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
