import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
} from "@nextui-org/react";
import { MdOutlineEmail } from "react-icons/md";

import { useEditUserProfileMutation } from "@/app/services/users-api";
import { ThemeContext } from "../theme-provider";

import { TUser } from "@/app/types";
import { catchError } from "@/utils";
import {
  EButtons,
  ECustomButtonColors,
  ECustomButtonTypes,
  ECustomButtonVariants,
  EInputFields,
  ELabels,
  EPlaceholders,
  ETitles,
} from "@/enums";
import { CustomInput, ErrorMessage } from "@/components";

type TEditProfile = {
  isOpen: boolean;
  onClose: () => void;
  user?: TUser;
};

export const EditProfile: React.FC<TEditProfile> = ({
  isOpen = false,
  onClose = () => null,
  user,
}) => {
  const { id } = useParams<{ id: string }>();
  const { theme } = useContext(ThemeContext);
  const [editUserProfile, { isLoading }] = useEditUserProfileMutation();
  const [error, setError] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { handleSubmit, control } = useForm<TUser>({
    defaultValues: {
      email: user?.email,
      name: user?.name,
      dateOfBirth: user?.dateOfBirth,
      bio: user?.bio,
      location: user?.location,
    },
    mode: "onChange",
    reValidateMode: "onBlur",
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files !== null) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const onSubmit = async (data: TUser) => {
    try {
      if (id) {
        const formData = new FormData();
        data.name && formData.append(EInputFields.name, data.name);
        data.email &&
          data.email !== user?.email &&
          formData.append(EInputFields.email, data.email);
        data.dateOfBirth &&
          formData.append(
            EInputFields.date_of_birth,
            new Date(data.dateOfBirth).toISOString(),
          );
        data.bio && formData.append(EInputFields.bio, data.bio);
        data.location && formData.append(EInputFields.location, data.location);
        selectedFile && formData.append(EInputFields.avatar, selectedFile);

        await editUserProfile({ userData: formData, id }).unwrap();
        onClose();
      }
    } catch (error) {
      catchError(error, setError);
    }
  };

  return (
    <Modal
      className={`${theme} text-foreground`}
      isOpen={isOpen}
      onClose={onClose}
      backdrop="blur"
    >
      <ModalContent>
        {onClose => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {ETitles.Edit_profile}
            </ModalHeader>
            <ModalBody>
              <form
                className="flex flex-col gap-4"
                onSubmit={handleSubmit(onSubmit)}
              >
                <CustomInput
                  control={control}
                  name={EInputFields.email}
                  type={EInputFields.email}
                  label={ELabels.Email}
                  placeholder={EPlaceholders.write_a_new_email}
                  endContent={<MdOutlineEmail />}
                />
                <CustomInput
                  control={control}
                  name={EInputFields.name}
                  type={EInputFields.text}
                  label={ELabels.Name}
                  placeholder={EPlaceholders.write_a_new_name}
                />
                <input
                  name={EInputFields.avatar_url}
                  type={EInputFields.file}
                  placeholder={EPlaceholders.choose_the_file}
                  onChange={handleFileChange}
                />
                <CustomInput
                  control={control}
                  name={EInputFields.date_of_birth}
                  type={EInputFields.date}
                  label={ELabels.Birthday}
                  placeholder={EPlaceholders.change_the_date}
                />
                <Controller
                  control={control}
                  name={EInputFields.bio}
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      rows={4}
                      placeholder={EPlaceholders.add_something_about_yourself}
                    />
                  )}
                />
                <CustomInput
                  control={control}
                  name={EInputFields.location}
                  type={EInputFields.location}
                  label={ELabels.Location}
                  placeholder={EPlaceholders.change_your_location}
                />
                <ErrorMessage error={error} />
                <div className="flex gap-2 justify-end">
                  <Button
                    type={ECustomButtonTypes.SUBMIT}
                    color={ECustomButtonColors.PRIMARY}
                    fullWidth
                    isLoading={isLoading}
                  >
                    {EButtons.Update_profile}
                  </Button>
                </div>
              </form>
            </ModalBody>
            <ModalFooter>
              <Button
                color={ECustomButtonColors.DANGER}
                variant={ECustomButtonVariants.LIGHT}
                onPress={onClose}
              >
                {EButtons.Close}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
