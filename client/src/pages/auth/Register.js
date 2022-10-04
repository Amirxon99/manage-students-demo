import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import style from "../home/Home.module.css";

import { onSubmit } from "../api/registerApi";
import useHttp from "../../hooks/useHttp";

function Register() {
  const navigate = useNavigate();
  const { send: submit } = useHttp(onSubmit);
  const phoneRegExp =
    /^((\\[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const schema = yup.object().shape({
    firstName: yup
      .string()
      .min(4, "Name must be At least 4 character")
      .required(),
    username: yup
      .string()
      .min(5, "username must be At least 5 character")
      .required(),
    password: yup
      .string()
      .min(6, "Password must be At least 6 character")
      .required(),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match"),
    email: yup.string().email("Email required").required(),
    phoneNumber: yup
      .string()
      .required("Phone Number required")
      .matches(phoneRegExp, "Phone number is not valid")
      .min(12, "to short")
      .max(12, "to long"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  return (
    <div className="registerBody">
      <p className="title">Registration Form</p>
      <form
        className="registerApp"
        onSubmit={handleSubmit((data) => submit({ data, navigate, reset }))}
      >
        <input
          className={`form-control ${
            errors.firstName ? style.errorBorder : ""
          }`}
          type="text"
          {...register("firstName")}
          placeholder="Firstname"
        />
        {errors.firstName && (
          <span className="err">{errors.firstName.message} </span>
        )}
        <input type="text" {...register("lastName")} placeholder="Lastname" />
        <input
          className={`form-control ${errors.username ? style.errorBorder : ""}`}
          type="text"
          {...register("username")}
          placeholder="Username"
        />
        {errors.username && (
          <span className="err">{errors.username.message}</span>
        )}
        <input
          className={`form-control ${errors.password ? style.errorBorder : ""}`}
          type="password"
          name="password"
          {...register("password")}
          placeholder="Password"
        />
        {errors.password && (
          <span className="err">{errors.password?.message}</span>
        )}
        <input
          type="password"
          name="ConfirmPassword"
          {...register("confirmPassword")}
          placeholder="Confirm Password"
        />
        {errors.confirmPassword && (
          <span className="err">{errors.confirmPassword.message}</span>
        )}
        <input
          className={`form-control ${errors.email ? style.errorBorder : ""}`}
          type="email"
          {...register("email", { required: true })}
          placeholder="Email"
        />
        {errors.email && <span className="err">{errors.email.message} </span>}
        <input
          className={`form-control ${
            errors.phoneNumber ? style.errorBorder : ""
          }`}
          type="text"
          {...register("phoneNumber", { required: true })}
          placeholder="Phone Number"
        />
        {errors.phoneNumber && (
          <span className="err">{errors.phoneNumber.message}</span>
        )}
        <input type={"submit"} style={{ backgroundColor: "#a1eafb" }} />
        <Link
          to={"/login"}
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
          I have an account
        </Link>
      </form>
    </div>
  );
}
export default Register;
