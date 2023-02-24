import React, { ReactElement, ReactNode, useEffect, useState } from "react"
import { fetchPlaceImg, fetchPlacesList } from "../request"
import context, { ContextProps, ImgProps, PlaceProps, Position } from "./context"

interface ContextProviderProps {
    children: ReactElement
}

const ContextProvider: React.FunctionComponent<ContextProviderProps> = (props) => {
    const [placesList, setPlacesList] = useState<PlaceProps[]>([])
    const [selected, setSelected] = useState<number | undefined>(undefined)
    
    const [displayBody, setDisplayBody] = useState<boolean>(true)
    const [displayPlacesList, setDisplayPlacesList] = useState<boolean>(true)
    const toggleDisplay = () => {
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

    const fetchPlaceImgAndSetState = async () => {
        if (selected) {
            const result: ImgProps[] = await fetchPlaceImg(selected)
            setPlacesList((places) => {
                return places.map((place) => {
                    if (place.id === selected) place.img = result
                    return place
                })
            })
        }
    }
    
    useEffect(() => {
        fetchPlacesAndSetState()
    }, [userPosition.fetched])

    useEffect(() => {
        fetchPlaceImgAndSetState()
    }, [selected])

    return (
        <context.Provider value={{
            placesList,
            selected,
            setSelected,
            displayBody,
            setDisplayBody,
            displayPlacesList,
            setDisplayPlacesList,
            toggleDisplay,
            userPosition,
            setUserPosition
        } as ContextProps}>
            {props.children}
        </context.Provider>
    )
}

export default ContextProvider