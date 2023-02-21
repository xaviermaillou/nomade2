import React, { useEffect, useState } from "react"
import ReactMapGL, { Marker } from "react-map-gl"
import { PlaceProps, Position } from "../App"

interface MapProps {
    displayBody: boolean,
    userPosition: Position,
    setUserPosition: (arg: Position) => void,
    placesList: PlaceProps[],
    selected?: number,
    setSelected: (arg?: number) => void,
    toggleBody: (arg: void) => void,
}

const Map:React.FunctionComponent<MapProps> = (props) => {
    const [displayMap, setDisplayMap] = useState<boolean>(false)
    const [viewport, setViewport] = useState({
        latitude: props.userPosition.latitude,
        longitude: props.userPosition.longitude,
        zoom: 16,
    })

    useEffect(() => (
        navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
            props.setUserPosition({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                fetched: true
            })
            setViewport({
                ...viewport,
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            })
            setDisplayMap(true)
        })
    ), [])

    const handleMarkerClick = (id: number) => {
        props.setSelected(id)
        props.toggleBody()
    }

    return (
        <div id='mapContainer' className={
            displayMap ?
                (props.displayBody ? '' : 'open')
                :
                'hidden'
        }>
            {props.userPosition.fetched && <ReactMapGL
                mapboxAccessToken='pk.eyJ1IjoieGF2aWVyamVhbiIsImEiOiJjbGUzYXl1dXAwM2g5M25tcHBhcnowc3pmIn0.5AXUHhsjd3pfaGVQObJ72w'
                mapStyle='mapbox://styles/xavierjean/cle3b5naa008501pdz0ckgjk3'
                style={{
                    height: '100%',
                    width: '100%',
                }}
                initialViewState={viewport}
                
            >
                {props.placesList.map((place) => (
                    <Marker
                        latitude={place.latitude}
                        longitude={place.longitude}
                        onClick={() => handleMarkerClick(place.id)}
                    >
                        <div className={place.id === props.selected ? 'marker selected' : 'marker'}></div>
                    </Marker>
                ))}
            </ReactMapGL>}
        </div>
    )
}

export default Map
