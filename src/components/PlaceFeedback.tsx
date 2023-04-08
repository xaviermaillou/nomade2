import { useContext, useEffect, useState } from "react"
import { PreferencesProps } from "../context/context"
import requests, { RequestsProps } from "../context/requests"

interface PlaceFeedbackProps {
    placeId: number
    preferences: PreferencesProps
}

const PlaceFeedback = (props: PlaceFeedbackProps) => {
    const requestData: RequestsProps = useContext(requests)

    const [open, setOpen] = useState<boolean>(false)
    const [likedPlace, setLikedPlace] = useState<boolean | undefined>(undefined)

    useEffect(() => {
        setLikedPlace(props.preferences?.liked)
    }, [props.preferences])

    const handleClickEdit = () => {
        if (open) {
            console.log("Submit")
        }
        setOpen(!open)
    }

    const handleClickLiked = (liked: boolean, activated: boolean) => {
        if (likedPlace === undefined) {
            requestData.postPlacePreferences(props.placeId, { liked })
            setLikedPlace(liked)
        } else if (!activated) {
            requestData.patchPlacePreferences(props.placeId, { liked })
            setLikedPlace(liked)
        } else {
            requestData.deletePlacePreferences(props.placeId)
            setLikedPlace(undefined)
        }
    }

    return (
        <div className={open ? "edit open" : "edit"}>
            <div className="container editContent">
                <div className="horizontal">
                    <div onClick={() => handleClickLiked(true, likedPlace === true)} className={likedPlace === true ? "option clickable selected" : "option clickable"}>I liked this place</div>
                    <div onClick={() => handleClickLiked(false, likedPlace === false)} className={likedPlace === false ? "option clickable selected" : "option clickable"}>I did not like this place</div>
                </div>
                <div className={likedPlace === undefined ? "likeImg fullWidth vertical hidden" : (likedPlace ? "likeImg fullWidth vertical" : "likeImg fullWidth vertical reverted")}>
                    <img className="fullHeight" alt={likedPlace ? "like" : "dislike"} src="/img/good.png" />
                </div>
            </div>
            <div onClick={handleClickEdit} className="clickable editButton">
                <img alt="edit place" src={open ? "img/close.png" : "/img/edit.png"} className="fullHeight" />
            </div>
        </div>
    )
}

export default PlaceFeedback