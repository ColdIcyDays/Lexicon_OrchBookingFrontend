
export type AccountInfo = {
    username: string,
    email: string,
    roles: string[]

}

export type ModifyUserRole = {
    targetUsername: string,
    newRoleName: string
}

/*
*
*    public bool UsePagination { get; set; } = true;
    public int Page { get; set; } = 0;
    public int PerPage { get; set; } = 1;
    public string SortMethod { get; set; } = "date";*/
export type GetBlogsRequest = {
    UsePagination : boolean
    Page : number
    PerPage : number
    SortMethod : string
}


/*
*   [Key]
    public int Id { get; set; }
    [ForeignKey(nameof(Lexicon_OrchBookingBackendUser))]
    public int WriterId { get; set; }

    [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
    public DateTime DateCreated { get; set; }

    [Required]
    public string ContentTitle { get; set; }
    public string ContentBody { get; set; }

    public string[] Images { get; set; }
* */

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