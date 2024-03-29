import React from "react";
import { DetailProps, ImgProps, PlaceProps, PreferencesProps } from "./DataContext"
import axios, { AxiosResponse } from "axios"
import { Auth, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, User, UserCredential } from "firebase/auth"
import { doc, DocumentData, DocumentReference, Firestore, getFirestore, setDoc } from "firebase/firestore"
import { ReactElement, useState } from "react"
import app from "../firebase"
import { AuthErrorMessages } from "../lib/dictionary"
import conf from '../conf.json'

export interface RequestsProps {
    signUpWithMailAndPassword: (email: string, password: string) => Promise<AuthResponseProps>,
    signInWithMailAndPassword: (email: string, password: string) => Promise<AuthResponseProps>,
    signOut: (arg: void) => void,
    user: User | null,
    userName?: string,
    postUser: (body: { email: string, uid: string, type?: string }) => any,
    fetchPlacesList: (latitude: number, longitude: number, distance: number, search: string) => Promise<PlaceProps[]>,
    fetchPlaceImg: (id: number) => Promise<ImgProps[]>
    fetchPlaceDetails: (id: number) => Promise<DetailProps>,
    fetchPlacePreferences: (id: number) => Promise<PreferencesProps>,
    postPlacePreferences: (id: number, body: { liked?: boolean, notes?: string }) => any,
    patchPlacePreferences: (id: number, body: { liked?: boolean, notes?: string }) => any,
    deletePlacePreferences: (id: number) => any,
    postPlaceWarning: (id: number, body: { message?: string }) => any,
}

export const RequestsContext: React.Context<RequestsProps> = React.createContext({} as RequestsProps)

const API_URL = process.env.NODE_ENV === 'development' ? conf.DEV_API_URL : conf.PROD_API_URL
const IMG_URL = conf.IMG_URL

enum Methods {
    GET = "GET",
    POST = "POST",
    PATCH = "PATCH",
    DELETE = "DELETE"
}

export enum AuthErrorMessageProps {
    "auth/invalid-email",
    "auth/user-not-found",
    "auth/weak-password",
}
export interface AuthResponseProps {
    success: boolean
    user?: User
    errorMessage?: string
}
interface ErrorProps {
    code: AuthErrorMessageProps
}

interface RequestsProviderProps {
    children: ReactElement
}

export const RequestsProvider: React.FunctionComponent<RequestsProviderProps> = (props) => {
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
            return {
                success: true,
                user: userCredential.user
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

    const request = async (method: Methods, url: string, body?: any): Promise<AxiosResponse> => {
        const idToken = await user?.getIdToken(true)
        let headers
        if (idToken) headers = {
            'Authorization': `Bearer ${idToken}`
        }
        switch (method) {
            case Methods.GET:
                return await axios.get(url, {
                    headers
                })
            case Methods.POST:
                return await axios.post(url, {
                    headers,
                    body
                })
            case Methods.PATCH:
                return await axios.patch(url, {
                    headers,
                    body
                })
            case Methods.DELETE:
                return await axios.delete(url, {
                    headers
                })
            default:
                return await axios.get(url, {
                    headers
                })
        }
    }

    const postUser = async (body: { email: string, uid: string, type?: string }) => {
        const result = await request(Methods.POST, `${API_URL}/users`, body)
        return result.data
    }
    
    const fetchPlacesList = async (latitude: number, longitude: number, distance: number, search: string): Promise<PlaceProps[]> => {
        const result = await request(Methods.GET, `${API_URL}/places/${latitude || 0}/${longitude || 0}/${distance || 0}/${search || ''}`)
        return result.data
    }
    
    const fetchPlaceImg = async (id: number): Promise<ImgProps[]> => {
        const result = await request(Methods.GET, `${API_URL}/place/${id}/img`)
        return result.data.map((img: ImgProps) => {
            return {
                id: img.id,
                path: `${IMG_URL}/${img.path}`
            }
        })
    }

    const fetchPlaceDetails = async (id: number): Promise<DetailProps> => {
        const result = await request(Methods.GET, `${API_URL}/place/${id}/details`)
        return result.data
    }

    const fetchPlacePreferences = async (id: number): Promise<PreferencesProps> => {
        const result = await request(Methods.GET, `${API_URL}/place/${id}/preferences/${user?.uid}`)
        return result.data
    }
    const postPlacePreferences = async (id: number, body: { liked?: boolean, notes?: string }) => {
        const result = await request(Methods.POST, `${API_URL}/place/${id}/preferences/${user?.uid}`, body)
        return result.data
    }
    const patchPlacePreferences = async (id: number, body: { liked?: boolean, notes?: string }) => {
        const result = await request(Methods.PATCH, `${API_URL}/place/${id}/preferences/${user?.uid}`, body)
        return result.data
    }
    const deletePlacePreferences = async (id: number) => {
        const result = await request(Methods.DELETE, `${API_URL}/place/${id}/preferences/${user?.uid}`)
        return result.data
    }

    const postPlaceWarning = async (id: number, body: { message?: string }) => {
        const result = await request(Methods.POST, `${API_URL}/place/${id}/warning/${user?.uid}`, body)
        return result.data
    }

    return (
        <RequestsContext.Provider value={{
            signUpWithMailAndPassword,
            signInWithMailAndPassword,
            signOut,
            user,
            userName,
            postUser,
            fetchPlacesList,
            fetchPlaceImg,
            fetchPlaceDetails,
            fetchPlacePreferences,
            postPlacePreferences,
            patchPlacePreferences,
            deletePlacePreferences,
            postPlaceWarning,
        } as RequestsProps}>
            {props.children}
        </RequestsContext.Provider>
    )
}