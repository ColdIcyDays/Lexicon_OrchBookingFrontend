import {OrchBookHelper} from "../../helpers/FetchHelpers.tsx";
import {useEffect, useState} from "react";
import {Navigate} from "react-router-dom";

export function ProfileContainer() {
    const [hasRecievedCheck, setHasRecievedCheck] = useState<boolean>(false);
    const [isAuthed, setIsAuthed] = useState<boolean>(false);
    const [isWaiting, setIsWaiting] = useState<boolean>(true);

    console.log("Is waiting state: " + isWaiting);

    if (!hasRecievedCheck)
    {
        OrchBookHelper.OrchFetchGet('/Account/Auth/CheckAuth').then(r =>
        {
            setIsWaiting(false);
            setIsAuthed(r.ok);
            setHasRecievedCheck(true)
        });
    }

    if (isWaiting)
    {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        );
    }

    console.log("Checked auth is: " + isAuthed);

    if (!isAuthed)
    {
        return (
            <Navigate to={"/User/Login"}/>
        )
    }

    return (
        <div className={"w-full h-full;"}>
            <h1>Welcome to the profile!</h1>
        </div>
    );
}