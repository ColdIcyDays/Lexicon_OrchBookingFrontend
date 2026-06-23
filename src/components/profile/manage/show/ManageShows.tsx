import {ProgramPreview} from "../program/ProgramPreview.tsx";
import {useNavigate} from "react-router-dom";
import {ManageBlogPreview} from "../blog/ManageBlogPreview.tsx";
import {useEffect, useState} from "react";
import type {GetBlogResult} from "../../../../Types/BlogTypes.tsx";
import {OrchBookHelper} from "../../../../helpers/FetchHelpers.tsx";
import type {GetProgramsResult, GetShowsResult} from "../../../../Types/ProgramAndShowTypes.tsx";

import {ShowPreview} from "./ShowPreview.tsx";

export function ManageShows() {
    const navigate = useNavigate();
    const [showResult, setShowResult] = useState<GetShowsResult | undefined>();
    const [gotResult, setGotResult] = useState<boolean>(false);

    useEffect(() =>
    {
        let ignore = false;
        OrchBookHelper.OrchFetchGet("/api/Show/GetShows")
            .then(r =>
            {
                if (!ignore)
                {
                    r.json().then(j =>
                    {
                        if (!ignore)
                        {
                            setShowResult(j as GetShowsResult)
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
            <h3>Loading shows...</h3>
        )
    }

    if (showResult === undefined)
    {
        return (
            <h3>Show result NULL!</h3>
        )
    }

    return (
        <div className={"w-full pr-16"}>
            <h1 className={"text-4xl my-8"}>Manage SHOWS</h1>
            <input type={"button"} value={"ADD"} onClick={() => navigate("/User/ManageShows/AddShow")}/>
            <div className={"flex flex-col"}>
                <div className={"flex flex-col p-4 gap-4"}>
                    {showResult.foundShows.map((showData) => <ShowPreview key={showData.id} showData={showData} />)}
                </div>
            </div>
        </div>
    )
}