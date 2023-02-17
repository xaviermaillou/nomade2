import React, { useEffect, useState } from 'react';
import { fetchPlacesList } from '../request';
import PlaceElement from './PlaceElement';

export interface PlaceProps {
    id: number
    name: string
    latitude: number
    longitude: number
    distance: number
    type: string
    quiet: boolean
    solo: boolean
    gathering: boolean
    wifi: number
    outlet: boolean
}

interface PlacesListProps {
    displayPlacesList: boolean
}

const PlacesList: React.FunctionComponent<PlacesListProps> = (props) => {
    const [placesList, setPlacesList] = useState<PlaceProps[]>([])

    const fetchPlacesAndSetState = async (lat?: number, lon?: number) => {
        const result = await fetchPlacesList(lat, lon)
        setPlacesList(result)
    }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
            fetchPlacesAndSetState(position.coords.latitude, position.coords.longitude)
        })
    }, [])

    const [selected, setSelected] = useState<number | undefined>(undefined)

    return (
        <div id='mainList' className={props.displayPlacesList ? 'list container open' : 'list container'}>
            {
                placesList.map((place) => <PlaceElement
                    data={place}
                    isSelected={selected === place.id}
                    setSelected={setSelected}
                /> )
            }
        </div>
    )
}

export default PlacesList