import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./home.scss";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const navigation = useNavigate();
  const API = "http://localhost:3000/data";

  async function getProduct() {
    try {
      const response = await axios.get(API);
      setData(response.data);
    } catch (error) {
      console.error("Ошибка при загрузке данных:", error);
    }
  }

  async function removeData(id) {
    setSelectedId(id);
    setOpen(true);
  }

  const handleConfirmLogout = async () => {
    if (selectedId) {
      try {
        await axios.delete(`${API}/${selectedId}`);
        getProduct();
        setOpen(false);
        navigation("/auth");
      } catch (error) {
        console.error("Ошибка при удалении данных:", error);
      }
    }
  };

  const handleCancelLogout = () => {
    setOpen(false);
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div>
      {data.length > 0 ? (
        <ul>
          {data.map((item) => (
            <div className="data" key={item.id}>
              <img src={item.photo} alt="profile" />
              <h4>{item.email}</h4>
              <h3>{item.name}</h3>
              <Button variant="contained" onClick={() => removeData(item.id)}>
                Выйти из аккаунта
              </Button>
            </div>
          ))}
        </ul>
      ) : (
        <p
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "220px",
          }}
        >
          Загрузка данных...
        </p>
      )}
      <Dialog open={open} onClose={handleCancelLogout}>
        <DialogTitle>Подтверждение</DialogTitle>
        <DialogContent>
          <p>Вы уверены, что хотите выйти?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelLogout} color="primary">
            Отмена
          </Button>
          <Button onClick={handleConfirmLogout} color="primary">
            Подтвердить
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Home;
