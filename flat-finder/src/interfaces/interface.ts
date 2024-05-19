export interface User {
    uid: string
    email?: string
    password?: string
    confPassword?: string
    firstName?: string
    lastName?: string
    dateOfBirth?: string
    role: string
    favorites?: FavoritesFlats[]
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
    startDate: Date
    endDate: Date
    email: string
    lastName: string
    firstName: string
    imageURL?: string
}

export interface FavoritesFlats {
    flatId: string
}