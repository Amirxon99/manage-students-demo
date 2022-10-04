import { Link, useNavigate } from "react-router-dom";
import style from "./Home.module.css";
import Navbar from "../../components/Navbar";
import { useEffect } from "react";

const Home = () => {
  const navigate = useNavigate();
  const userrole = localStorage.getItem("role");
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, userrole]);
  return (
    <>
      <Navbar title="Home" />
      <div className={style.homeBody}>
        <Link to="/courses" className={[style.btn].join(" ")}>
          Courses
        </Link>
        <Link to="/students" className={style.btn}>
          Students
        </Link>
        {userrole === "SUPER_ADMIN" && (
          <Link to="/users" className={style.btn}>
            Users
          </Link>
        )}
      </div>
    </>
  );
};
export default Home;
