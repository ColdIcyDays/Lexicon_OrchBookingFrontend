export type GetAccountInfoResult = {
    username: string,
    email: string,
    roles: string[]
    data: UserData
}

export type UserData = {
    id : number
    userId : number
    displayName : string
    dateJoined : Date
    purchasedTickets : PurchasedTicket[]
}

export type PurchasedTicket = {
    id : number
    userId : number
    showId : number
    purchaseDate : Date
    ticketPrice : TicketPrice
}

export type TicketPrice = {
    id : number
    ticketName : string
    ticketCost : number
}