import React, { ReactElement, useCallback, useContext, useEffect, useState } from "react"
import { scrollToElementInList } from "../lib/domHandling"
import context, { ContextProps, DetailProps, ImgProps, PlaceProps, Position, PreferencesProps } from "./context"
import requests, { RequestsProps } from "./requests"

interface ContextProviderProps {
    children: ReactElement
}


const ContextProvider: React.FunctionComponent<ContextProviderProps> = (props) => {
    const requestData: RequestsProps = useContext(requests)

    const [modal, setModal] = useState<number | null>(null)

    const [selected, setSelected] = useState<number | undefined>(undefined)
    
    const [displayBody, setDisplayBody] = useState<boolean>(true)
    const [displayPlacesList, setDisplayPlacesList] = useState<boolean>(true)

    const [mapLoaded, setMapLoaded] = useState<boolean>(false)

    const [userPosition, setUserPosition] = useState<Position>({
        latitude: 49.60833406110522,
        longitude: 6.127097420426896,
        fetched: false
    })

    const [searchString, setSearchString] = useState<string>('')

    const [desktopDisplay, setDesktopDisplay] = useState<boolean>(window.innerWidth >= 961)

    const [warningPlaceId, setWarningPlaceId] = useState<number | undefined>(undefined)

    const toggleDisplay = useCallback((arg?: boolean, newId?: number, previousId?: number) => {
        if (displayBody) {
            setDisplayLogo(true)
            ;(document.getElementById('mainList') as HTMLDivElement).scrollTop = 0
        } else if (newId) {
            if (!selected) setSelected(newId)
            scrollToElementInList(desktopDisplay, newId, previousId)
        }
        setDisplayBody(arg || !displayBody)
        setDisplayPlacesList(arg || !displayPlacesList)
    }, [desktopDisplay, displayBody, displayPlacesList, selected])

    const handleWindowResize = useCallback(() => {
        const isDesktopDisplay = window.innerWidth >= 961
        setDesktopDisplay(isDesktopDisplay)
        if (isDesktopDisplay) toggleDisplay(true)
    }, [toggleDisplay])

    useEffect(() => {
        window.addEventListener('resize', handleWindowResize)
        return () => {
            window.removeEventListener('resize', handleWindowResize)
        }
    }, [handleWindowResize])

    const [displayLogo, setDisplayLogo] = useState<boolean>(true)

    const [placesList, setPlacesList] = useState<PlaceProps[]>([])

    const [firstSearchExecuted, setFirstSearchExecuted] = useState<boolean>(false)

    const [alreadyFetchedPlacesDetails, setAlreadyFetchedPlacesDetails] = useState<number[]>([])

    const addElementToAlreadyFetchedPlacesDetails = (id: number) => {
        setAlreadyFetchedPlacesDetails((array: number[]) => {
            return [ ...array, id ]
        })
    }

    const fetchPlacesAndSetState = useCallback(async () => {
        if (userPosition.fetched && mapLoaded) {
            const result: PlaceProps[] = await requestData.fetchPlacesList(userPosition.latitude, userPosition.longitude, 999999999999, searchString)
            setTimeout(() => {
                setPlacesList(result)
                setFirstSearchExecuted(true)
                setSelected(undefined)
            }, firstSearchExecuted ? 0 : 1000)
        }
    }, [firstSearchExecuted, mapLoaded, requestData, searchString, userPosition])

    const fetchPlaceDetailsAndSetState = useCallback(async () => {
        if (selected) {
            const imgResult: ImgProps[] = await requestData.fetchPlaceImg(selected)
            const detailsResult: DetailProps = await requestData.fetchPlaceDetails(selected)
            const preferences: PreferencesProps = await requestData.fetchPlacePreferences(selected)
            setTimeout(() => {
                setPlacesList((places) => {
                    return places.map((place) => {
                        if (place.id === selected) {
                            place.img = imgResult
                            place.details = detailsResult
                            place.preferences = preferences
                        }
                        return place
                    })
                })
            }, 200)
        }
    }, [requestData, selected])
    
    useEffect(() => {
        fetchPlacesAndSetState()
    }, [userPosition.fetched, mapLoaded, searchString, fetchPlacesAndSetState])

    useEffect(() => {
        if (selected && !alreadyFetchedPlacesDetails.includes(selected)) {
            fetchPlaceDetailsAndSetState()
            addElementToAlreadyFetchedPlacesDetails(selected)
        }
    }, [selected, alreadyFetchedPlacesDetails, fetchPlaceDetailsAndSetState])

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
            setSearchString,
            desktopDisplay,
            displayLogo,
            setDisplayLogo,
            modal,
            setModal,
            warningPlaceId,
            setWarningPlaceId
        } as ContextProps}>
            {props.children}
        </context.Provider>
    )
}

export default ContextProvider