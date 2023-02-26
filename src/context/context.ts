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
    toggleDisplay: (arg: void) => void,
    userPosition: Position,
    setUserPosition: (arg: Position) => void,
    mapLoaded: boolean,
    setMapLoaded: (arg: boolean) => void,
    searchString: string,
    setSearchString: (arg: string) => void,
}

const context: React.Context<ContextProps> = React.createContext({} as ContextProps)

export default context