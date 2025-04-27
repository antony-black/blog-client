import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Spinner,
} from "@nextui-org/react";
import { RiDeleteBinLine } from "react-icons/ri";
import { FcDislike } from "react-icons/fc";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { FaRegComment } from "react-icons/fa";

import { useAppSelector } from "../../app/hooks";
import { selectCurrent } from "../../features/auth-slice";
import { useAddLikeMutation, useRemoveLikeMutation } from "../../app/services/likes-api";
import {
  useLazyGetAllPostsQuery,
  useLazyGetPostByIdQuery,
  useRemovePostMutation,
} from "../../app/services/posts-api";
import { useRemoveCommentMutation } from "../../app/services/comments-api";
import { formatToClientDate } from "../../utils/format-to-client-date";

import { User } from "../user";
import { Typography } from "../typography";
import { MetaInfo } from "../meta-info";
import ErrorMessage from "../error-message";
import { catchError } from "../../utils/error-util";

type TCustomCard = {
  avatarUrl: string;
  name: string;
  authorId: string;
  content: string;
  commentId?: string;
  likesCount?: number;
  commentsCount?: number;
  createdAt?: Date;
  id?: string;
  cardFor?: "comment" | "post" | "current-post";
  likedByUser?: boolean;
};

export const CustomCard: React.FC<TCustomCard> = ({
  avatarUrl = "",
  name = "",
  authorId = "",
  content = "",
  commentId = "",
  likesCount = 0,
  commentsCount = 0,
  createdAt,
  id = "",
  cardFor = "post",
  likedByUser = false,
}) => {
  const [like] = useAddLikeMutation();
  const [unlike] = useRemoveLikeMutation();
  const [triggerGetAllPosts] = useLazyGetAllPostsQuery();
  const [triggerGetPostById] = useLazyGetPostByIdQuery();
  const [deletePost, deletePostStatus] = useRemovePostMutation();
  const [deleteComment, deleteCommentStatus] = useRemoveCommentMutation();
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const currentUser = useAppSelector(selectCurrent);

  const refetchPosts = async () => {
    switch (cardFor) {
      case "post":
        await triggerGetAllPosts().unwrap();
        break;
      case "current-post":
        await triggerGetAllPosts().unwrap();
        break;
      case "comment":
        await triggerGetPostById(id).unwrap();
        break;
      default:
        throw new Error("Wrong argument cardFor");
    }
  };

  const handleClick = async () => {
    try {
      likedByUser
        ? await unlike(id).unwrap()
        : await like({ postId: id }).unwrap();

      if (cardFor === "current-post") {
        await triggerGetPostById(id).unwrap();
      }

      if (cardFor === "post") {
        await triggerGetAllPosts().unwrap();
      }
    } catch (error) {
      catchError(error, setError);
    }
  };

  const handleRemove = async () => {
    try {
      switch (cardFor) {
        case "post":
          await deletePost(id).unwrap();
          await refetchPosts();
          break;
        case "current-post":
          await deletePost(id).unwrap();
          navigate("/");
          break;
        case "comment":
          await deleteComment(commentId).unwrap();
          await refetchPosts();
          break;
        default:
          throw new Error("Wrong argument cardFor");
      }
    } catch (error) {
      console.log(error);
      catchError(error, setError);
    }
  };

  return (
    <Card className="mb-5">
      <CardHeader className="justify-between items-center bg-transparent">
        <Link to={`/users/${authorId}`}>
          <User
            className="text-small font-semibold leading-none text-default-600"
            name={name}
            description={createdAt && formatToClientDate(createdAt)}
            avatarUrl={avatarUrl}
          />
        </Link>
        {authorId === currentUser?.id && (
          <div className="cursor-pointer" onClick={handleRemove}>
            {deletePostStatus.isLoading || deleteCommentStatus.isLoading ? (
              <Spinner />
            ) : (
              <RiDeleteBinLine />
            )}
          </div>
        )}
      </CardHeader>
      <CardBody className="px-3 py-2 mb-5">
        <Typography>{content}</Typography>
      </CardBody>
      <CardFooter className="gap-3">
        <div className="flex gap-5 items-center">
          <div onClick={handleClick}>
            <MetaInfo
              count={likesCount}
              Icon={likedByUser ? FcDislike : MdOutlineFavoriteBorder}
            />
          </div>
          <Link to={`/posts/${id}`}>
            <MetaInfo count={commentsCount} Icon={FaRegComment} />
          </Link>
        </div>
        <ErrorMessage error={error} />
      </CardFooter>
    </Card>
  );
};
