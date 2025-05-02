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

import { useEditUserProfileMutation } from "../../app/services/users-api";
import { ThemeContext } from "../theme-provider";

import { TUser } from "../../app/types";
import { catchError } from "../../utils/error-util";
import {
  ECustomButtonColors,
  ECustomButtonTypes,
  ECustomButtonVariants,
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
        data.name && formData.append("name", data.name);
        data.email &&
          data.email !== user?.email &&
          formData.append("email", data.email);
        data.dateOfBirth &&
          formData.append(
            "dateOfBirth",
            new Date(data.dateOfBirth).toISOString(),
          );
        data.bio && formData.append("bio", data.bio);
        data.location && formData.append("location", data.location);
        selectedFile && formData.append("avatar", selectedFile);

        await editUserProfile({ userData: formData, id }).unwrap();
        onClose();
      }
    } catch (error) {
      catchError(error, setError);
    }
  };
  // const onSubmit = async (data: TUser) => {
  //   try {
  //     if (id) {
  //       const formData = new FormData();
  //       if (data.name) formData.append("name", data.name);
  //       if (data.email && data.email !== user?.email) formData.append("email", data.email);
  //       if (data.dateOfBirth) {
  //         formData.append("dateOfBirth", new Date(data.dateOfBirth).toISOString());
  //       }
  //       if (data.bio) formData.append("bio", data.bio);
  //       if (data.location) formData.append("location", data.location);
  //       // if (selectedFile) formData.append("avatar", selectedFile);

  //       await editUserProfile({ userData: formData, id }).unwrap();
  //       onClose();
  //     }
  //   } catch (error) {
  //     catchError(error, setError);
  //   }
  // };

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
              Edit profile
            </ModalHeader>
            <ModalBody>
              <form
                className="flex flex-col gap-4"
                onSubmit={handleSubmit(onSubmit)}
              >
                <CustomInput
                  control={control}
                  name="email"
                  type="email"
                  label="Email"
                  placeholder="write a new email"
                  endContent={<MdOutlineEmail />}
                />
                <CustomInput
                  control={control}
                  name="name"
                  type="text"
                  label="Name"
                  placeholder="write a new name"
                />
                <input
                  name="avatarUrl"
                  type="file"
                  placeholder="choose the file"
                  onChange={handleFileChange}
                />
                <CustomInput
                  control={control}
                  name="dateOfBirth"
                  type="date"
                  label="Birthday"
                  placeholder="change the date"
                />
                <Controller
                  control={control}
                  name="bio"
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      rows={4}
                      placeholder="please, add something about yourself"
                    />
                  )}
                />
                <CustomInput
                  control={control}
                  name="location"
                  type="Location"
                  label="location"
                  placeholder="change your location"
                />
                <ErrorMessage error={error} />
                <div className="flex gap-2 justify-end">
                  <Button
                    type={ECustomButtonTypes.SUBMIT}
                    color={ECustomButtonColors.PRIMARY}
                    fullWidth
                    isLoading={isLoading}
                  >
                    Update profile
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
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
