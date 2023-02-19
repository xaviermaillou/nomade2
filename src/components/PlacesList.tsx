import React, { useEffect, useState } from 'react';
import { Position } from '../App';
import { fetchPlacesList } from '../request';
import PlaceElement from './PlaceElement';

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

interface PlacesListProps {
    displayPlacesList: boolean
    userPosition?: Position
    map?: any
}

const PlacesList: React.FunctionComponent<PlacesListProps> = (props) => {
    const [placesList, setPlacesList] = useState<PlaceProps[]>([])

    const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

    const fetchPlacesAndSetState = async (lat?: number, lon?: number) => {
        const result: PlaceProps[] = await fetchPlacesList(lat, lon)
        /* result.forEach((place) => {
            new mapboxgl.Marker()
                .setLngLat([place.longitude, place.latitude])
                .addTo(props.map)
        }) */
        setPlacesList(result)
    }

    useEffect(() => {
        fetchPlacesAndSetState(props.userPosition?.latitude, props.userPosition?.longitude)
    }, [props.userPosition?.fetched])

    const [selected, setSelected] = useState<number | undefined>(undefined)

    return (
        <div id='mainList' className={
            props.displayPlacesList ?
                'list container open'
                :
                'list container'
            }
        >
            {
                placesList.map((place) => <PlaceElement
                    data={place}
                    isSelected={selected === place.id}
                    setSelected={setSelected}
                    userPositionFetched={props.userPosition?.fetched || false}
                    key={place.id}
                /> )
            }
        </div>
    )
}

export default PlacesList