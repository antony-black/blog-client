import { useSelector } from "react-redux";
import { selectCurrent } from "../../features/auth-slice";
import { Card, CardHeader, Image, CardBody, Spinner } from "@nextui-org/react";
import { BASE_URL } from "../../constants";
import { Link } from "react-router-dom";
import { MdAlternateEmail } from "react-icons/md";

export const Profile = () => {
  const currentUser = useSelector(selectCurrent);

  return currentUser ? (
    <Card className="py-4 w-[302p]">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <Image
          className="object-cover rounded-xl"
          src={currentUser.avatarUrl ? `${BASE_URL}${currentUser.avatarUrl}` : "/default-avatar.png"}
          width={370}
          alt="user-picture"
        />
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Link to={`/users/${currentUser.id}`}>
          <h4 className="font-bold text-large mb-2">{currentUser.name}</h4>
        </Link>
        <p className="text-default-500 flex items-center gap-2">
          <MdAlternateEmail />
          {currentUser.email}
        </p>
      </CardBody>
    </Card>
  ) : (
    <Spinner />
  );
};
