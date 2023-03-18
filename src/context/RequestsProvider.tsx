import axios, { AxiosResponse } from "axios"
import { Auth, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, User, UserCredential } from "firebase/auth"
import { doc, DocumentData, DocumentReference, Firestore, getFirestore, setDoc } from "firebase/firestore"
import { ReactElement, useContext, useEffect, useState } from "react"
import app from "../firebase"
import { AuthErrorMessages } from "../lib/dictionary"
import requests from "./requests"
import conf from '../conf.json'
import { ImgProps, PlaceProps } from "./context"

const API_URL = conf.API_URL
const IMG_URL = conf.IMG_URL

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

interface RequestsProviderProps {
    children: ReactElement
}

const RequestsProvider: React.FunctionComponent<RequestsProviderProps> = (props) => {
    const auth: Auth = getAuth(app)
    const db: Firestore = getFirestore(app)
    const [user, setUser] = useState<User | null>(null)
    const [userName, setUserName] = useState<string | undefined>()
    auth.onAuthStateChanged((user: User | null) => {
        setUser(user)
        setUserName(user?.email?.split('@')[0])
    })
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
            await signInWithEmailAndPassword(auth, email, password)
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

    const getRequest = async (url: string): Promise<AxiosResponse> => {
        const idToken = await user?.getIdToken(true)
        let headers
        if (idToken) headers = {
            'Authorization': `Bearer ${idToken}`
        }
        return await axios.get(url, {
            headers
        })
    }
    
    const fetchPlacesList = async (latitude: number, longitude: number, distance: number, search: string): Promise<PlaceProps[]> => {
        const result = await getRequest(`${API_URL}/places/${latitude || 0}/${longitude || 0}/${distance || 0}/${search || ''}`)
        return result.data
    }
    
    const fetchPlaceImg = async (id: number): Promise<ImgProps[]> => {
        const result = await getRequest(`${API_URL}/place/${id}/img`)
        return result.data.map((img: ImgProps) => {
            return {
                id: img.id,
                path: `${IMG_URL}/${img.path}`
            }
        })
    }

    return (
        <requests.Provider value={{
            signUpWithMailAndPassword,
            signInWithMailAndPassword,
            signOut,
            user,
            userName,
            fetchPlacesList,
            fetchPlaceImg,
        }}>
            {props.children}
        </requests.Provider>
    )
}

export default RequestsProvider