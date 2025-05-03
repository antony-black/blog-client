import { BsPostcard } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";
import { FaUsers } from "react-icons/fa";

import { EPathPages } from "@/enums";
import { NavButton } from "@/components";

const Navbar: React.FC = () => {
  return (
    <nav>
      <ul className="flex flex-col gap-5">
        <li>
          <NavButton path={EPathPages.LAYOUT} icon={<BsPostcard />}>
            Posts
          </NavButton>
        </li>
        <li>
          <NavButton path={EPathPages.FOLLOWING} icon={<FiUsers />}>
            Following
          </NavButton>
        </li>
        <li>
          <NavButton path={EPathPages.FOLLOWERS} icon={<FaUsers />}>
            Followers
          </NavButton>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
