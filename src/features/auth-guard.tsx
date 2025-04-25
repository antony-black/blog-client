import { Spinner } from "@nextui-org/react"
import { useCurrentQuery } from "../app/services/users-api"

type TAuthGuard = {
  children: React.ReactNode;
}

export const AuthGuard: React.FC<TAuthGuard> = ({ children }) => {
  const { isLoading } = useCurrentQuery()

  if (isLoading) {
    return <Spinner />
  }
  return children
}