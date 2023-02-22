import React, { ReactElement, ReactNode, useEffect, useState } from "react"
import { fetchPlacesList } from "../request"
import context, { ContextProps, PlaceProps, Position } from "./context"

interface ContextProviderProps {
    children: ReactElement
}

const ContextProvider: React.FunctionComponent<ContextProviderProps> = (props) => {
    const [placesList, setPlacesList] = useState<PlaceProps[]>([])
    const [selected, setSelected] = useState<number | undefined>(undefined)
    
    const [displayBody, setDisplayBody] = useState<boolean>(true)
    const [displayPlacesList, setDisplayPlacesList] = useState<boolean>(true)
    const toggleBody = () => {
        setDisplayBody(!displayBody)
        setDisplayPlacesList(!displayPlacesList)
    }

    const [userPosition, setUserPosition] = useState<Position>({
        latitude: 49.60833406110522,
        longitude: 6.127097420426896,
        fetched: false
    })

    const fetchPlacesAndSetState = async () => {
        const result: PlaceProps[] = await fetchPlacesList(userPosition.latitude, userPosition.longitude)
        setPlacesList(result)
    }
    
    useEffect(() => {
        fetchPlacesAndSetState()
    }, [userPosition.fetched])

    return (
        <context.Provider value={{
            placesList,
            setPlacesList,
            selected,
            setSelected,
            displayBody,
            setDisplayBody,
            displayPlacesList,
            setDisplayPlacesList,
            toggleBody,
            userPosition,
            setUserPosition
        } as ContextProps}>
            {props.children}
        </context.Provider>
    )
}

export default ContextProvider