import Layout from "../../components/Layout";
import style from "../home/Home.module.css";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { Table } from "../../UI/Table";
import useHttp from "../../hooks/useHttp";
import { getStudents, deleteStudent } from "../api/studentApi";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Students = () => {
  const [paramsSearch] = useSearchParams();
  let page = paramsSearch.get("page") || 1;
  const size = paramsSearch.get("size") || 3;
  const search = paramsSearch.get("search");
  const params = useParams();
  const isCourseByID = params.id;
  const { send, loading, error, data: students } = useHttp(getStudents);
  const [value, setValue] = useState("");
  const { send: deleteStudentHandler } = useHttp(deleteStudent);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(`/students?search=${value === null ? "" : value}`);
    }, 200);
    return () => {
      clearTimeout(timer);
    };
  }, [value]);

  useEffect(() => {
    send({ page, size, isCourseByID, search });
  }, [page, size, search]);

  const deleteStudentHand = async (id) => {
    students.data.pagination.page =
      students.data.content.length === 1 &&
      !students.data.pagination.isFirstPage
        ? students.data.pagination.page - 1
        : students.data.pagination.page;
    await deleteStudentHandler(id);
    navigate(`/students?page=${students.data.pagination.page}&size=${size}`);
    send({ page, size });
  };

  const searchChangeHandler = (e) => {
    setValue(e.target.value);
  };
  const courseCols = [
    {
      Header: "First Name",
      accessor: "firstName",
    },
    { Header: "Last Name", accessor: "lastName" },
    { Header: "Birth Date", accessor: "birthDate" },
    {
      id: "actions",
      Header: "Actions",
      accessor: (student) => {
        return (
          <div>
            <Link to={`/students/${student.id}`} className={style.btnLink}>
              Update
            </Link>
            <button onClick={deleteStudentHand.bind(null, student.id)}>
              Delete
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <>
      {loading && <Loader wait={loading} />}
      <Layout
        title={
          isCourseByID
            ? "Total " +
              students?.courseName +
              " Students: " +
              students?.data.pagination.count
            : "All Students: " + students?.data.pagination.count
        }
      >
        {!loading && error && toast.error(error.message)}
        <Link
          to="/students/new"
          className={[style.btn, style.courseBtn].join(" ")}
        >
          Add Student
        </Link>
        <input
          placeholder="search"
          onChange={searchChangeHandler}
          type="text"
        ></input>
        {students?.data.content.length === 0 &&
          students?.data.pagination.isFirstPage && (
            <div className={[style.container, style.textStyle].join(" ")}>
              {" "}
              Students not found
            </div>
          )}
        {students?.data.content.length > 0 && (
          <Table
            columns={courseCols}
            data={students?.data.content}
            page={students?.data.pagination}
            currentPage={page}
            addUrl="student"
            className={[style.container, style.courseTable].join(" ")}
          />
        )}
      </Layout>
    </>
  );
};

export default Students;
