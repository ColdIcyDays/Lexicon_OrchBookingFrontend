


export type ModifyUserRole = {
    targetUsername: string,
    newRoleName: string
}


export type Show = {
    id : number
    programId : number
    venueName : string
    venueAddress : string
    showDate : Date
}



export type GetShowsResult = {
    page : number
    foundShows : Show[]
}