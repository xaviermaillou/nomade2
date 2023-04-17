import { useContext, useEffect, useState } from "react"
import context, { ContextProps, PreferencesProps } from "../context/context"
import requests, { RequestsProps } from "../context/requests"

interface PlaceFeedbackProps {
    placeId: number
    preferences: PreferencesProps
}

const PlaceFeedback = (props: PlaceFeedbackProps) => {
    const requestData: RequestsProps = useContext(requests)
    const contextData: ContextProps = useContext(context)

    const [open, setOpen] = useState<boolean>(false)
    const [dataAlreadyExists, setDataAlreadyExists] = useState<boolean>(false)
    const [likedPlace, setLikedPlace] = useState<boolean | undefined>(undefined)
    const [placeNotes, setPlaceNotes] = useState<string | undefined>(undefined)
    const [placeNotesCopy, setPlaceNotesCopy] = useState<string>("")
    const [notesTimer, setNotesTimer] = useState<any>(undefined)

    useEffect(() => {
        setLikedPlace(props.preferences?.liked)
        setPlaceNotes(props.preferences?.notes || undefined)
        setPlaceNotesCopy(props.preferences?.notes || "")
    }, [props.preferences])

    useEffect(() => {
        setDataAlreadyExists(likedPlace !== undefined || placeNotes !== undefined)
    }, [likedPlace, placeNotes])

    const handleClickEdit = () => {
        if (open) {
            console.log("Submit")
        }
        setOpen(!open)
    }

    const runNotesTimer = (notes: string) => {
        setNotesTimer(setTimeout(() => {
            const finalNotes = notes.length > 0 ? notes : undefined
            if (!dataAlreadyExists && finalNotes !== undefined) {
                requestData.postPlacePreferences(props.placeId, { liked: undefined, notes: finalNotes })
            } else {
                if (finalNotes !== undefined || likedPlace !== undefined) {
                    requestData.patchPlacePreferences(props.placeId, { liked: likedPlace, notes: finalNotes })
                } else {
                    requestData.deletePlacePreferences(props.placeId)
                }
            }
            setPlaceNotes(finalNotes)
        }, 1000))
    }

    const handleChangeNotes = (notes: string) => {
        setPlaceNotesCopy(notes)
        clearTimeout(notesTimer)
        runNotesTimer(notes)
    }

    const handleClickLiked = (liked: boolean, activated: boolean) => {
        const finalLiked = activated ? undefined : liked
        if (!dataAlreadyExists) {
            requestData.postPlacePreferences(props.placeId, { liked: finalLiked, notes: undefined })
        } else {
            if (!activated || placeNotes) {
                requestData.patchPlacePreferences(props.placeId, { liked: finalLiked, notes: placeNotes })
            } else {
                requestData.deletePlacePreferences(props.placeId)
            }
        }
        setLikedPlace(finalLiked)
    }

    const handleClickAlert = () => {
        contextData.setWarningPlaceId(props.placeId)
        contextData.setModal(3)
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
                    onClick={handleClickAlert}
                    className="clickable fullHeight"
                >
                    <img className="fullHeight" alt="dislike" src="/img/alert.png" />
                </div>
            </div>
            <div className="notes fullWidth fullHeight">
                <textarea
                    placeholder="Keep some notes here..."
                    className="fullWidth fullHeight"
                    value={placeNotesCopy}
                    onChange={(e) => handleChangeNotes(e.target.value)}
                />
            </div>
            <div onClick={handleClickEdit} className="clickable editButton">
                <img alt="edit place" src={open ? "img/close.png" : "/img/edit.png"} className="fullHeight" />
            </div>
        </div>
    )
}

export default PlaceFeedback