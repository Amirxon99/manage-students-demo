import http from "../../utils/axiosInstance";
import { toast } from "react-toastify";

export const getUsers = async ({ page, size, search }) => {
  const res = await http({ url: "/users", params: { page, size, search } });
  return res.data.data.allUsers;
};

export const deleteUser = async (id) => {
  const res = await http.delete(`/users/${id}`);

  return res.data;
};
export const userById = async ({ id, reset }) => {
  const res = await http({ url: `/users/${id}` });
  reset(res.data.data.userById);
};

export const onSubmit = async ({ data, isUpdate, id, navigate, reset }) => {
  const res = await http({
    url: isUpdate ? `/users/${id}` : "/users",
    method: isUpdate ? "PUT" : "POST",
    data: data,
  });
  navigate(-1);
  reset();
  toast.success(res.data.message);
};
