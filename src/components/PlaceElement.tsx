import React, { useState } from 'react';

interface PlaceElementProps {
    data: {
        id: number
        name: string
    }
    isSelected?: boolean
    setSelected(param?: number): void
}

const PlaceElement = (props: PlaceElementProps) => {
    return (
        <div
            className={props.isSelected ?
                'leftLine element container vertical open'
                :
                'leftLine element container vertical'
            }
            onClick={() => props.setSelected(props.isSelected ? undefined : props.data.id)}
        >
            <div className='preview horizontal'>
                <div className='title'>{props.data.name}</div>
            </div>
        </div>
    )
}

export default PlaceElement;