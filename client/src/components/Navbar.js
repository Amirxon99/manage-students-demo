import style from "./Navbar.module.css";
import { Link, useNavigate } from "react-router-dom";

const Navbar = (params) => {
  const navigate = useNavigate();
  const logOutHandler = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <div className={style.nav}>
      <div className={style.logo}>
        <Link to="/">
          <img src="/course-logo.png" alt="Logo" />
        </Link>
        <button onClick={logOutHandler}>Log out</button>
      </div>
      <div className={style.text_box}>
        <h1>{params.title}</h1>
      </div>
    </div>
  );
};
export default Navbar;
