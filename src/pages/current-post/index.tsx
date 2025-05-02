import { useParams } from "react-router-dom";

import { useGetPostByIdQuery } from "../../app/services/posts-api";

import { CustomCard } from "../../components/custom-card";
import { GoBack } from "../../components/go-back";
import { CreateComment } from "../../components/create-comment";
import { CardTypes } from "../../enums/CardTypes";
import ErrorMessage from "../../components/error-message";

const CurrentPost: React.FC = () => {
  const params = useParams<{ id: string }>();
  const { data, isError } = useGetPostByIdQuery(params.id ?? "");

  if (isError || !data) {
    return <ErrorMessage error="There is no post!" />;
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
        cardFor={CardTypes.CURRENT_POST}
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
                cardFor={CardTypes.COMMENT}
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
