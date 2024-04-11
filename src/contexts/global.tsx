import React, { createContext, useContext, useEffect, useState } from 'react'

interface GlobalContextData {
  menuSearchWord?: string
  setMenuSearchWord?: React.Dispatch<React.SetStateAction<GlobalContextData['menuSearchWord']>>
}

const GlobalContext = createContext({} as GlobalContextData)

export function GlobalContextProvider(props: React.PropsWithChildren) {
  const { children } = props

  const [menuSearchWord, setMenuSearchWord] = useState<string>()

  return <GlobalContext.Provider value={{ menuSearchWord, setMenuSearchWord }}>{children}</GlobalContext.Provider>
}

export const useGlobalContext = () => useContext(GlobalContext)
