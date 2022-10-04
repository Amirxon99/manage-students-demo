import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const useHttp = (reqFn) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const send = async (reqData) => {
    setLoading(true);
    setError(null);
    try {
      const res = await reqFn(reqData);
      setData(res);
      if (res.message) {
        toast.success(res.message);
      }
    } catch (err) {
      setError(err);
      console.log(err);
      // toast.success(err.response.data.message);
    }
    setLoading(false);
  };
  return { send, loading, error, data };
};

export default useHttp;
