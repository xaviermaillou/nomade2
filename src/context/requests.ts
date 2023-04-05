import { User } from "firebase/auth";
import React from "react";
import { DetailProps, ImgProps, PlaceProps } from "./context";
import { AuthResponseProps } from "./RequestsProvider";

export interface RequestsProps {
    signUpWithMailAndPassword: (email: string, password: string) => Promise<AuthResponseProps>,
    signInWithMailAndPassword: (email: string, password: string) => Promise<AuthResponseProps>,
    signOut: (arg: void) => void,
    user: User | null,
    userName?: string,
    fetchPlacesList: (latitude: number, longitude: number, distance: number, search: string) => Promise<PlaceProps[]>,
    fetchPlaceImg: (id: number) => Promise<ImgProps[]>
    fetchPlaceDetails: (id: number) => Promise<DetailProps[]>
}

const requests: React.Context<RequestsProps> = React.createContext({} as RequestsProps)

export default requests