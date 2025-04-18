export type TErrorWithMessage = {
  status: number;
  data: {
    message: string;
  };
};

export type TSetError = React.Dispatch<React.SetStateAction<string>>;
