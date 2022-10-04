import React from "react";
import { useForm } from "react-hook-form";
import "./Register.css";
import { useDispatch } from "react-redux";
import axios from "axios";
import { appActions } from "../../store/index";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import style from "../home/Home.module.css";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const schema = yup.object().shape({
    username: yup
      .string()
      .required("Username required")
      .min(5, "Username must be At least 5 character"),
    password: yup
      .string()
      .required("Password required")
      .min(6, "Password must be At least 6 character"),
  });

  const loginHandler = async (loginData) => {
    try {
      const res = await axios.post(
        "http://localhost:5678/api/v1/auth/login",
        loginData
      );
      dispatch(appActions.login(res.data));
      localStorage.setItem("token", res.data.data.jwt);
      localStorage.setItem("userId", res.data.data.user.id);
      localStorage.setItem("role", res.data.data.user.role);
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  return (
    <div className="registerBody">
      <p className="title">Login Form</p>
      <form className="registerApp" onSubmit={handleSubmit(loginHandler)}>
        <input
          className={`form-control ${errors.username ? style.errorBorder : ""}`}
          type="text"
          {...register("username")}
          placeholder="Username"
        />
        {errors.username && (
          <span className="err">{errors.username.message} </span>
        )}
        <input
          className={`form-control ${errors.password ? style.errorBorder : ""}`}
          type="password"
          name="password"
          {...register("password")}
          placeholder="Password"
        />
        {errors.password && (
          <span className="err">{errors.password.message}</span>
        )}
        <br></br>
        <button
          type={"submit"}
          style={{
            backgroundColor: "#a1eafb",
            width: "60%",
            padding: "5px",
            borderRadius: "4px",
            textDecoration: "none",
            margin: "0 auto",
          }}
        >
          {" "}
          Login
        </button>
        <br></br>
        <Link
          to={"/register"}
          style={{
            color: "white",
            backgroundColor: "grey",
            width: "40%",
            padding: "2px",
            borderRadius: "4px",
            textDecoration: "none",
            margin: "0 auto",
          }}
        >
          Create new Account
        </Link>
      </form>
    </div>
  );
}
export default Login;
