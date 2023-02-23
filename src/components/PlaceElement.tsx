import React, { useContext } from 'react';
import { placeTypeColor, placeTypeName, wifiScore } from '../lib/dictionary';
import { PlaceProps } from '../context/context';
import context, { ContextProps } from "../context/context"

interface PlaceElementProps {
    data: PlaceProps
    isSelected?: boolean
}

const PlaceElement: React.FunctionComponent<PlaceElementProps> = (props) => {
    const contextData: ContextProps = useContext(context)

    return (
        <div
            id={'placeElement' + props.data.id}
            className={props.isSelected ?
                `${placeTypeColor[props.data.type]} leftLine element container vertical open`
                :
                `${placeTypeColor[props.data.type]} leftLine element container vertical`
            }            
        >
            <div
                className='preview horizontal fullWidth'
                onClick={() => contextData.setSelected(props.isSelected ? undefined : props.data.id)}
            >
                <div className='previewInfo vertical fullHeight'>
                    <div className='title'>{props.data.name}</div>
                    <div className='subtitle'>{placeTypeName[props.data.type]}</div>
                </div>
                <div className="previewData vertical fullHeight">
                    {(contextData.userPosition.fetched && props.data.distance) &&
                        <div>{Math.round(props.data.distance).toLocaleString()} m</div>
                    }
                    <div className="horizontal">
                        <div>
                            <img className='fullHeight' alt='wifi' src='/img/wifi.png' />&nbsp;
                        </div>
                        <div>{wifiScore[props.data.wifi] || '?'}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PlaceElement