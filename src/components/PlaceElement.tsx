import React, { useContext } from 'react';
import { wifiScore } from '../lib/dictionary';
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
            className={props.isSelected ?
                'leftLine element container vertical open'
                :
                'leftLine element container vertical'
            }            
        >
            <div
                className='preview horizontal fullWidth'
                onClick={() => contextData.setSelected(props.isSelected ? undefined : props.data.id)}
            >
                <div className='previewInfo vertical fullHeight'>
                    <div className='title'>{props.data.name}</div>
                    <div className='subtitle'>{props.data.type}</div>
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