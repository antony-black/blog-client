import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Card, Image, useDisclosure } from "@nextui-org/react";
import { useSelector } from "react-redux";
import { CiEdit } from "react-icons/ci";
import {
  MdOutlinePersonAddAlt1,
  MdOutlinePersonAddDisabled,
} from "react-icons/md";

import { resetUser, selectCurrent } from "../../features/auth-slice";
import {
  useGetUserByIdQuery,
  useLazyCurrentQuery,
  useLazyGetUserByIdQuery,
} from "../../app/services/users-api";
import {
  useFollowMutation,
  useUnfollowMutation,
} from "../../app/services/follows-api";
import { useAppDispatch } from "../../app/hooks";

import { GoBack } from "../../components/go-back";
import { BASE_URL } from "../../constants";
import { ProfileInfo } from "../../components/profile-info";
import { formatToClientDate } from "../../utils/format-to-client-date";
import { CountInfo } from "../../components/count-info";
import { TFollows } from "../../app/types";

const UserProfile: React.FC = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const currentUser = useSelector(selectCurrent);
  const { data } = useGetUserByIdQuery(id ?? "");
  const [followUser] = useFollowMutation();
  const [unfollowUser] = useUnfollowMutation();
  const [triggerGetUserById] = useLazyGetUserByIdQuery();
  const [triggerCurrentUser] = useLazyCurrentQuery();

  useEffect(() => {
    return () => {
      dispatch(resetUser());
    };
  }, []);

  const handleFollow = async () => {
    try {
      if (id) {
        data?.isFollowing
          ? await unfollowUser(id).unwrap()
          : await followUser({ followingId: id }).unwrap();

        await triggerGetUserById(id);
        await triggerCurrentUser();
      }
    } catch (error) {
      console.error(error);
    }
  };

  // const handleCloseEdition = async () => {
  //   try {
  //     if (id) {
  //       await triggerGetUserById(id);
  //       await triggerCurrentUser();
  //       onClose();
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <>
      {data && (
        <>
          <GoBack />
          <div className="flex items-stretch gap-4">
            <Card className="flex flex-col items-center text-center space-y-4 p-5 flex-2">
              <Image
                className="border-4 border-white"
                src={`${BASE_URL}${data.avatarUrl}`}
                alt={data.name}
                width={200}
                height={200}
              />
              <div className="flex flex-col text-2xl font-bold gap-4 items-center">
                {data.name}
                {currentUser?.id !== id ? (
                  <Button
                    className="gap-2"
                    color={data.isFollowing ? "default" : "primary"}
                    variant="flat"
                    onPress={handleFollow}
                    endContent={
                      data.isFollowing ? (
                        <MdOutlinePersonAddDisabled />
                      ) : (
                        <MdOutlinePersonAddAlt1 />
                      )
                    }
                  >
                    {data.isFollowing ? "Unsubscribe" : "Subscribe"}
                  </Button>
                ) : (
                  <Button endContent={<CiEdit />} onPress={() => onOpen()}>
                    Edit
                  </Button>
                )}
              </div>
            </Card>
            <Card className="flex flex-col space-y-4 p-5 flex-1">
              <ProfileInfo title="Email: " info={data.email} />
              <ProfileInfo title="Location: " info={data.location} />
              <ProfileInfo
                title="Birthday: "
                info={data.dateOfBirth && formatToClientDate(data.dateOfBirth)}
              />
              <ProfileInfo title="About me: " info={data.bio} />

              <div className="flex gap-2">
                <CountInfo count={data?.followers?.length} title="Followers"/>
                <CountInfo count={data?.following?.length} title="Following"/>
              </div>
            </Card>
          </div>
        </>
      )}
    </>
  );
};

export default UserProfile;
