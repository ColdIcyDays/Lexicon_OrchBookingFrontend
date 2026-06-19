import {useState} from "react";
import {OrchBookHelper} from "../../helpers/FetchHelpers.tsx";
import {Navigate} from "react-router-dom";

export function AuthCompGuard({ LoggedInComp, LoggedOutComp } : { LoggedInComp : React.ReactNode, LoggedOutComp : React.ReactNode }){
    const [isAuthed, setIsAuthed] = useState<boolean>(false);
    const [isWaiting, setIsWaiting] = useState<boolean>(true);

    console.log("Is waiting state: " + isWaiting);

    OrchBookHelper.OrchFetchGet('/Account/Auth/CheckAuth').then(r =>
    {
        setIsWaiting(false);
        setIsAuthed(r.ok);
    });

    if (isWaiting)
    {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        );
    }

    console.log("Checked auth is: " + isAuthed);

    if (isAuthed)
    {
        return (
            <>{LoggedInComp}</>
        )
    }

    return (
        <>{LoggedOutComp}</>
    );
}