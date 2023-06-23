import React, { useContext, useEffect, useState } from 'react';
import PlaceElement from './PlaceElement';
import { ContextProps, DataContext } from "../context/DataContext"
import { PlaceProps } from '../context/DataContext';

interface PlacesListProps {
    
}

const PlacesList: React.FunctionComponent<PlacesListProps> = (props) => {
    const contextData: ContextProps = useContext(DataContext)

    const [logoHidingHandled, setLogoHidingHandled] = useState<boolean>(false)

    const handleScroll = (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => { 
        const container = e.target as HTMLDivElement
        if (logoHidingHandled && container.scrollTop < 50) {
            contextData.setDisplayLogo(true)
            setLogoHidingHandled(false)
        }
        if (!logoHidingHandled && container.scrollTop > 50) {
            contextData.setDisplayLogo(false)
            setLogoHidingHandled(true)
        }
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
            {(!contextData.displayBody && !contextData.desktopDisplay) &&
                <PlaceElement
                    data={
                        contextData.placesList.find((place) => place.id === contextData.selected)
                        || contextData.placesList[0] as PlaceProps
                    }
                    isCopy={true}
                    isSelected={true}
                    key="placeElementCopy"
                />
            }
            {
                contextData.placesList?.map((place) => <PlaceElement
                    data={place}
                    isCopy={false}
                    isSelected={contextData.selected === place.id}
                    key={place.id}
                /> )
            }
        </div>
    )
}

export default PlacesList