import React, { ReactElement, useEffect, useState } from "react"
import { scrollToElementInList } from "../lib/domHandling"
import { fetchPlaceImg, fetchPlacesList } from "../request"
import context, { ContextProps, ImgProps, PlaceProps, Position } from "./context"

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential, Auth, User } from "firebase/auth";
import { getFirestore, doc, setDoc, DocumentReference, DocumentData, Firestore } from "firebase/firestore";
import app from "../firebase";
import { AuthErrorMessages } from "../lib/dictionary";

export enum AuthErrorMessageProps {
    "auth/invalid-email",
    "auth/user-not-found",
    "auth/weak-password",
}
export interface AuthResponseProps {
    success: boolean
    errorMessage?: string
}
interface ErrorProps {
    code: AuthErrorMessageProps
}

interface ContextProviderProps {
    children: ReactElement
}


const ContextProvider: React.FunctionComponent<ContextProviderProps> = (props) => {
    const auth: Auth = getAuth(app)
    const db: Firestore = getFirestore(app)

    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        setUser(auth.currentUser)
    }, [auth.currentUser])

    const signUpWithMailAndPassword = async (email: string, password: string): Promise<AuthResponseProps> => {
        try {
            const userCredential: UserCredential = await createUserWithEmailAndPassword(auth, email, password)
            const userDocRef: DocumentReference<DocumentData> = doc(db, "users", userCredential.user.uid)
            await setDoc (userDocRef, {
                email: userCredential.user.email,
                uid: userCredential.user.uid
            })
            return {
                success: true,
            }
        } catch (error) {
            console.error(error)
            return {
                success: false,
                errorMessage: AuthErrorMessages[(error as ErrorProps).code]
            }
        }
    }
    const signInWithMailAndPassword = async (email: string, password: string): Promise<AuthResponseProps> => {
        try {
            const userCredential: UserCredential = await signInWithEmailAndPassword(auth, email, password)
            return {
                success: true,
            }
        } catch (error) {
            console.error(error)
            return {
                success: false,
                errorMessage: AuthErrorMessages[(error as ErrorProps).code]
            }
        }
    }

    const signOut = async () => {
        try {
            await auth.signOut()
        } catch (error) {
            console.log(error)
        }
    }

    const [modal, setModal] = useState<number | null>(null)

    const [placesList, setPlacesList] = useState<PlaceProps[]>([])
    const [selected, setSelected] = useState<number | undefined>(undefined)
    
    const [displayBody, setDisplayBody] = useState<boolean>(true)
    const [displayPlacesList, setDisplayPlacesList] = useState<boolean>(true)

    const toggleDisplay = (arg?: boolean, newId?: number, previousId?: number): void => {
        if (displayBody) {
            setDisplayLogo(true)
            ;(document.getElementById('mainList') as HTMLDivElement).scrollTop = 0
        } else if (newId) {
            if (!selected) setSelected(newId)
            scrollToElementInList(desktopDisplay, newId, previousId)
        }
        setDisplayBody(arg || !displayBody)
        setDisplayPlacesList(arg || !displayPlacesList)
    }

    const [mapLoaded, setMapLoaded] = useState<boolean>(false)

    const [userPosition, setUserPosition] = useState<Position>({
        latitude: 49.60833406110522,
        longitude: 6.127097420426896,
        fetched: false
    })

    const [searchString, setSearchString] = useState<string>('')

    const [firstSearchExecuted, setFirstSearchExecuted] = useState<boolean>(false)

    const [desktopDisplay, setDesktopDisplay] = useState<boolean>(window.innerWidth >= 961)
    const handleWindowResize = (): void => {
        const isDesktopDisplay = window.innerWidth >= 961
        setDesktopDisplay(isDesktopDisplay)
        if (isDesktopDisplay) toggleDisplay(true)
    }
    useEffect(() => {
        window.addEventListener('resize', handleWindowResize)
        return () => {
            window.removeEventListener('resize', handleWindowResize)
        }
    }, [])

    const [displayLogo, setDisplayLogo] = useState<boolean>(true)

    const fetchPlacesAndSetState = async () => {
        if (userPosition.fetched && mapLoaded) {
            const result: PlaceProps[] = await fetchPlacesList(userPosition.latitude, userPosition.longitude, 999999999999, searchString)
            setTimeout(() => {
                setPlacesList(result)
                setFirstSearchExecuted(true)
                setSelected(undefined)
            }, firstSearchExecuted ? 0 : 1000)
        }
    }

    const fetchPlaceImgAndSetState = async () => {
        if (selected) {
            const result: ImgProps[] = await fetchPlaceImg(selected)
            setTimeout(() => {
                setPlacesList((places) => {
                    return places.map((place) => {
                        if (place.id === selected) place.img = result
                        return place
                    })
                })
            }, 200)
        }
    }
    
    useEffect(() => {
        fetchPlacesAndSetState()
    }, [userPosition.fetched, mapLoaded, searchString])

    useEffect(() => {
        fetchPlaceImgAndSetState()
    }, [selected])

    return (
        <context.Provider value={{
            placesList,
            selected,
            setSelected,
            displayBody,
            setDisplayBody,
            displayPlacesList,
            setDisplayPlacesList,
            toggleDisplay,
            userPosition,
            setUserPosition,
            mapLoaded,
            setMapLoaded,
            searchString,
            setSearchString,
            desktopDisplay,
            displayLogo,
            setDisplayLogo,
            signUpWithMailAndPassword,
            signInWithMailAndPassword,
            signOut,
            user,
            modal,
            setModal,
        } as ContextProps}>
            {props.children}
        </context.Provider>
    )
}

export default ContextProvider