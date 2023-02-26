import React, { useContext } from 'react';
import PlaceElement from './PlaceElement';
import context, { ContextProps } from "../context/context"

interface PlacesListProps {
    
}

const PlacesList: React.FunctionComponent<PlacesListProps> = (props) => {
    const contextData: ContextProps = useContext(context)

    return (
        <div id='mainList' className={
            contextData.displayPlacesList ?
                'list container open'
                :
                'list container'
            }
        >
            {
                contextData.placesList?.map((place) => <PlaceElement
                    data={place}
                    isSelected={contextData.selected === place.id}
                    key={place.id}
                /> )
            }
        </div>
    )
}

export default PlacesList