import http from "../../utils/axiosInstance";
import { toast } from "react-toastify";

export const getCourses = async ({ page, size, search }) => {
  const res = await http({ url: "/courses", params: { page, size, search } });
  return res.data.data.allCourses;
};

export const deleteCourse = async (id) => {
  const res = await http.delete(`/courses/${id}`);

  return res.data;
};
export const courseById = async ({ id, reset }) => {
  const res = await http({ url: `/courses/${id}` });
  reset(res.data.data.courseById);
};

export const onSubmit = async ({ data, isUpdate, id, navigate, reset }) => {
  const res = await http({
    url: isUpdate ? `/courses/${id}` : "/courses",
    method: isUpdate ? "PUT" : "POST",
    data: data,
  });
  navigate(-1);
  reset();
  toast.success(res.data.message);
};
