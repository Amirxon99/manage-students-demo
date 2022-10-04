import Layout from "../../components/Layout";
import style from "../home/Home.module.css";
import { Link, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { Table } from "../../UI/Table";
import useHttp from "../../hooks/useHttp";
import { getUsers, deleteUser } from "../api/userApi";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const [params] = useSearchParams();
  let page = params.get("page") || 1;
  const size = params.get("size") || 3;
  const { send, loading, error, data: users } = useHttp(getUsers);
  const navigate = useNavigate();

  const { send: deleteUserHandler } = useHttp(deleteUser);
  useEffect(() => {
    send({ page, size });
  }, [page, size]);

  const deleteUserHand = async (id) => {
    users.pagination.page =
      users.content.length === 1 && !users.pagination.isFirstpage
        ? users.pagination.page - 1
        : users.pagination.page;
    page = users.pagination.page;
    await deleteUserHandler(id);
    navigate(`/users?page=${users.pagination.page}&size=${size}`);
    send({ page, size });
  };

  const userCols = [
    {
      Header: "First Name",
      accessor: "firstName",
    },
    { Header: "Phone Number", accessor: "phoneNumber" },
    { Header: "Email", accessor: "email" },
    {
      id: "actions",
      Header: "Actions",
      accessor: (user) => {
        return (
          <div>
            <Link to={`/users/${user.id}`} className={style.btnLink}>
              Update
            </Link>
            <button onClick={deleteUserHand.bind(null, user.id)}>Delete</button>
          </div>
        );
      },
    },
  ];
  return (
    <Layout title="Users">
      {loading && <Loader wait={loading} />}
      {!loading && error && toast.error(error.message)}
      {users?.content.length === 0 && !users.pagination.isFirstpage && (
        <div className={[style.container, style.textStyle].join(" ")}>
          Users not found
        </div>
      )}
      {users?.content.length > 0 && (
        <div className={style.marginTop}>
          <Table
            columns={userCols}
            data={users?.content}
            page={users?.pagination}
            currentPage={page}
            addUrl="user"
            className={[style.container, style.courseTable].join(" ")}
          />
        </div>
      )}
    </Layout>
  );
};

export default Users;
