import Layout from "../../components/Layout";
import style from "../home/Home.module.css";
import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { Table } from "../../UI/Table";
import useHttp from "../../hooks/useHttp";
import { getCourses, deleteCourse } from "../api/courseApi";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Courses = () => {
  const [params] = useSearchParams();
  const search = params.get("search");
  let page = params.get("page") || 1;
  const size = params.get("size") || 3;
  const { send, loading, error, data: courses } = useHttp(getCourses);
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const { send: deleteCourseHandler } = useHttp(deleteCourse);

  // if(value){

  // }
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(`/courses?search=${value === null ? "" : value}`);
    }, 200);
    return () => {
      clearTimeout(timer);
    };
  }, [value]);

  useEffect(() => {
    send({ page, size, search });
  }, [page, size, search]);

  const deleteCourseHand = async (id) => {
    courses.pagination.page =
      courses.content.length === 1 && !courses.pagination.isFirstPage
        ? courses.pagination.page - 1
        : courses.pagination.page;
    page = courses.pagination.page;
    await deleteCourseHandler(id);
    navigate(`/courses?page=${courses.pagination.page}&size=${size}`);
    send({ page, size });
  };
  const searchChangeHandler = (e) => {
    setValue(e.target.value);
  };
  const courseCols = [
    {
      Header: "Name",
      accessor: (course) => {
        return (
          <Link
            to={`/courses/${course.id}/students`}
            className={style.courseName}
          >
            {course.name}
          </Link>
        );
      },
    },
    { Header: "Description", accessor: "description" },
    {
      id: "actions",
      Header: "Actions",
      accessor: (course) => {
        return (
          <div>
            <Link to={`/courses/${course.id}`} className={style.btnLink}>
              Update
            </Link>
            <button onClick={deleteCourseHand.bind(null, course.id)}>
              Delete
            </button>
          </div>
        );
      },
    },
  ];
  return (
    <Layout title="Courses">
      {loading && <Loader wait={loading} />}
      {!loading && error && toast.error(error.message)}
      <Link
        to="/courses/new"
        className={[style.btn, style.courseBtn].join(" ")}
      >
        Add course
      </Link>
      <input
        placeholder="search"
        onChange={searchChangeHandler}
        type="text"
      ></input>
      {courses?.content.length === 0 && !courses.pagination.isFirstpage && (
        <div className={[style.container, style.textStyle].join(" ")}>
          Courses not found
        </div>
      )}
      {courses?.content.length > 0 && (
        <Table
          columns={courseCols}
          data={courses?.content}
          page={courses?.pagination}
          currentPage={page}
          addUrl="course"
          className={[style.container, style.courseTable].join(" ")}
        />
      )}
    </Layout>
  );
};

export default Courses;

// function Courses() {
//   const { send, error, loading, data } = useHttp(getCourses);
//   const { send: deleteCourse } = useHttp(deleter);
//   const [searchParams, setSearchParams] = useSearchParams();

//   const navigate = useNavigate();
//   const page = searchParams.get("page")  1;
//   const size = searchParams.get("size")  2;
//   const search = searchParams.get("search");
//   const colorLink = page;
//   const [value, setValue] = useState(null);
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       navigate(/courses?search=${value === null ? "" : value});
//     }, 200);
//     return () => {
//       clearTimeout(timer);
//     };
//   }, [value]);
//   useEffect(() => {
//     send({ page, size, search });
//   }, [page, size, search]);
//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm();

//   const deleteHandler = async (id) => {
//     await deleteCourse(id);
//     await send({ page: 1, size });
//       navigate(/courses?page=1&size=${size || 2});
//   };

//   const courseCols = [
//     {
//       Header: "Name",
//       accessor: (item) => (
//         <Link to={/students?courseId=${item.id}}>{item.name}</Link>
//       ),
//     },
//     { Header: "Description", accessor: "description" },
//     {
//       Header: "Actions",
//       accessor: (course) => {
//         return (
//           <div>
//             <Link
//               to={/courses/${course.id}}
//               style={{ width: "50px", height: "50px" }}
//             >
//               📝
//             </Link>
//             <button
//               style={{ padding: "5px", margin: "2px", fontSize: "20px" }}
//               onClick={deleteHandler.bind(null, course.id)}
//             >
//               🗑
//             </button>
//           </div>
//         );
//       },
//     },
//   ];
//   const changeHandler = (e) => {
//     setValue(e.target.value);
//   };
