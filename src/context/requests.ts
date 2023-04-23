import { User } from "firebase/auth";
import React from "react";
import { DetailProps, ImgProps, PlaceProps, PreferencesProps } from "./ContextProvider";
import { AuthResponseProps } from "./RequestsProvider";

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

const requests: React.Context<RequestsProps> = React.createContext({} as RequestsProps)

export default requests