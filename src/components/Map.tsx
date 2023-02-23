import React, { useContext, useEffect, useState } from "react"
import ReactMapGL, { Marker } from "react-map-gl"
import context, { ContextProps } from "../context/context"
import { placeTypeColor } from "../lib/dictionary"

interface MapProps {

}

const Map:React.FunctionComponent<MapProps> = (props) => {
    const contextData: ContextProps = useContext(context)

    const [displayMap, setDisplayMap] = useState<boolean>(false)
    const [viewport, setViewport] = useState({
        latitude: contextData.userPosition?.latitude,
        longitude: contextData.userPosition?.longitude,
        zoom: 15,
    })

    useEffect(() => (
        navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
            contextData.setUserPosition({
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
        contextData.setSelected(id)
        contextData.toggleDisplay()
    }

    return (
        <div id='mapContainer' className={
            displayMap ?
                (contextData.displayBody ? '' : 'open')
                :
                'hidden'
        }>
            {contextData.userPosition.fetched && <ReactMapGL
                mapboxAccessToken='pk.eyJ1IjoieGF2aWVyamVhbiIsImEiOiJjbGUzYXl1dXAwM2g5M25tcHBhcnowc3pmIn0.5AXUHhsjd3pfaGVQObJ72w'
                mapStyle='mapbox://styles/xavierjean/cle3b5naa008501pdz0ckgjk3'
                style={{
                    height: '100%',
                    width: '100%',
                }}
                initialViewState={viewport}
                
            >
                {contextData.userPosition.fetched && <Marker
                        anchor="bottom"
                        latitude={contextData.userPosition.latitude}
                        longitude={contextData.userPosition.longitude}
                    >
                        <div className='userPosition'></div>
                    </Marker>
                }
                {contextData.placesList?.map((place, i) => (
                    <Marker
                        anchor="bottom"
                        latitude={place.latitude}
                        longitude={place.longitude}
                        onClick={() => handleMarkerClick(place.id)}
                        key={i}
                    >
                        <div className={place.id === contextData.selected ?
                            `${placeTypeColor[place.type]} marker selected`
                            :
                            `${placeTypeColor[place.type]} marker`}
                        ></div>
                    </Marker>
                ))}
            </ReactMapGL>}
        </div>
    )
}

export default Map
