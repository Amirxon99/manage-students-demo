import http from "../../utils/axiosInstance";
import { toast } from "react-toastify";

export const getStudents = async ({ page, size, search, isCourseByID }) => {
  if (isCourseByID) {
    const res = await http({
      url: `/courses/${isCourseByID}/students`,
      params: { page, size },
    });
    const courseName = res.data.data.course;
    return { data: res.data.data.allStudents, courseName };
  } else {
    const res = await http({
      url: `/students`,
      params: { page, size, search },
    });
    const courseName = res.data.data.course || "All Students";
    return { data: res.data.data.allStudents, courseName };
  }
};

export const deleteStudent = async (id) => {
  const res = await http.delete(`/students/${id}`);
  return res.data;
};

export const studentById = async ({ id, reset }) => {
  const res = await http({ url: `/students/${id}` });
  reset(res.data.data.studentbyId);
};

export const onSubmit = async ({ data, isUpdate, id, navigate, reset }) => {
  try {
    const res = await http({
      url: isUpdate ? `/students/${id}` : "/students",
      method: isUpdate ? "PUT" : "POST",
      data: data,
    });
    toast.success(res.data.message);
    navigate(-1);
    reset();
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
