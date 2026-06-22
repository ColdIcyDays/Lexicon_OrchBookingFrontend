import {useEffect, useState} from "react";
import type {GetProgramsResult, GetVenuesResult} from "../../../../Types/ProgramAndShowTypes.tsx";
import {useNavigate} from "react-router-dom";
import {OrchBookHelper} from "../../../../helpers/FetchHelpers.tsx";
import {VenuePreview} from "../venue/VenuePreview.tsx";
import {ProgramPreview} from "./ProgramPreview.tsx";

export function ManagePrograms(){

    const [programResult, setProgramResult] = useState<GetProgramsResult>();
    const [gotResult, setGotResult] = useState<boolean>(false);
    let navigate = useNavigate();

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
                            setProgramResult(j as GetProgramsResult)
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
            <h1>Loading programs...</h1>
        )
    }


    return (
        <div className={"w-full pr-16"}>
            <h1 className={"text-4xl my-8"}>Manage PROGRAMS</h1>
            <input type={"button"} value={"ADD"} onClick={() => navigate("/User/ManagePrograms/AddProgram")}/>
            <div className={"flex flex-col"}>
                {programResult?.foundPrograms.map((p) => <ProgramPreview programData={p}/>)}
            </div>
        </div>
    )
}