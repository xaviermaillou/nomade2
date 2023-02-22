// LEGACY FILE

import { PlaceProps } from "../context/context"

export interface GeoJsonProps {
    type: "Feature",
    geometry: {
        type: "Point",
        coordinates: [lon: number, lat: number]
    }
}

export interface GeoJsonCollectionProps {
    type: "FeatureCollection",
    features: GeoJsonProps[]
}

export const buildGeoJsonCollection = (places: PlaceProps[]): GeoJsonCollectionProps => {
    const geoJsonCollection: GeoJsonCollectionProps = {
        type: "FeatureCollection",
        features: []
    }
    places.forEach((place) => {
        const geoJson: GeoJsonProps = {
            type: "Feature",
            geometry: {
                type: "Point",
                coordinates: [place.longitude, place.latitude]
            }
        }
        geoJsonCollection.features.push(geoJson)
    })
    return geoJsonCollection
}