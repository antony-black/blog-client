import { useParams } from "react-router-dom";
import { useGetPostByIdQuery } from "../../app/services/posts-api";
import { CustomCard } from "../../components/custom-card";
import { GoBack } from "../../components/go-back";
import { CreateComment } from "../../components/create-comment";

const CurrentPost: React.FC = () => {
  const params = useParams<{ id: string }>();
  const { data } = useGetPostByIdQuery(params.id ?? "");

  if (!data) {
    return <h2>There is no post!</h2>;
  } else {
    console.log('data >>>>', data);
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
        cardFor="current-post"
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
        {data.comments
          ? data.comments.map(comment => (
              <CustomCard
                key={comment.id}
                id={id}
                cardFor="comment"
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
