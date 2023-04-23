import { useContext } from "react"
import { DetailProps, ImgProps, PreferencesProps } from "../context/ContextProvider"
import requests, { RequestsProps } from "../context/requests"
import PlaceFeedback from "./PlaceFeedback"

interface PlaceCarrouselProps {
    placeId: number
    img: ImgProps[]
    details: DetailProps
    preferences: PreferencesProps
}

const PlaceCarrousel = (props: PlaceCarrouselProps) => {
    const requestsData: RequestsProps = useContext(requests)

    return (
        <div className="carrousel horizontal fullWidth">
            {props.img?.map((img) => (
                <div key={img.id} className="img fullWidth fullHeight" style={{backgroundImage: `url('${img.path}')`}}></div>
            ))}
            {requestsData.user && <PlaceFeedback placeId={props.placeId} preferences={props.preferences} />}
        </div>
    )
}

export default PlaceCarrousel