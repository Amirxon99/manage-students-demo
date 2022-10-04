import http from "../../utils/axiosInstance";
import { toast } from "react-toastify";
export const onSubmit = async ({ data, navigate, reset }) => {
  const res = await http({
    url: `/auth/register`,
    method: "POST",
    data: data,
  });
  toast.success(res.data.message);
  navigate(`/verifyByPhone/${res.data.data.user.id}`);
  reset();
};
