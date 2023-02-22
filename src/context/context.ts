import React from "react"

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
    type: string
    quiet: boolean
    solo: boolean
    gathering: boolean
    wifi: number
    outlet: boolean
}

export interface ContextProps {
    placesList?: PlaceProps[],
    setPlacesList: (arg: PlaceProps[]) => void,
    selected?: number,
    setSelected: (arg?: number) => void,
    displayBody?: boolean,
    setDisplayBody: (arg: boolean) => void,
    displayPlacesList?: boolean,
    setDisplayPlacesList: (arg: boolean) => void,
    toggleBody: (arg: void) => void,
    userPosition: Position,
    setUserPosition: (arg: Position) => void,
}

const context: React.Context<ContextProps> = React.createContext({} as ContextProps)

export default context