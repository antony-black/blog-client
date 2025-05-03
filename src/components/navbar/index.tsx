import { BsPostcard } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";
import { FaUsers } from "react-icons/fa";

import { EPathPages, ETitles } from "@/enums";
import { NavButton } from "@/components";

export const Navbar: React.FC = () => {
  return (
    <nav>
      <ul className="flex flex-col gap-5">
        <li>
          <NavButton path={EPathPages.LAYOUT} icon={<BsPostcard />}>
            {ETitles.Posts}
          </NavButton>
        </li>
        <li>
          <NavButton path={EPathPages.FOLLOWING} icon={<FiUsers />}>
            {ETitles.Following}
          </NavButton>
        </li>
        <li>
          <NavButton path={EPathPages.FOLLOWERS} icon={<FaUsers />}>
            {ETitles.Followers}
          </NavButton>
        </li>
      </ul>
    </nav>
  );
};
