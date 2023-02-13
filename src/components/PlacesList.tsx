import React, { useState } from 'react';
import PlaceElement from './PlaceElement';

const PlacesList = () => {
    const fakeCafes = [
        {
            id: 9876,
            name: "Bao café",
        },
        {
            id: 56,
            name: "Paul",
        },
        {
            id: 876,
            name: "Caffetteria",
        },
        {
            id: 410,
            name: "Tully's",
        },
        {
            id: 265,
            name: "Café Pephka",
        },
        {
            id: 19862,
            name: "Biel Lorata",
        },
        {
            id: 76,
            name: "Osaka coffee",
        },
        {
            id: 879,
            name: "Lux's café du commerce",
        },
        {
            id: 91823,
            name: "Nero",
        },
        {
            id: 8109,
            name: "Fischer",
        },
    ]

    const [selected, setSelected] = useState<number | undefined>(undefined)

    return (
        <div className='list container'>
            {
                fakeCafes.map((el) => <PlaceElement
                    data={el}
                    isSelected={selected === el.id}
                    setSelected={setSelected}
                /> )
            }
        </div>
    )
}

export default PlacesList;