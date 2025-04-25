import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Container from "../container";
import Header from "../header";
import Navbar from "../navbar";
import { selectAuth } from "../../features/auth-slice";
import { useEffect } from "react";

const Layout: React.FC = () => {
  const isAuth = useSelector(selectAuth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      navigate('/auth');
    }
  },[]);

  return (
    <>
      <Header />
      <Container>
        <div className="flex-2 p-4">
          <Navbar/>
        </div>
        <div className="flex-1 p-4">
          <Outlet/>
        </div>
      </Container>
    </>
  );
}

export default Layout;
