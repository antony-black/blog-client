import { useParams } from "react-router-dom";

import { useGetPostByIdQuery } from "../../app/services/posts-api";

import { ECardTypes } from "@/enums";
import {
  CustomCard,
  GoBack,
  CreateComment,
  ErrorMessage,
} from "@/components";

const CurrentPost: React.FC = () => {
  const params = useParams<{ id: string }>();
  const { data, isError } = useGetPostByIdQuery(params.id ?? "");

  const NO_POST_ERROR: string = "There is no post!";

  if (isError || !data) {
    return <ErrorMessage error={NO_POST_ERROR} />;
  }

  const {
    content,
    id,
    authorId,
    comments,
    likes,
    author,
    likedByUser,
    createdAt,
  } = data;

  return (
    <>
      <GoBack />
      <CustomCard
        id={id}
        cardFor={ECardTypes.CURRENT_POST}
        avatarUrl={author.avatarUrl ?? ""}
        name={author.name ?? ""}
        postAuthorId={authorId}
        content={content}
        likesCount={likes.length}
        commentsCount={comments.length}
        likedByUser={likedByUser}
        createdAt={createdAt}
      />
      <div className="mt-10">
        <CreateComment />
      </div>

      <div className="mt-10">
        {comments
          ? comments.map(comment => (
              <CustomCard
                key={comment.id}
                id={id}
                cardFor={ECardTypes.COMMENT}
                avatarUrl={comment.user.avatarUrl ?? ""}
                name={comment.user.name ?? ""}
                postAuthorId={authorId}
                comments={comments}
                content={comment.content}
                commentId={comment.id}
              />
            ))
          : null}
      </div>
    </>
  );
};

export default CurrentPost;
