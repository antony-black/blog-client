import { useParams } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";

import {
  TCommentData,
  useCreateCommentMutation,
} from "../../app/services/comments-api";
import { useLazyGetPostByIdQuery } from "../../app/services/posts-api";
import { Textarea } from "@nextui-org/react";
import ErrorMessage from "../error-message";
import { IoMdCreate } from "react-icons/io";
import CustomButton from "../custom-button";

export const CreateComment: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [createComment] = useCreateCommentMutation();
  const [getPostById] = useLazyGetPostByIdQuery();

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm<TCommentData>();

  const onSubmit = async ({ content }: { content: string }) => {
    try {
      if (id) {
        await createComment({ content, postId: id }).unwrap();
        await getPostById(id).unwrap();
        setValue("content", "");
      }
    } catch (error) {
      console.error("error: ", error);
    }
  };

  const error = errors?.content?.message as string;

  return (
    <form className="flex-grow" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="content"
        control={control}
        defaultValue=""
        rules={{
          required: "Required field.",
        }}
        render={({ field }) => (
          <Textarea
            {...field}
            labelPlacement="outside"
            placeholder="Write your comment."
            className="mb-5"
          />
        )}
      />
      {errors && <ErrorMessage error={error} />}
      <CustomButton
        className="flex-end"
        color="primary"
        endContent={<IoMdCreate />}
        type="submit"
      >
        Add comment
      </CustomButton>
    </form>
  );
};
