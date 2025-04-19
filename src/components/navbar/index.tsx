import { BsPostcard } from "react-icons/bs";
import NavButton from "../nav-button";
import { FiUsers } from "react-icons/fi";
import { FaUsers } from "react-icons/fa";

const Navbar: React.FC = () => {
  return (
    <nav>
      <ul className="flex flex-col gap-5">
        <li>
          <NavButton path="/" icon={<BsPostcard />}>
            Posts
          </NavButton>
        </li>
        <li>
          <NavButton path="/following" icon={<FiUsers />}>
            Posts
          </NavButton>
        </li>
        <li>
          <NavButton path="/followers" icon={<FaUsers />}>
            Posts
          </NavButton>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
