import {OrchBookHelper} from "../../helpers/FetchHelpers.tsx";
import {useState} from "react";
import {Navigate} from "react-router-dom";

export function ProfileContainer() {
    const [isAuthed, setIsAuthed] = useState<boolean>(false);
    const [isWaiting, setIsWaiting] = useState<boolean>(false);
    OrchBookHelper.OrchFetchGet('/Account/Auth/CheckAuth').then(r =>
    {
        setIsWaiting(true);
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