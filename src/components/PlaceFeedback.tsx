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
            <div className="editBar horizontal">
                <div
                    onClick={() => handleClickLiked(true, likedPlace === true)}
                    className="clickable fullHeight"
                >
                    <img className="fullHeight" alt="like" src={likedPlace === true ? "img/good filled.png" : "/img/good.png"} />
                </div>
                <div
                    onClick={() => handleClickLiked(false, likedPlace === false)}
                    className="clickable fullHeight"
                >
                    <img className="fullHeight" alt="dislike" src={likedPlace === false ? "img/bad filled.png" : "/img/bad.png"} />
                </div>
                <div
                    className="clickable fullHeight"
                >
                    <img className="fullHeight" alt="dislike" src="/img/alert.png" />
                </div>
            </div>
            <div onClick={handleClickEdit} className="clickable editButton">
                <img alt="edit place" src={open ? "img/close.png" : "/img/edit.png"} className="fullHeight" />
            </div>
        </div>
    )
}

export default PlaceFeedback