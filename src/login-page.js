import React, { useState } from "react";
import "./index.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import useFetch from "./usefetch.js";
import Alert from "@mui/material/Alert";

export default function LoginPage({login, setLogin}) {
  const [values, setValues] = useState({
    login: "",
    password: "",
    showPassword: false,
  });
  const [logincounter, setLogincounter] = useState(0)
  const { get } = useFetch("http://localhost:9999/");



  const handleChangeInputs = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    get("profile").then((data) => {
      const login = data.filter(
        (el) => el.login === values.login && el.password === values.password);
      if(login.length > 0) {
        document.cookie = `userid=${login[0].id}`
        setLogin(true)
        setLogincounter(0)
      } else {
        setLogincounter(prev => prev + 1)
      }
    });
  };

  return (
    <div className="background-container">
      <Box
        onSubmit={handleSubmitForm}
        component="form"
        sx={{
          width: "350px",
          padding: "25px",
          background: "#fff",
          borderRadius: "5px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <TextField
          id="outlined-login-input"
          onChange={handleChangeInputs("login")}
          label="Login"
          name="login"
          fullWidth
          required
          autoFocus
        />
        <FormControl fullWidth variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            required
            name="password"
            id="outlined-adornment-password"
            type={values.showPassword ? "text" : "password"}
            value={values.password}
            onChange={handleChangeInputs("password")}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        {logincounter !== 0 ? (
          <Alert severity="error">Неправильный логин/пароль!</Alert>
        ) : null}
        <Button variant="contained" type="submit" size="large">
          Login
        </Button>
      </Box>
    </div>
  );
}
