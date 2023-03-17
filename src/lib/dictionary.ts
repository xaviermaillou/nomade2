import { AuthErrorMessageProps } from "../context/ContextProvider";

export enum wifiScore {
    'No',
    'Very bad',
    'Poor',
    'Correct',
    'Good',
    'Excellent'
}

export enum placeTypeName {
    'Unknown',
    'Coffee shop',
    'Co-working place',
    'Library',
    'Public place',
    'Park'
}
export enum placeTypeColor {
    'grey',
    'brown',
    'blue',
    'cyan',
    'yellow',
    'green'
}

export const AuthErrorMessages: {[key: string]: string} = {
    "auth/invalid-email": "Invalid email",
    "auth/user-not-found": "User not found",
    "auth/weak-password" : "Password should be at least 6 characters"
}