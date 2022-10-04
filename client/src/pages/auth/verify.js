import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";

function Verify() {
  const navigate = useNavigate();
  const params = useParams();
  useEffect(() => {
    loginHandler();
  }, []);
  const [isLoading, setIsLoading] = useState(false);
  const loginHandler = async () => {
    try {
      setIsLoading(true);
      const res = await axios(
        `http://localhost:5678/api/v1/auth/verify/${params.id}`
      );
      setIsLoading(false);
      navigate("/login");
    } catch (error) {
      toast.error(error);
      navigate("/register");
    }
  };

  return <div>{isLoading && <Loader wait={isLoading} />}</div>;
}
export default Verify;
