import { User } from "firebase/auth"
import React from "react"
import { AuthResponseProps } from "./ContextProvider"

export interface Position {
    latitude: number,
    longitude: number,
    fetched: boolean
}
  
  export interface PlaceProps {
    id: number
    name: string
    latitude: number
    longitude: number
    distance?: number
    type: number
    quiet: boolean
    solo: boolean
    gathering: boolean
    wifi: number
    outlet: boolean
    img: ImgProps[]
}

export interface ImgProps {
  id: number
  path: string
}

export interface ContextProps {
    placesList: PlaceProps[],
    selected?: number,
    setSelected: (arg?: number) => void,
    displayBody?: boolean,
    setDisplayBody: (arg: boolean) => void,
    displayPlacesList?: boolean,
    setDisplayPlacesList: (arg: boolean) => void,
    toggleDisplay: (arg?: boolean, newId?: number, previousId?: number) => void,
    userPosition: Position,
    setUserPosition: (arg: Position) => void,
    mapLoaded: boolean,
    setMapLoaded: (arg: boolean) => void,
    searchString: string,
    setSearchString: (arg: string) => void,
    desktopDisplay: boolean,
    displayLogo: boolean,
    setDisplayLogo: (arg: boolean) => void,
    signUpWithMailAndPassword: (email: string, password: string) => Promise<AuthResponseProps>,
    signInWithMailAndPassword: (email: string, password: string) => Promise<AuthResponseProps>,
    signOut: (arg: void) => void,
    user: User,
    userName: string,
    modal: number,
    setModal: (arg: number | null) => void,
}

const context: React.Context<ContextProps> = React.createContext({} as ContextProps)

export default context