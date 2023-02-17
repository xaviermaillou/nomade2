import React from 'react';
import { PlaceProps } from './PlacesList';

interface PlaceElementProps {
    data: PlaceProps
    isSelected?: boolean
    setSelected(param?: number): void
}

const PlaceElement: React.FunctionComponent<PlaceElementProps> = (props) => {
    return (
        <div
            className={props.isSelected ?
                'leftLine element container vertical open'
                :
                'leftLine element container vertical'
            }
            onClick={() => props.setSelected(props.isSelected ? undefined : props.data.id)}
        >
            <div className='preview horizontal fullWidth'>
                <div className='title'>{props.data.name}</div>
            </div>
        </div>
    )
}

export default PlaceElement