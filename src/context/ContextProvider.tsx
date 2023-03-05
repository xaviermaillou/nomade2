import React, { ReactElement, useEffect, useState } from "react"
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
    const [mapLoaded, setMapLoaded] = useState<boolean>(false)

    const [userPosition, setUserPosition] = useState<Position>({
        latitude: 49.60833406110522,
        longitude: 6.127097420426896,
        fetched: false
    })

    const [searchString, setSearchString] = useState<string>('')

    const [firstSearchExecuted, setFirstSearchExecuted] = useState<boolean>(false)

    const fetchPlacesAndSetState = async () => {
        if (userPosition.fetched && mapLoaded) {
            const result: PlaceProps[] = await fetchPlacesList(userPosition.latitude, userPosition.longitude, 999999999999, searchString)
            setTimeout(() => {
                setPlacesList(result)
                setFirstSearchExecuted(true)
                setSelected(undefined)
            }, firstSearchExecuted ? 0 : 1000)
        }
    }

    const fetchPlaceImgAndSetState = async () => {
        if (selected) {
            const result: ImgProps[] = await fetchPlaceImg(selected)
            setTimeout(() => {
                setPlacesList((places) => {
                    return places.map((place) => {
                        if (place.id === selected) place.img = result
                        return place
                    })
                })
            }, 200)
        }
    }
    
    useEffect(() => {
        fetchPlacesAndSetState()
    }, [userPosition.fetched, mapLoaded, searchString])

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
            setUserPosition,
            mapLoaded,
            setMapLoaded,
            searchString,
            setSearchString
        } as ContextProps}>
            {props.children}
        </context.Provider>
    )
}

export default ContextProvider