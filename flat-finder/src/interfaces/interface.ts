export interface User {
    uid: string
    email: string
    password?: string
    confPassword?: string
    firstName: string
    lastName: string
    dateOfBirth: string
    role: string
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
}