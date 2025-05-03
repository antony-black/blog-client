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

import { useAppSelector } from "@/app/hooks";
import { selectCurrent } from "@/features/auth-slice";
// TODO: move all services imports to the index file
import {
  useAddLikeMutation,
  useRemoveLikeMutation,
} from "@/app/services/likes-api";
import {
  useLazyGetAllPostsQuery,
  useLazyGetPostByIdQuery,
  useRemovePostMutation,
} from "@/app/services/posts-api";
import { useRemoveCommentMutation } from "@/app/services/comments-api";
import { formatToClientDate } from "@/utils";

import { catchError } from "@/utils";
import { TComment } from "@/app/types";
import { ECardTypes, EPathPages } from "@/enums";
import { User, Typography, MetaInfo, ErrorMessage } from "@/components";

type TCustomCard = {
  avatarUrl: string;
  name: string;
  postAuthorId: string;
  comments?: TComment[];
  content: string;
  commentId?: string;
  likesCount?: number;
  commentsCount?: number;
  createdAt?: Date;
  id?: string;
  cardFor?: ECardTypes;
  likedByUser?: boolean;
};

const WRONG_TYPE: string = "Wrong argument cardFor";

export const CustomCard: React.FC<TCustomCard> = ({
  avatarUrl = "",
  name = "",
  postAuthorId = "",
  comments = [],
  content = "",
  commentId = "",
  likesCount = 0,
  commentsCount = 0,
  createdAt,
  id = "",
  cardFor = ECardTypes.POST,
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
      case ECardTypes.POST:
        await triggerGetAllPosts().unwrap();
        break;
      case ECardTypes.CURRENT_POST:
        await triggerGetAllPosts().unwrap();
        break;
      case ECardTypes.COMMENT:
        await triggerGetPostById(id).unwrap();
        break;
      default:
        throw new Error(WRONG_TYPE);
    }
  };

  const handleClick = async () => {
    try {
      likedByUser
        ? await unlike(id).unwrap()
        : await like({ postId: id }).unwrap();

      if (cardFor === ECardTypes.CURRENT_POST) {
        await triggerGetPostById(id).unwrap();
      }

      if (cardFor === ECardTypes.POST) {
        await triggerGetAllPosts().unwrap();
      }
    } catch (error) {
      catchError(error, setError);
    }
  };

  const handleRemove = async () => {
    try {
      switch (cardFor) {
        case ECardTypes.POST:
          await deletePost(id).unwrap();
          await refetchPosts();
          break;
        case ECardTypes.CURRENT_POST:
          await deletePost(id).unwrap();
          navigate(EPathPages.LAYOUT);
          break;
        case ECardTypes.COMMENT:
          await deleteComment(commentId).unwrap();
          await refetchPosts();
          break;
        default:
          throw new Error(WRONG_TYPE);
      }
    } catch (error) {
      catchError(error, setError);
    }
  };

  const isCommentAuthor =
    cardFor === ECardTypes.COMMENT &&
    comments.find(comment => comment.id === commentId)?.userId ===
      currentUser?.id;

  const canDelete =
    (cardFor !== ECardTypes.COMMENT && postAuthorId === currentUser?.id) ||
    isCommentAuthor;

  return (
    <Card className="mb-5 w-full max-w-full sm:max-w-sm md:max-w-md lg:max-w-lg">
      <CardHeader className="justify-between items-center bg-transparent">
        <Link to={`/users/${postAuthorId}`}>
          <User
            className="text-small font-semibold leading-none text-default-600"
            name={name}
            description={createdAt && formatToClientDate(createdAt)}
            avatarUrl={avatarUrl}
          />
        </Link>

        {canDelete && (
          <div className="cursor-pointer" onClick={handleRemove}>
            {deletePostStatus.isLoading || deleteCommentStatus.isLoading ? (
              <Spinner />
            ) : (
              <RiDeleteBinLine />
            )}
          </div>
        )}
      </CardHeader>
      <CardBody className="px-3 py-2 mb-5 break-words">
        <Typography>{content}</Typography>
      </CardBody>
      {cardFor !== ECardTypes.COMMENT && (
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
      )}
    </Card>
  );
};
