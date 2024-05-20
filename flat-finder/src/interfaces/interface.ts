import { Timestamp } from "firebase/firestore"

export interface User {
    uid: string
    email: string
    password?: string
    confPassword?: string
    firstName?: string
    lastName?: string
    dateOfBirth?: string
    role?: string
    favorites?: FavoritesFlats[]
    flatsCount?: number
}

export interface newFlatForm {
    uid: string
    image: string
    city: string 
    streetName: string
    streetNumber: number
    areaSize: number
    hasAC: boolean
    yearBuilt: number
    rentPrice: number
    startDate: string
    endDate: string
    email: string
    lastName: string
    firstName: string
    imageURL?: string
    name: string
}

export interface FavoritesFlats {
    flatId: string
}

export interface newMessage {
    senderI: string
    content: string
    receptorId: string
    timestamp: Timestamp
}