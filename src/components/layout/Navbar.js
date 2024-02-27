import { Link, useNavigate } from "react-router-dom";
import classes from "./navbar.module.css";
import { useDispatch, useSelector } from "react-redux";
 import { authActions } from "../../store/AuthSlice";

const Navbar = () => {
   const isLoggedIn = useSelector((state) => state.auth.isAuthenticated) ;
   const unreadCount = useSelector((state) => state.inbox.unreadCount)
  
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const loginHandler = () => {
    navigate("/auth");
  };
  const logout = () => {
    navigate('/auth')
    dispatch(authActions.logout())
  };
  return (
    <>
      <header className={classes.header}>
      {!isLoggedIn && ( <button className={classes.loginbtn} onClick={loginHandler} >
                Login
        </button> )}
        {isLoggedIn && ( <button className={classes.loginbtn} onClick={logout} >
                Logout
        </button> )}
      </header>
       { isLoggedIn && <nav>
          <ul>
            {  <Link to="/compose">  <button className={classes.compose}>✏️ Compose</button></Link>}
           
          <li> {  <Link to='/inbox'>✉️ Inbox  </Link>}    {unreadCount > 0 && `(${unreadCount})`}</li>
           {  <li> <Link to='/sent'>🡆 Sent</Link></li>}
          </ul> 
        </nav>}
    </>
  );
};

export default Navbar;
