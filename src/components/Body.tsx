import { useContext, useState } from "react"
import context, { ContextProps } from "../context/context"
import PlacesList from "./PlacesList"

const Body = () => {
    const contextData: ContextProps = useContext(context)

    return (
        <div id='body' className={contextData.displayBody ? 'open' : ''}>
            {contextData.placesList.length > 0 && <PlacesList />}
        </div>
    )
}

export default Body