import { Controller, useForm } from "react-hook-form";
import {
  TPostData,
  useCreatePostMutation,
  useLazyGetAllPostsQuery,
} from "../../app/services/posts-api";
import { Textarea } from "@nextui-org/react";
import ErrorMessage from "../error-message";
import CustomButton from "../custom-button";
import { IoMdCreate } from "react-icons/io";
import { useState } from "react";
import { catchError } from "../../utils/error-util";
import { CustomButtonColors, CustomButtonTypes } from "../../enums/CustomButtonPropertiesTypes";

export const CreatePost: React.FC = () => {
  const [createPost] = useCreatePostMutation();
  const [triggerGetAllPosts] = useLazyGetAllPostsQuery();  
  const [error, setError] = useState<string>("");

  const {
    handleSubmit,
    control,
    setValue,
  } = useForm<TPostData>();

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
        color={CustomButtonColors.PRIMARY}
        endContent={<IoMdCreate />}
        type={CustomButtonTypes.SUBMIT}
      >
        Add post
      </CustomButton>
    </form>
  );
};
