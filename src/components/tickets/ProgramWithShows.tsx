import type {ProgramWithVenue} from "../../Types/TicketAndShowsTypes.tsx";

export function ProgramWithShows({ Data, OnSeeVenues } : { Data : ProgramWithVenue, OnSeeVenues : () => void }){
    return (
        <div className={"flex flex-col p-4"}>
            <h3 className={"text-center text-3xl"}>{Data.program.title}</h3>
            <h4 className={"text-center mt-6"}>Available in {Data.venues.length} venues</h4>
            <input type={"button"} value={"See venues"} className={"cursor-pointer mx-auto"} onClick={OnSeeVenues}/>
        </div>
    )
}