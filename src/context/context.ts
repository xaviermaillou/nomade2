import React from "react"
import { AuthMethods, PlaceProps, Position } from "./ContextProvider"

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
    authMethod: AuthMethods,
    setAuthMethod: (arg: AuthMethods) => void,
    setUserPosition: (arg: Position) => void,
    mapLoaded: boolean,
    setMapLoaded: (arg: boolean) => void,
    searchString: string,
    setSearchString: (arg: string) => void,
    desktopDisplay: boolean,
    displayLogo: boolean,
    setDisplayLogo: (arg: boolean) => void,
    modal: number,
    setModal: (arg: number | null) => void,
    warningPlaceId?: number,
    setWarningPlaceId: (arg?: number) => void
}

const context: React.Context<ContextProps> = React.createContext({} as ContextProps)

export default context