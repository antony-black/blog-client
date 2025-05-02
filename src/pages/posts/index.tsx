import { useGetAllPostsQuery } from "../../app/services/posts-api";
import { CreatePost } from "../../components/create-post";
import { CustomCard } from "../../components/custom-card";
import { CardTypes } from "../../enums/CardTypes";

const Posts: React.FC = () => {
  const { data } = useGetAllPostsQuery();

  return (
    <>
      <CreatePost />

      {data && data.length > 0
        ? data.map(post => (
            <CustomCard
              key={post.id}
              id={post.id}
              postAuthorId={post.authorId}
              avatarUrl={post.author.avatarUrl ?? ""}
              content={post.content}
              name={post.author.name ?? ""}
              likesCount={post.likes.length}
              commentsCount={post.comments.length}
              likedByUser={post.likedByUser}
              createdAt={post.createdAt}
              cardFor={CardTypes.POST}
            />
          ))
        : null}
    </>
  );
};

export default Posts;
