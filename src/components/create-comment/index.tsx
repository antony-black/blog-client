import { useState } from "react";
import { useParams } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { Textarea } from "@nextui-org/react";
import { IoMdCreate } from "react-icons/io";

import {
  TCommentData,
  useCreateCommentMutation,
  useLazyGetPostByIdQuery,
} from "@/app/services";

import { catchError } from "@/utils";
import {
  EButtons,
  ECustomButtonColors,
  ECustomButtonTypes,
  EInputFields,
  EPlaceholders,
} from "@/enums";
import { ErrorMessage, CustomButton } from "@/components";

export const CreateComment: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [createComment] = useCreateCommentMutation();
  const [getPostById] = useLazyGetPostByIdQuery();
  const [error, setError] = useState<string>("");

  const { handleSubmit, control, setValue } = useForm<TCommentData>();

  const onSubmit = async ({ content }: { content: string }) => {
    try {
      if (id) {
        await createComment({ content, postId: id }).unwrap();
        await getPostById(id).unwrap();
        setValue(EInputFields.content, "");
      }
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
            placeholder={EPlaceholders.write_comment}
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
        {EButtons.Add_comment}
      </CustomButton>
    </form>
  );
};
