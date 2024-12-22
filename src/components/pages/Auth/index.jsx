import React, { useState } from "react";
import "./auth.scss";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Auth() {
  const navigator = useNavigate();
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const API = "http://localhost:3000/data";

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Поле 'Полное имя' обязательно.";
    if (!photo.trim()) newErrors.photo = "Поле 'Фото' обязательно.";
    if (!password.trim()) newErrors.password = "Поле 'Пароль' обязательно.";
    if (!email.trim()) {
      newErrors.email = "Поле 'Email' обязательно.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Введите корректный email.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getData = async () => {
    if (!validate()) return;
    const newProduct = { photo, name, password, email };

    try {
      await axios.post(API, newProduct);
      setPhoto("");
      setName("");
      setPassword("");
      setEmail("");
      navigator("/");
    } catch (error) {
      console.error("Ошибка при отправке данных:", error);
    }
  };

  return (
    <div className="container">
      <div className="admin">
        <h1>Авторизация</h1>
        <div className="inputs">
          <TextField
            label="Полное имя"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            label="Фото"
            variant="outlined"
            value={photo}
            onChange={(e) => setPhoto(e.target.value)}
            error={!!errors.photo}
            helperText={errors.photo}
          />
          <TextField
            label="Пароль"
            variant="outlined"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!errors.password}
            helperText={errors.password}
          />
          <TextField
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!errors.email}
            helperText={errors.email}
          />
          <Button variant="contained" onClick={getData}>
            Отправить
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Auth;
