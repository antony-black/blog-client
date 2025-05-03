import { TErrorWithMessage, TSetError } from "@/types";

const UNKNOWN_ERROR: string = "Unknown error.";

export const isErrorWithMessage = (
  error: unknown,
): error is TErrorWithMessage => {
  return (
    typeof error === "object" &&
    error !== null &&
    "data" in error &&
    typeof (error as Record<string, unknown>).data === "object"
  );
};

export const catchError = (error: unknown, setError: TSetError) => {
  const isErrorHasMessage = isErrorWithMessage(error);

  if (isErrorHasMessage) {
    setError(error.data.message);
  } else {
    setError(UNKNOWN_ERROR);
  }
};
