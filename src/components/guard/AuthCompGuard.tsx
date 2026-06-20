import {useEffect, useState} from "react";
import {OrchBookHelper} from "../../helpers/FetchHelpers.tsx";
import {Navigate, useLocation} from "react-router-dom";

export function AuthCompGuard({ LoggedInComp, LoggedOutComp } : { LoggedInComp : React.ReactNode, LoggedOutComp : React.ReactNode }){
    const [isAuthed, setIsAuthed] = useState<boolean>(false);
    const [isWaiting, setIsWaiting] = useState<boolean>(true);

    const location = useLocation();

    useEffect(() =>
    {
        let ignore = false;
        OrchBookHelper.OrchFetchGet('/Account/Auth/CheckAuth').then(r =>
        {
            if (!ignore)
            {
                setIsWaiting(false);
                setIsAuthed(r.ok);
            }
        });

        return () =>
        {
            ignore = true;
        }

    }, [location.pathname]);

    if (isWaiting)
    {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        );
    }

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