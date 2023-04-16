import React from "react"

export interface PreferencesProps {
    liked?: boolean
    notes?: string
}

export interface ImgProps {
  id: number
  path: string
}

export interface DetailProps {
    id: number
    gluten_free_food: boolean,
    vegetal_milk: boolean,
    vegan_food: boolean,
    decaf: boolean
}

export interface PlaceProps {
    id: number
    name: string
    latitude: number
    longitude: number
    address: string
    distance?: number
    type: number
    quiet: number
    wifi: number
    outlet: number
    seats: number
    img: ImgProps[]
    details: DetailProps
    preferences: PreferencesProps
}

export interface Position {
    latitude: number,
    longitude: number,
    fetched: boolean
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
    modal: number,
    setModal: (arg: number | null) => void,
}

const context: React.Context<ContextProps> = React.createContext({} as ContextProps)

export default context