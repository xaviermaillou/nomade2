import React, { useContext, useEffect, useState } from 'react';
import PlaceElement from './PlaceElement';
import context, { ContextProps } from "../context/context"

interface PlacesListProps {
    
}

const PlacesList: React.FunctionComponent<PlacesListProps> = (props) => {
    const contextData: ContextProps = useContext(context)

    const handleScroll = (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => { 
        const container = e.target as HTMLDivElement
        contextData.setDisplayLogo(container.scrollTop < 50)
    }

    return (
        <div id='mainList' className={
            contextData.displayPlacesList ?
                'list container open'
                :
                'list container'
            }
            onScroll={handleScroll}
        >
            <div id="closeList" className={contextData.displayLogo ? "clickable horizontal fullWidth" : "hidden clickable horizontal fullWidth"} onClick={() => contextData.toggleDisplay()}>
                <img alt={contextData.displayBody ? "close" : "open"} src="/img/arrow.png" className={
                    contextData.displayBody ?
                    "fullHeight"
                    :
                    "fullHeight reverse"}
                />
            </div>
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