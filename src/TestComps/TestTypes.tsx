
export type AccountInfo = {
    username: string,
    email: string,
    roles: string[]

}

export type ModifyUserRole = {
    targetUsername: string,
    newRoleName: string
}

export type GetBlogsRequest = {
    UsePagination : boolean
    Page : number
    PerPage : number
    SortMethod : string
}

export type Blog = {
    id : number
    writerId : string
    dateCreated : Date
    contentTitle : string
    contentBody : string
    images : string[]
}

export type GetBlogResult = {
    page : number
    foundBlogs : Blog[]
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