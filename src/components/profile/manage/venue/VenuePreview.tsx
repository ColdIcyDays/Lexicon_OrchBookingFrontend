import type {Venue} from "../../../../Types/ProgramAndShowTypes.tsx";

export function VenuePreview({ venueData } : { venueData : Venue }) {
    return (
        <div className={"border p-4"}>
            <h4> Id: { venueData.id } </h4>
            { venueData.name }
        </div>
    )
}