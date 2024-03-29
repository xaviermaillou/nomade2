import React, { useContext, useEffect, useState } from "react"
import ReactMapGL, { Marker } from "react-map-gl"
import mapboxgl from "mapbox-gl";
import { ContextProps, DataContext } from "../context/DataContext"
import { placeTypeColor } from "../lib/dictionary"
import { scrollToElementInList } from "../lib/domHandling"

// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default

const Map:React.FunctionComponent = () => {
    const contextData: ContextProps = useContext(DataContext)

    const [displayMap, setDisplayMap] = useState<boolean>(true)
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
            setViewport((v) => {
                return {
                    ...v,
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                }
            })
        }, (err) => {
            if (err) throw err
        }, {
            enableHighAccuracy: true,
            // add private ip as trustable
        })
    ), [])

    const handleMarkerClick = (id: number) => {
        const previousId = contextData.selected
        contextData.setSelected(id)
        if (!contextData.displayBody) contextData.toggleDisplay(true, id, previousId)
        else scrollToElementInList(contextData.desktopDisplay, id, previousId)
    }

    return (
        <div id='mapContainer' className={
            displayMap ?
                (contextData.displayBody ? '' : 'open')
                :
                'hidden'
        }>
            {!contextData.mapLoaded &&
                <div className="loading fullHeight fullWidth">
                    <img alt='loading' src='/img/loading.gif' />
                </div>
            }
            {contextData.userPosition.fetched &&
                <ReactMapGL
                    onLoad={() => contextData.setMapLoaded(true)}
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
                                `${placeTypeColor[place.type]} marker clickable  selected`
                                :
                                `${placeTypeColor[place.type]} marker clickable `}
                            ></div>
                        </Marker>
                    ))}
                </ReactMapGL>
            }
        </div>
    )
}

export default Map
