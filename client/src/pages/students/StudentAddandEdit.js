import Layout from "../../components/Layout";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import style from "../home/Home.module.css";
import { studentById, onSubmit } from "../api/studentApi";
import useHttp from "../../hooks/useHttp";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const AddEditStudents = () => {
  const { send: getStudentById } = useHttp(studentById);
  const { send: submit } = useHttp(onSubmit);
  const navigate = useNavigate();
  const params = useParams();
  const isUpdate = params.id !== "new";
  const [allCourses, setAllCourses] = useState([]);
  const schema = yup.object().shape({
    firstName: yup
      .string()
      .min(4, "Name must be At least 4 character")
      .required(),
    lastName: yup
      .string()
      .min(5, "LastName must be At least 4 character")
      .required(),
    birthDate: yup.string("BithDate required"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const getCourses = async () => {
    const res = await axios("http://localhost:5678/api/v1/courses");
    setAllCourses(res.data.data.allCourses.content);
  };

  useEffect(() => {
    getCourses();
    if (isUpdate) {
      getStudentById({ id: params.id, reset });
    }
  }, []);
  return (
    <Layout title={isUpdate ? "Edit student " : "Add a new student"}>
      <form
        onSubmit={handleSubmit((data) =>
          submit({ data, isUpdate, id: params.id, navigate, reset })
        )}
        className={[style.container, style.formStyle].join(" ") + " "}
      >
        <label htmlFor="text"></label>
        <input
          className={`form-control ${
            errors.firstName ? style.errorBorder : ""
          }`}
          id="text"
          type="text"
          placeholder="FirstName"
          {...register("firstName", {
            required: { value: true, message: "FirstName kiriting" },
          })}
        />
        <br></br>
        {errors.firstName && (
          <p className={style.err}>{errors.firstName.message}</p>
        )}

        <label htmlFor="text"></label>
        <input
          className={`form-control ${errors.lastName ? style.errorBorder : ""}`}
          id="text"
          type="text"
          placeholder="LastName"
          {...register("lastName", {
            required: { value: true, message: "lastName kiriting" },
          })}
        />
        <br></br>
        {errors.lastName && (
          <p className={style.err}>{errors.lastName.message}</p>
        )}

        <label htmlFor="date"></label>
        <input
          className={`form-control ${
            errors.birthdate ? style.errorBorder : ""
          }`}
          id="date"
          type="date"
          placeholder="Date"
          {...register("birthDate", {
            required: { value: true, message: "birthDate ni kiriting" },
          })}
        />
        <br></br>
        {errors.birthDate && <p>{errors.birthDate.message}</p>}

        <label htmlFor="func" className="form_label">
          Select Course
        </label>
        <br></br>
        <select name="func" {...register("courseId")}>
          <option value=""></option>
          {allCourses &&
            allCourses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
        </select>
        {errors.func && <p style={{ color: "red" }}> {errors.func.message}</p>}
        <br></br>
        <br></br>
        <button className="btn btn-primary ">Save</button>
        <Link to={`/students`} className="btn btn-secondary ">
          Back
        </Link>
      </form>
    </Layout>
  );
};

export default AddEditStudents;
