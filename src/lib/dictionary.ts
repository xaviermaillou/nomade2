export enum wifiScore {
    'No',
    'Very bad', // > 0
    'Poor', // > 1
    'Correct', // > 5
    'Good', // > 25
    'Excellent' // > 50
}

export enum outletsScore {
    'No',
    'Few',
    'Some',
    'Many'
}

export enum quietScore {
    'Chaotic',
    'Busy',
    'Calm',
    'Serene'
}

export enum seatsScore {
    'No',
    'Small',
    'Medium',
    'Vast'
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