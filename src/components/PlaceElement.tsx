import React, { useContext } from 'react';
import { placeTypeColor, placeTypeName, wifiScore } from '../lib/dictionary';
import { PlaceProps } from '../context/context';
import context, { ContextProps } from "../context/context"

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
                    <div className='title'>{props.data.name}</div>
                    <div className='subtitle'>{placeTypeName[props.data.type]}</div>
                </div>
                <div className="previewData vertical fullHeight">
                    {(contextData.userPosition.fetched && props.data.distance) &&
                        <div className="halfHeight">{Math.round(props.data.distance).toLocaleString()} m</div>
                    }
                    <div className="halfHeight horizontal">
                        <img className='fullHeight icon' alt='wifi' src='/img/wifi.png' />&nbsp;&nbsp;
                        <div>{wifiScore[props.data.wifi] || '?'}</div>
                    </div>
                </div>
            </div>
            <div className="details vertical fullWidth">
                <div className="feedback vertical fullWidth">
                    <div className="horizontal fullWidth halfHeight">
                        <div className='horizontal fullHeight'>
                            <img className={props.data.solo ? 'fullHeight icon' : 'fullHeight icon lowOpacity'} alt='solo' src='/img/solo.png' />&nbsp;
                            <div>{props.data.solo ? 'To work alone' : 'X'}</div>
                        </div>
                        <div className='horizontal fullHeight'>
                            <img className={props.data.quiet ? 'fullHeight icon' : 'fullHeight icon lowOpacity'} alt='quiet' src='/img/mute.png' />&nbsp;&nbsp;
                            <div>{props.data.quiet ? 'Quiet' : 'X'}</div>
                        </div>
                    </div>
                    <div className="horizontal fullWidth halfHeight">
                        <div className='horizontal fullHeight'>
                            <img className={props.data.gathering ? 'fullHeight icon' : 'fullHeight icon lowOpacity'} alt='group' src='/img/group.png' />&nbsp;&nbsp;
                            <div>{props.data.gathering ? 'To work in group' : 'X'}</div>
                        </div>
                        <div className='horizontal fullHeight'>
                            <img className={props.data.outlet ? 'fullHeight icon' : 'fullHeight icon lowOpacity'} alt='outlet' src='/img/outlet.png' />&nbsp;
                            <div>{props.data.outlet ? 'Outlets available' : 'X'}</div>
                        </div>
                    </div>
                </div>
                <div className="carrousel horizontal fullWidth">
                    {props.data.img?.map((img) => (
                        <div key={img.id} className="img fullWidth fullHeight" style={{backgroundImage: `url('${img.path}')`}}></div>
                    ))}
                </div>
            </div>
            </div>
    )
}

export default PlaceElement