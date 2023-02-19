import React, { useEffect, useState } from 'react';
import { PlaceProps, Position } from '../App';
import PlaceElement from './PlaceElement';

interface PlacesListProps {
    placesList: PlaceProps[]
    displayPlacesList: boolean
    selected?: number
    setSelected: (arg?: number) => void
    userPosition?: Position
}

const PlacesList: React.FunctionComponent<PlacesListProps> = (props) => {
    return (
        <div id='mainList' className={
            props.displayPlacesList ?
                'list container open'
                :
                'list container'
            }
        >
            {
                props.placesList.map((place) => <PlaceElement
                    data={place}
                    isSelected={props.selected === place.id}
                    setSelected={props.setSelected}
                    userPositionFetched={props.userPosition?.fetched || false}
                    key={place.id}
                /> )
            }
        </div>
    )
}

export default PlacesList