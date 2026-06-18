import type {Show} from "./TestTypes.tsx";

export function TestShowThumb({ someShow } : { someShow : Show }){
    return (
        <div className={'rounded-md border-2 p-4'}>
            <h1>{someShow.venueName}</h1>
            <p>{someShow.venueAddress}</p>
            <p>Show date: {someShow.showDate.toString()}</p>
            <p>Id: {someShow.id}</p>
            <p>Program Id: {someShow.programId}</p>
        </div>
    )
}