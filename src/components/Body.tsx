import { useContext, useState } from "react"
import { ContextProps, DataContext } from "../context/DataContext"
import PlacesList from "./PlacesList"

const Body = () => {
    const contextData: ContextProps = useContext(DataContext)

    return (
        <div id='body' className={contextData.displayBody ? 'open' : ''}>
            {contextData.placesList.length > 0 && <PlacesList />}
        </div>
    )
}

export default Body