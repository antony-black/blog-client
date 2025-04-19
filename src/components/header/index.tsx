import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import { FaRegMoon } from "react-icons/fa";
import { LuSunMedium } from "react-icons/lu";
import { useContext } from "react";
import { ThemeContext } from "../theme-provider";

const Header: React.FC = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <Navbar>
      <NavbarBrand>
        <p className="font-bold text-inherit">Network Social</p>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem className="lg:flex text-3xl cursor-pointer">
          {theme === "light" ? <FaRegMoon /> : <LuSunMedium />}
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default Header;
