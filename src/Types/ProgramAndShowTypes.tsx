import type {Show} from "../TestComps/TestTypes.tsx";

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

export class UploadVenueRequest {
    public name : string = "";
    public address : string = "";
    public maxSeating : number = 0;
    public ticketPrices : UploadVenueTicketPrice[] | undefined;
}

export class UploadVenueTicketPrice {
    public ticketName : string = "";
    public ticketCost : number = 0;
}

export type GetVenuesResult = {
    venues : Venue[]
}

export type Venue = {
    id : number
    name : string
    address : string
    maxSeating : number
    VenueTicketPrice : VenueTicketPrice[]
}

export type VenueTicketPrice = {
    ticketName : string
    ticketCost : number
}

export type Show = {
    id : number
    programId : number
    program : OrchProgram
    venueId : number
    venue : Venue
    showDate : Date
}

export type GetShowsResult = {
    page : number
    foundShows : Show[]
}

export class UploadShowRequest {
    public programId : number = 0
    public venueId : number = 0
    public showDate : Date = new Date()
}