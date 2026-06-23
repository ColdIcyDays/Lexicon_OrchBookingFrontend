import type {Show} from "../../../../Types/ProgramAndShowTypes.tsx";

export function ShowPreview({ showData } : { showData : Show }){
    return (
        <div className={"p-4 border"}>
            <h3>Id: {showData.id}</h3>
            <h3>Program: {showData.program.title}</h3>
            <h3>Venue: {showData.venue.name}</h3>
            <h3>Venue address: {showData.venue.address}</h3>
            <h3>Show date: {new Date(showData.showDate).toLocaleDateString()}</h3>
        </div>
    )
}