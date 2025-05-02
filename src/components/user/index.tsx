import { User as NextUiUser } from "@nextui-org/react";

import { BASE_URL } from "../../constants";

type TUser = {
  name: string;
  avatarUrl: string;
  description?: string;
  className?: string;
};
export const User: React.FC<TUser> = ({
  name = "",
  avatarUrl = "",
  description = "",
  className = "",
}) => {
  return (
    <NextUiUser
      className={className}
      name={name}
      description={description}
      avatarProps={{src: `${BASE_URL}${avatarUrl}`}}
    />
  );
};
