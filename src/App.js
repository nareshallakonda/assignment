import "./App.css";
import ContentRoute from "./layout/content";
import { BrowserRouter, Link, useLocation } from "react-router-dom";
import store from "./store";
import { useSelector, Provider, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userLogOut } from "./reducer";
import { Flex, Layout } from 'antd';
import creditPayLogo from './assets/credit2payLogo.jpg';

function NavBar() {
  const location = useLocation();
  const dispatch  = useDispatch();
  const { userToken} = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [isAuthenticated,setIsAuthenticated]=useState(false);
  const data = localStorage.getItem('userCofigData');
  const userConfigdata = data ? JSON.parse(data) : null;

  useEffect(()=>{
    const token = localStorage.getItem('userToken');
   if(userToken || token){
    setIsAuthenticated(true)
   }
  },[userToken])

  useEffect(()=>{
    const token = localStorage.getItem('userToken');
    
    if(token){
      setIsAuthenticated(true);
      navigate("/layoutPercel/bookingtype")
    }else{
      navigate("/dashboard")
    }
  },[])

  const goLogOut=()=>{  
    dispatch(userLogOut(null))
    setIsAuthenticated(false);
    localStorage.removeItem('userToken');
    localStorage.removeItem('userConfigData');
    navigate("/dashboard")
  }
  return (
    <div className="brown-section">
      <nav>
        <div>
          <img
            src={creditPayLogo}
            alt="app profile"
            width={75}
            className="credit-logo"
          />
        </div>
        <ul className="nav">
          <li
            className={
              location.pathname.includes("dashboard") ? "active-nav" : ""
            }
          >
            <Link to="/dashboard">Home</Link>
          </li>
          {isAuthenticated ? ( <>
            <li
                className={
                  location.pathname.includes("layoutPercel") ? "active-nav" : ""
                }
              >
                <Link to="/layoutPercel/bookingtype">Booking</Link>
              </li>
              <li
                className={
                  location.pathname.includes("myboking") ? "active-nav" : ""
                }
              >
                <Link to="/myboking">My Booking</Link>
              </li>
              <li
              className={
                location.pathname.includes("logout") ? "active-nav" : ""
              }
            >
              <span onClick={() => goLogOut()} style={{ color: "white",cursor:'pointer' }}>
                Log OUT
              </span>
            </li>
          </>
           
          ) : (
              <li
                className={
                  location.pathname.includes("login") ? "active-nav" : ""
                }
              >
                <Link to="/login">Log IN</Link>
              </li>
          )}

          <li>
            {isAuthenticated ? (
              <div className="profile">
              <span className="profile-pic">
                {userConfigdata?.fullName?.substring(0, 2)?.toUpperCase() || "NN"}
              </span>
              </div>
            ) : (
              <img
                src="https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0="
                alt="User Profile"
                className="profile-img"
              />
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
}
function App() {
  return (<>
    <Provider store={store}>
      <BrowserRouter>
      <NavBar />
        <div className="app-container">
          <div className="aquamarine-section">
            <ContentRoute />
          </div>
        </div>
      </BrowserRouter>
    </Provider>
  </>
  );
}

export default App;
