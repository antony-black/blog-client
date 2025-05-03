import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Card, Image, Spinner, useDisclosure } from "@nextui-org/react";
import { useSelector } from "react-redux";
import { CiEdit } from "react-icons/ci";
import {
  MdOutlinePersonAddAlt1,
  MdOutlinePersonAddDisabled,
} from "react-icons/md";

import { resetUser, selectCurrent } from "@/features/auth-slice";
import {
  useGetUserByIdQuery,
  useLazyCurrentQuery,
  useLazyGetUserByIdQuery,
} from "@/app/services/users-api";
import {
  useFollowMutation,
  useUnfollowMutation,
} from "@/app/services/follows-api";
import { useAppDispatch } from "@/app/hooks";

import { BASE_URL } from "@/constants";

import { formatToClientDate } from "@/utils";
import { catchError } from "@/utils";
import {
  EButtons,
  ECustomButtonColors,
  ECustomButtonVariants,
  ETitles,
  EUserProfileTitles,
} from "@/enums";
import {
  ErrorMessage,
  EditProfile,
  CountInfo,
  ProfileInfo,
  GoBack,
} from "@/components";

const UserProfile: React.FC = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const currentUser = useSelector(selectCurrent);
  const { data, isLoading } = useGetUserByIdQuery(id ?? "");
  const [followUser] = useFollowMutation();
  const [unfollowUser] = useUnfollowMutation();
  const [triggerGetUserById] = useLazyGetUserByIdQuery();
  const [triggerCurrentUser] = useLazyCurrentQuery();
  const [error, setError] = useState<string>("");

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

        await triggerGetUserById(id).unwrap();
        await triggerCurrentUser().unwrap();
      }
    } catch (error) {
      catchError(error, setError);
    }
  };

  const handleCloseEdition = async () => {
    try {
      if (id) {
        await triggerGetUserById(id).unwrap();
        await triggerCurrentUser().unwrap();
        onClose();
      }
    } catch (error) {
      catchError(error, setError);
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      {error && <ErrorMessage error={error} />}
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
                    color={
                      data.isFollowing
                        ? ECustomButtonColors.DEFAULT
                        : ECustomButtonColors.PRIMARY
                    }
                    variant={ECustomButtonVariants.FLAT}
                    onPress={handleFollow}
                    endContent={
                      data.isFollowing ? (
                        <MdOutlinePersonAddDisabled />
                      ) : (
                        <MdOutlinePersonAddAlt1 />
                      )
                    }
                  >
                    {data.isFollowing ? EButtons.Unsubscribe : EButtons.Subscribe}
                  </Button>
                ) : (
                  <Button endContent={<CiEdit />} onPress={() => onOpen()}>
                    Edit
                  </Button>
                )}
              </div>
            </Card>
            <Card className="flex flex-col space-y-4 p-5 flex-1">
              <ProfileInfo title={EUserProfileTitles.EMAIL} info={data.email} />
              <ProfileInfo
                title={EUserProfileTitles.LOCATION}
                info={data.location}
              />
              <ProfileInfo
                title={EUserProfileTitles.BIRTHDAY}
                info={data.dateOfBirth && formatToClientDate(data.dateOfBirth)}
              />
              <ProfileInfo
                title={EUserProfileTitles.ABOUT_ME}
                info={data.bio}
              />
              <div className="flex gap-2">
                <CountInfo count={data?.followers?.length} title={ETitles.Followers} />
                <CountInfo count={data?.following?.length} title={ETitles.Following} />
              </div>
            </Card>
          </div>
          <EditProfile
            isOpen={isOpen}
            onClose={handleCloseEdition}
            user={data}
          />
        </>
      )}
    </>
  );
};

export default UserProfile;
