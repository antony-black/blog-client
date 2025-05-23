import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import { FaRegMoon } from "react-icons/fa";
import { LuSunMedium } from "react-icons/lu";
import { CiLogout } from "react-icons/ci";

import { ThemeContext } from "../theme-provider";
import { useAppDispatch } from "@/app/hooks";
import { logout } from "@/features/auth-slice";

import { CustomButton } from "@/components";
import {
  EButtons,
  ECustomButtonColors,
  ECustomButtonVariants,
  ELocalStorageKeys,
  EPathPages,
  ETitles,
} from "@/enums";

export const Header: React.FC = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogOut = () => {
    dispatch(logout());
    localStorage.removeItem(ELocalStorageKeys.ACCESS_TOKEN);
    navigate(EPathPages.AUTH);
  };

  return (
    <Navbar>
      <NavbarBrand>
        <p className="font-bold text-inherit">{ETitles.Network_Social}</p>
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
            color={ECustomButtonColors.DEFAULT}
            variant={ECustomButtonVariants.FLAT}
            onPress={handleLogOut}
          >
            <CiLogout /> <span>{EButtons.Logout}</span>
          </CustomButton>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};
