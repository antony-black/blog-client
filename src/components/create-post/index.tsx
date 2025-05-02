import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Textarea } from "@nextui-org/react";
import { IoMdCreate } from "react-icons/io";

import {
  TPostData,
  useCreatePostMutation,
  useLazyGetAllPostsQuery,
} from "../../app/services/posts-api";

import ErrorMessage from "../error-message";
import CustomButton from "../custom-button";
import { catchError } from "../../utils/error-util";
import { ECustomButtonColors, ECustomButtonTypes } from "../../enums";

export const CreatePost: React.FC = () => {
  const [createPost] = useCreatePostMutation();
  const [triggerGetAllPosts] = useLazyGetAllPostsQuery();
  const [error, setError] = useState<string>("");

  const { handleSubmit, control, setValue } = useForm<TPostData>();

  const onSubmit = async (postData: TPostData) => {
    try {
      await createPost(postData).unwrap();
      setValue("content", "");
      await triggerGetAllPosts().unwrap();
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
          required: "Required field!",
        }}
        render={({ field }) => (
          <Textarea
            {...field}
            labelPlacement="outside"
            placeholder="What do you think?"
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
        Add post
      </CustomButton>
    </form>
  );
};
