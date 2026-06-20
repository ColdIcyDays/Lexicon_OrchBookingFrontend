


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

export type OrchProgram = {
    id : number
    title : string
    description : string
    lengthInMinutes : number
}

export type GetProgramsResult = {
    page : number
    foundPrograms : OrchProgram[]
}

export type GetShowsResult = {
    page : number
    foundShows : Show[]
}