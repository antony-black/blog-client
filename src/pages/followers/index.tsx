import { Link } from "react-router-dom";
import { Card, CardBody } from "@nextui-org/react";

import { useAppSelector } from "../../app/hooks";
import { selectCurrent } from "../../features/auth-slice";

import { User } from "../../components/user";

const Followers: React.FC = () => {
  const currentUser = useAppSelector(selectCurrent);

  if (!currentUser?.followers || currentUser.followers.length <= 0) {
    return <h2>You have no subscribers yet</h2>;
  }

  return (
    <>
      {currentUser.followers.map(user => (
        <Link to={`/users/${user.follower.id}`} key={user.follower.id}>
          <Card>
            <CardBody className="block">
              <User
                name={user.follower.name ?? ""}
                avatarUrl={user.follower.avatarUrl ?? ""}
                description={user.follower.email}
              />
            </CardBody>
          </Card>
        </Link>
      ))}
    </>
  );
};

export default Followers;
