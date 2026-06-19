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
