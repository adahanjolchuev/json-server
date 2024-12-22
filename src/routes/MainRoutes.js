import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import axios from "axios";
import Auth from "../components/pages/Auth";
import Home from "../components/pages/Home/home";

function MainRoutes() {
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const API = "http://localhost:3000/data";

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(API);
        if (response.data.length > 0) {
          setData(response.data);
          navigate("/");
        } else {
          setData(null);
          navigate("/auth");
        }
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
        navigate("/auth");
      }
    };
    getData();
  }, [navigate]);

  return (
    <Routes>
      <Route path="/auth" element={<Auth />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default MainRoutes;
