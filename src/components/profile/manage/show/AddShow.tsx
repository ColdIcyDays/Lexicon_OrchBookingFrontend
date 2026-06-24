import {Dropdown} from "../../../Dropdown.tsx";
import {useEffect, useState} from "react";
import {OrchBookHelper} from "../../../../helpers/FetchHelpers.tsx";
import {
    type GetProgramsResult,
    type GetVenuesResult,
    type OrchProgram, UploadShowRequest,
    UploadVenueRequest,
    type Venue
} from "../../../../Types/ProgramAndShowTypes.tsx";
import {useNavigate} from "react-router-dom";

export function AddShow(){
    const [programResult, setProgramResult] = useState<Record<string, OrchProgram>>()
    const [venueResult, setVenueResult] = useState<Record<string, Venue>>()

    const [selectedVenue, setSelectedVenue] = useState<Venue | null>();
    const [selectedProgram, setSelectedProgram] = useState<OrchProgram | null>();
    const [selectedDate, setSelectedDate] = useState<Date>();

    const navigate = useNavigate();

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
                <input type={"datetime-local"} onChange={(e) => {setSelectedDate(new Date(e.target.value))}}/>
                <Dropdown RecordData={venueResult} DataSelectedCallback={(currentVenue: Venue) => setSelectedVenue(currentVenue)}/>
                <Dropdown RecordData={programResult} DataSelectedCallback={(currentProgram: OrchProgram) => setSelectedProgram(currentProgram)}/>
            </div>
            <input value={"Submit"} type={"button"} className={"cursor-pointer"} onClick={HandleShowSubmit}/>
        </div>
    )

    function HandleShowSubmit()
    {
        console.log("Handle submit UploadShow started!")
        if (selectedVenue === null || selectedVenue === undefined)
        {
            console.log("Venue is " + selectedVenue);
            return;
        }

        if (selectedProgram === null || selectedProgram === undefined)
        {
            console.log("Program is " + selectedProgram);
            return;
        }

        if (selectedDate === undefined)
        {
            console.log("Date is " + selectedDate);
            return;
        }

        console.log("Handling upload show!")
        console.log("Handling upload show!")

        const show = new UploadShowRequest();

        show.programId = selectedProgram.id;
        show.venueId = selectedVenue.id;
        show.showDate = selectedDate;

        OrchBookHelper.OrchFetchJSONPost("/api/Show/UploadShow", show)
            .then(r =>
            {
                if (r.ok)
                {
                    navigate("/User/ManageShows")
                }
            });
    }
}