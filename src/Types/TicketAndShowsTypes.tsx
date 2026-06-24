import type {OrchProgram, Venue} from "./ProgramAndShowTypes.tsx";

export type ProgramsWithShowsResult = {
    page : number
    programWithVenues : ProgramWithVenue[]
}

export type ProgramWithVenue = {
    program : OrchProgram
    venues : Venue[]
}