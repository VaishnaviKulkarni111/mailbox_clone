import { Link, useNavigate } from "react-router-dom";
import classes from "./navbar.module.css";
// import { useDispatch, useSelector } from "react-redux";
// import { authActions } from "../../store/AuthSlice";

const Navbar = () => {

  const navigate = useNavigate();

  const loginHandler = () => {

    navigate("/");
  };
  return (
    <>
      <header className={classes.header}>
        <nav>
          <ul>
            
            {(
              <button
                className={classes.loginbtn} onClick={loginHandler}
              >
                Login
              </button>
            )}
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
