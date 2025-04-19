import { JSX } from "react";
import {Link} from "react-router-dom";
import CustomButton from "../custom-button";

type TNavButton = {
  children: React.ReactNode;
  icon: JSX.Element;
  path: string
}


const NavButton:React.FC<TNavButton> = ({children, icon, path}) => {
  return (
    <CustomButton className="flex justify-start text-xl" icon={icon}>
      <Link to={path}>
      {children}
      </Link>
    </CustomButton>
  );
}

export default NavButton;
