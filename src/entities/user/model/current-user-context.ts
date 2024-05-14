import { createContext, useContext } from "react"
import { GetUserResponse } from "../api/use-get-current-user"
import { UseQueryResult } from "@tanstack/react-query"

interface CurrentUserContextProps {
  query: UseQueryResult<GetUserResponse, Error>
}

export const CurrentUserContext = createContext({} as CurrentUserContextProps)

export const useCurrentUser = () => useContext(CurrentUserContext)
