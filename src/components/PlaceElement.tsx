import React, { useContext } from 'react';
import { outletsScore, placeTypeColor, placeTypeName, quietScore, seatsScore, wifiScore } from '../lib/dictionary';
import { PlaceProps } from '../context/ContextProvider';
import context, { ContextProps } from "../context/context"
import PlaceCarrousel from './PlaceCarrousel';

interface PlaceElementProps {
    data: PlaceProps
    isCopy: boolean
    isSelected?: boolean
}

const PlaceElement: React.FunctionComponent<PlaceElementProps> = (props) => {
    const contextData: ContextProps = useContext(context)
    
    const handleClick = async () => {
        if (!contextData.displayBody && props.isCopy) contextData.toggleDisplay(true, props.data.id)
        else contextData.setSelected(props.isSelected ? undefined : props.data.id)
    }

    return (
        <div
            id={props.isCopy ? 'placeElementCopy' : 'placeElement' + props.data.id}
            className={props.isSelected && contextData.displayBody ?
                `${placeTypeColor[props.data.type]} leftLine element container vertical fullWidth open`
                :
                `${placeTypeColor[props.data.type]} leftLine element container vertical fullWidth`
            }            
        >
            <div
                className='preview horizontal fullWidth clickable'
                onClick={() => handleClick()}
            >
                <div className='previewInfo vertical fullHeight'>
                    <div className='horizontal halfHeight'><div className='title'>{props.data.name}</div></div>
                    <div className='horizontal halfHeight'><div className='subtitle'>{placeTypeName[props.data.type]}</div></div>
                </div>
                <div className="previewData vertical fullHeight">
                    {(contextData.userPosition.fetched && props.data.distance) &&
                        <div className="horizontal halfHeight"><div>{Math.round(props.data.distance).toLocaleString()} m</div></div>
                    }
                    <div className='horizontal halfHeight'><div className='subtitle'>{props.data.address}</div></div>
                </div>
            </div>
            <div className="details vertical fullWidth">
                <div className="features vertical fullWidth">
                    <div className="horizontal fullWidth halfHeight">
                        <div className="horizontal fullHeight">
                            <img className='icon' alt='wifi' src='/img/wifi.png' />&nbsp;&nbsp;
                            <div>{wifiScore[props.data.wifi] || '?'}</div>
                        </div>
                        <div className='horizontal fullHeight'>
                            <img className={props.data.outlet ? 'fullHeight icon' : 'icon lowOpacity'} alt='outlet' src='/img/outlet.png' />&nbsp;
                            <div>{outletsScore[props.data.outlet] || '?'}</div>
                        </div>
                    </div>
                    <div className="horizontal fullWidth halfHeight">
                        <div className='horizontal fullHeight'>
                            <img className={props.data.quiet ? 'icon' : 'icon lowOpacity'} alt='quiet' src='/img/mute.png' />&nbsp;&nbsp;
                            <div>{quietScore[props.data.quiet] || '?'}</div>
                        </div>
                        <div className='horizontal fullHeight'>
                            <img className={props.data.seats ? 'fullHeight icon' : 'icon lowOpacity'} alt='group' src='/img/group.png' />&nbsp;&nbsp;
                            <div>{seatsScore[props.data.seats] || '?'}</div>
                        </div>
                    </div>
                </div>
                <PlaceCarrousel
                    placeId={props.data.id}
                    img={props.data.img}
                    details={props.data.details}
                    preferences={props.data.preferences}
                />
            </div>
            </div>
    )
}

export default PlaceElement