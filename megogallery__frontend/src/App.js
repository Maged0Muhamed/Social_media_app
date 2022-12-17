import { Route, Routes, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import Home from "./pages/Home";
import Login from "./components/Login";
import { fetchUser } from "./utils/userFetch";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const User = fetchUser();
    if (!User) navigate("/login");
  }, []);

  return (
    <div className="">
      <Routes>
        <Route path="/*" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
