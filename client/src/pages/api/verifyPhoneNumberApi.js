import http from "../../utils/axiosInstance";
import { toast } from "react-toastify";
export const onSubmit = async ({ data, navigate, reset, id }) => {
  const res = await http({
    url: `/auth/verifyPhone/${id}`,
    method: "POST",
    data: data,
  });
  toast.success(res.data.message);
  navigate(`/login`);
  reset();
};
