import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Container from "../container";
import Header from "../header";
import Navbar from "../navbar";
import { selectAuth, selectUser } from "../../features/auth-slice";
import { useEffect } from "react";
import { Profile } from "../profile";
import { EPathPages } from "@/enums";

const Layout: React.FC = () => {
  const isAuth = useSelector(selectAuth);
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      navigate(EPathPages.AUTH);
    }
  }, []);

  return (
    <>
      <Header />
      <Container>
        <div className="flex-2 p-4">
          <Navbar />
        </div>
        <div className="flex-1 p-4">
          <Outlet />
        </div>
        <div className="flex-4 p-4">
          <div className="flex-col flex gap-5">{!user && <Profile />}</div>
        </div>
      </Container>
    </>
  );
};

export default Layout;
