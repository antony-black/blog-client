import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Textarea } from "@nextui-org/react";
import { IoMdCreate } from "react-icons/io";

import {
  TPostData,
  useCreatePostMutation,
  useLazyGetAllPostsQuery,
} from "@/app/services/posts-api";

import { catchError } from "@/utils";
import { ECustomButtonColors, ECustomButtonTypes, EInputFields } from "@/enums";
import { ErrorMessage, CustomButton } from "@/components";

const WHAT_DO_YOU_THINK: string = "What do you think?";
const ADD_POST: string = "Add post";

export const CreatePost: React.FC = () => {
  const [createPost] = useCreatePostMutation();
  const [triggerGetAllPosts] = useLazyGetAllPostsQuery();
  const [error, setError] = useState<string>("");

  const { handleSubmit, control, setValue } = useForm<TPostData>();

  const onSubmit = async (postData: TPostData) => {
    try {
      await createPost(postData).unwrap();
      setValue(EInputFields.content, "");
      await triggerGetAllPosts().unwrap();
    } catch (error) {
      catchError(error, setError);
    }
  };

  return (
    <form className="flex-grow" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name={EInputFields.content}
        control={control}
        defaultValue=""
        rules={{
          required: EInputFields.required,
        }}
        render={({ field }) => (
          <Textarea
            {...field}
            labelPlacement="outside"
            placeholder={WHAT_DO_YOU_THINK}
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
        {ADD_POST}
      </CustomButton>
    </form>
  );
};
