import React, { useContext, useState } from 'react';
import { placeTypeColor, placeTypeName, wifiScore } from '../lib/dictionary';
import { PlaceProps } from '../context/context';
import context, { ContextProps } from "../context/context"
import { fetchPlaceImg } from '../request';

interface PlaceElementProps {
    data: PlaceProps
    isSelected?: boolean
}

const PlaceElement: React.FunctionComponent<PlaceElementProps> = (props) => {
    const contextData: ContextProps = useContext(context)
    
    const handleClick = async () => {
        contextData.setSelected(props.isSelected ? undefined : props.data.id)
    }
console.log(props.data)
    return (
        <div
            id={'placeElement' + props.data.id}
            className={props.isSelected ?
                `${placeTypeColor[props.data.type]} leftLine element container vertical fullWidth open`
                :
                `${placeTypeColor[props.data.type]} leftLine element container vertical fullWidth`
            }            
        >
            <div
                className='preview horizontal fullWidth'
                onClick={() => handleClick()}
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
            <div className="img fullWidth">
                {props.data.img?.map((img) => (
                    <img key={img.id} alt="img" src={img.path} className="fullWidth" />
                ))}
            </div>
        </div>
    )
}

export default PlaceElement