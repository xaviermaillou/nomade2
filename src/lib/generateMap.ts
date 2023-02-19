import { PlaceProps, Position } from "../App";

export const generateMap = (
    setUserPosition: (arg: Position) => void,
    setDisplayMap: (arg: boolean) => void,
    placesList: PlaceProps[],
    setSelected: (arg?: number) => void,
    forceOpenBody: (arg: void) => void
) => {
    const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js')
    let map
    mapboxgl.accessToken = 
        `pk.eyJ1IjoieGF2aWVyamVhbiIsImEiOiJjbGUzYXl1dXAwM2g5M25tcHBhcnowc3pmIn0.5AXUHhsjd3pfaGVQObJ72w` as string

    navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
        setUserPosition({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            fetched: true
        })

        map = new mapboxgl.Map({
            container: 'mapContainer',
            style: 'mapbox://styles/xavierjean/cle3b5naa008501pdz0ckgjk3',
            center: [position.coords.longitude, position.coords.latitude],
            zoom: 13,
        })
        setDisplayMap(true)

        const handleMarkerClick = (id: number) => {
            setSelected(id)
            forceOpenBody()
        }

        for (const place of placesList) {
            const marker = document.createElement('div');
            marker.className = 'marker'
            marker.id = 'marker'+place.id
            marker.onclick = () => handleMarkerClick(place.id)
            
            new mapboxgl.Marker(marker).setLngLat([place.longitude, place.latitude]).addTo(map)
        }
    })
}