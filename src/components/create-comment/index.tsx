import { useState } from "react";
import { useParams } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { Textarea } from "@nextui-org/react";
import { IoMdCreate } from "react-icons/io";

import {
  TCommentData,
  useCreateCommentMutation,
} from "../../app/services/comments-api";
import { useLazyGetPostByIdQuery } from "../../app/services/posts-api";

import ErrorMessage from "../error-message";
import CustomButton from "../custom-button";
import { catchError } from "../../utils/error-util";
import { ECustomButtonColors, ECustomButtonTypes } from "../../enums";

export const CreateComment: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [createComment] = useCreateCommentMutation();
  const [getPostById] = useLazyGetPostByIdQuery();
    const [error, setError] = useState<string>("");

  const {
    handleSubmit,
    control,
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
      catchError(error, setError);
    }
  };

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
      <ErrorMessage error={error} />
      <CustomButton
        className="flex-end"
        color={ECustomButtonColors.PRIMARY}
        endContent={<IoMdCreate />}
        type={ECustomButtonTypes.SUBMIT}
      >
        Add comment
      </CustomButton>
    </form>
  );
};
