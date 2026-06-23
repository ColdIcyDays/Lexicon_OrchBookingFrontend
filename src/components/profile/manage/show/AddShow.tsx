import {Dropdown} from "../../../Dropdown.tsx";
import {useEffect, useState} from "react";
import {OrchBookHelper} from "../../../../helpers/FetchHelpers.tsx";
import type {GetProgramsResult, GetVenuesResult, OrchProgram, Venue} from "../../../../Types/ProgramAndShowTypes.tsx";

export function AddShow(){
    const [programResult, setProgramResult] = useState<Record<string, OrchProgram>>()
    const [venueResult, setVenueResult] = useState<Record<string, Venue>>()

    useEffect(() =>
    {
        let ignore = false;
        OrchBookHelper.OrchFetchGet("/api/Show/GetPrograms")
            .then(r =>
            {
                if (!ignore)
                {
                    r.json().then(j =>
                    {
                        if (!ignore)
                        {
                            const resultRecord : Record<string, OrchProgram> = {};
                            (j as GetProgramsResult).foundPrograms.forEach((program) =>
                            {
                                resultRecord[program.title] = program;
                            })

                            setProgramResult(resultRecord);
                        }
                    })
                }
            })

        OrchBookHelper.OrchFetchGet("/api/Show/GetVenues")
            .then(r =>
            {
                if (!ignore)
                {
                    r.json().then(j =>
                    {
                        if (!ignore)
                        {
                            const resultRecord : Record<string, Venue> = {};
                            (j as GetVenuesResult).venues.forEach((venue) =>
                            {
                                resultRecord[venue.name] = venue;
                            })

                            setVenueResult(resultRecord);
                        }
                    })
                }
            })

        return () =>
        {
            ignore = true;
        }
    }, []);

    if (venueResult === undefined || programResult === undefined)
    {
        return (
            <h3>Loading venues and programs</h3>
        )
    }




    return (
        <div>
            <h1 className={"text-4xl my-8"}>Manage SHOWS</h1>
            <div className={"flex gap-4"}>
                <input type={"datetime-local"}/>
                <Dropdown RecordData={venueResult}/>
                <Dropdown RecordData={programResult}/>
            </div>
            <input value={"Submit"} type={"button"} className={"cursor-pointer"}/>
        </div>
    )

    function HandleSubmit
}