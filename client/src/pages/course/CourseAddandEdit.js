import Layout from "../../components/Layout";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import style from "../home/Home.module.css";
import { courseById, onSubmit } from "../api/courseApi";
import useHttp from "../../hooks/useHttp";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const AddEditCourse = () => {
  const { send: getCourseById } = useHttp(courseById);
  const { send: submit } = useHttp(onSubmit);
  const navigate = useNavigate();
  const params = useParams();
  const isUpdate = params.id !== "new";

  useEffect(() => {
    if (isUpdate) {
      getCourseById({ id: params.id, reset });
    }
  }, []);
  const schema = yup.object().shape({
    name: yup.string().min(4, "Name must be At least 4 character").required(),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  return (
    <Layout title={isUpdate ? "Edit course" : "Add a new Course"}>
      <form
        onSubmit={handleSubmit((data) =>
          submit({ data, isUpdate, id: params.id, navigate, reset })
        )}
        className={[style.container, style.formStyle].join(" ") + " "}
      >
        <label htmlFor="text"></label>
        <input
          className={`form-control ${errors.name ? style.errorBorder : ""}`}
          id="text"
          type="text"
          placeholder="Name"
          min={5}
          {...register("name", {
            required: { value: true, message: "Name kiriting" },
          })}
        />
        <br></br>
        {errors.name && <p className={style.err}>{errors.name.message}</p>}
        <label htmlFor="description"></label>
        <textarea
          rows="6"
          className="form-control"
          id="description"
          type="text"
          placeholder="Description"
          {...register("description", {})}
        />
        <br></br>
        {errors.description && <p>{errors.description.message}</p>}
        <button className="btn btn-primary ">Save</button>
        <Link to={`/courses`} className="btn btn-secondary ">
          Back
        </Link>
      </form>
    </Layout>
  );
};

export default AddEditCourse;
