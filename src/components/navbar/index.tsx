import { BsPostcard } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";
import { FaUsers } from "react-icons/fa";

import { EPathPages } from "@/enums";
import { NavButton } from "@/components";

const POSTS: string = "Posts";
const FOLLOWING: string = "Following";
const FOLLOWERS: string = "Followers";

export const Navbar: React.FC = () => {
  return (
    <nav>
      <ul className="flex flex-col gap-5">
        <li>
          <NavButton path={EPathPages.LAYOUT} icon={<BsPostcard />}>
            {POSTS}
          </NavButton>
        </li>
        <li>
          <NavButton path={EPathPages.FOLLOWING} icon={<FiUsers />}>
            {FOLLOWING}
          </NavButton>
        </li>
        <li>
          <NavButton path={EPathPages.FOLLOWERS} icon={<FaUsers />}>
            {FOLLOWERS}
          </NavButton>
        </li>
      </ul>
    </nav>
  );
};
