import { User } from "firebase/auth";
import React from "react";
import { DetailProps, ImgProps, PlaceProps, PreferencesProps } from "./context";
import { AuthResponseProps } from "./RequestsProvider";

export interface RequestsProps {
    signUpWithMailAndPassword: (email: string, password: string) => Promise<AuthResponseProps>,
    signInWithMailAndPassword: (email: string, password: string) => Promise<AuthResponseProps>,
    signOut: (arg: void) => void,
    user: User | null,
    userName?: string,
    fetchPlacesList: (latitude: number, longitude: number, distance: number, search: string) => Promise<PlaceProps[]>,
    fetchPlaceImg: (id: number) => Promise<ImgProps[]>
    fetchPlaceDetails: (id: number) => Promise<DetailProps>,
    fetchPlacePreferences: (id: number) => Promise<PreferencesProps>,
    postPlacePreferences: (id: number, body: { liked: boolean }) => any,
    patchPlacePreferences: (id: number, body: { liked: boolean }) => any,
    deletePlacePreferences: (id: number) => any,
}

const requests: React.Context<RequestsProps> = React.createContext({} as RequestsProps)

export default requests