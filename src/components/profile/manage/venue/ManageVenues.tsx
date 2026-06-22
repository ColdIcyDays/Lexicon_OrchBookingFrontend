import {useEffect, useState} from "react";
import {OrchBookHelper} from "../../../../helpers/FetchHelpers.tsx";
import type {GetVenuesResult, Venue} from "../../../../Types/ProgramAndShowTypes.tsx";
import {useNavigate} from "react-router-dom";
import {VenuePreview} from "./VenuePreview.tsx";

export function ManageVenues(){

    const [venueResult, setVenueResult] = useState<GetVenuesResult>();
    const [gotResult, setGotResult] = useState<boolean>(false);
    let navigate = useNavigate();

    useEffect(() =>
    {
        let ignore = false;
        OrchBookHelper.OrchFetchGet("/api/Show/GetVenues")
            .then(r =>
            {
                if (!ignore)
                {
                    r.json().then(j =>
                    {
                        if (!ignore)
                        {
                            setVenueResult(j as GetVenuesResult)
                            setGotResult(true);
                        }
                    })
                }
            })

        return () =>
        {
            ignore = true;
        }
    }, []);

    if (!gotResult)
    {
        return (
            <h1>Loading venues...</h1>
        )
    }


    return (
        <div className={"w-full pr-16"}>
            <h1 className={"text-4xl my-8"}>Manage VENUES</h1>
            <input type={"button"} value={"ADD"} onClick={() => navigate("/User/ManageVenues/AddVenue")}/>
            <div>
                {venueResult?.venues.map((venue) => <VenuePreview key={venue.id} venueData={venue}/>)}
            </div>
        </div>
    )
}