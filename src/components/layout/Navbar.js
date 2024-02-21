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
      {( 
              <button
                className={classes.loginbtn} onClick={loginHandler}
              >
                Login
              </button>
            )}
      </header>
      <nav>
          <ul>
            <Link to="/compose">  <button className={classes.compose}>✏️ Compose</button></Link>
           
            <li> <Link to='/inbox'>✉️ Inbox</Link></li>
            <li> <Link to='/sent'>🡆 Sent</Link></li>
          </ul> 
        </nav>
    </>
  );
};

export default Navbar;
