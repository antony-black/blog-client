import { Link } from "react-router-dom";
import { Card, CardBody } from "@nextui-org/react";

import { useAppSelector } from "@/app/hooks";
import { selectCurrent } from "@/features/auth-slice";

import { User } from "@/components";
import { ETitles } from "@/enums";

const Following: React.FC = () => {
  const currentUser = useAppSelector(selectCurrent);

  if (!currentUser?.following || currentUser.following.length <= 0) {
    return <h2>{ETitles.not_subscribed}</h2>;
  }

  return (
    <>
      {currentUser.following.map(user => (
        <Link to={`/users/${user.following.id}`} key={user.following.id}>
          <Card>
            <CardBody className="block">
              <User
                name={user.following.name ?? ""}
                avatarUrl={user.following.avatarUrl ?? ""}
                description={user.following.email}
              />
            </CardBody>
          </Card>
        </Link>
      ))}
    </>
  );
};

export default Following;
