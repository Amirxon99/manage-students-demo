import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./Register.css";

import { onSubmit } from "../api/verifyPhoneNumberApi";
import useHttp from "../../hooks/useHttp";


function VerifyByPhone() {
  const navigate = useNavigate();
  const { send: submit } = useHttp(onSubmit);
  const params = useParams();
  const id = params.id;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  return (
    <div className="registerBody">
      <p className="title">Verification Form</p>
      <form
        className="registerApp"
        onSubmit={handleSubmit((data) => submit({ data, navigate, reset, id }))}
      >
        <input
          type="number"
          {...register("verCode")}
          placeholder="Verification Code"
        />
        {errors.verCode && (
          <span style={{ color: "red" }}>Verification Code Required </span>
        )}
        <input type={"submit"} style={{ backgroundColor: "#a1eafb" }} />
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
          I have an account
        </Link>
      </form>
    </div>
  );
}
export default VerifyByPhone;
