import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import { FaRegMoon } from "react-icons/fa";
import { LuSunMedium } from "react-icons/lu";
import { CiLogout } from "react-icons/ci";
import { useContext } from "react";
import { ThemeContext } from "../theme-provider";
import { useAppDispatch } from "../../app/hooks";
import { logout } from "../../features/auth-slice";
import { useNavigate } from "react-router-dom";
import CustomButton from "../custom-button";
import { CustomButtonColors, CustomButtonVariants } from "../../enums/CustomButtonPropertiesTypes";

const Header: React.FC = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogOut = () => {
    dispatch(logout());
    localStorage.removeItem("accessToken");
    navigate("/auth");
  };

  return (
    <Navbar>
      <NavbarBrand>
        <p className="font-bold text-inherit">Network Social</p>
      </NavbarBrand>
      <NavbarContent className="gap-4" justify="end">
        <NavbarItem
          className="lg:flex text-3xl cursor-pointer"
          onClick={toggleTheme}
        >
          {theme === "light" ? <FaRegMoon /> : <LuSunMedium />}
        </NavbarItem>
        <NavbarItem className="lg:flex text-2xl cursor-pointer">
          <CustomButton
            className="gap-2"
            color={CustomButtonColors.DEFAULT}
            variant={CustomButtonVariants.FLAT}
            onPress={handleLogOut}
          >
            <CiLogout /> <span>logout</span>
          </CustomButton>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default Header;
