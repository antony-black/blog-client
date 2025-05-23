type TErrorMessage = {
  error: string
}

export const ErrorMessage: React.FC<TErrorMessage> = ({error = ""}) => {
  return error && <p className="text-red-500 mt-2 mb-5 text-small">{error}</p>
}
