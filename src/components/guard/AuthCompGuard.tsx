import {useEffect, useState} from "react";
import {OrchBookHelper} from "../../helpers/FetchHelpers.tsx";
import {Navigate, useLocation} from "react-router-dom";
import {OrchLocalStorageHelpers} from "../../helpers/OrchLocalStorageHelpers.tsx";

export function AuthCompGuard({ LoggedInComp, LoggedOutComp } : { LoggedInComp : React.ReactNode, LoggedOutComp : React.ReactNode }){
    const [isAuthed, setIsAuthed] = useState<boolean>(false);
    const [isWaiting, setIsWaiting] = useState<boolean>(true);

    const location = useLocation();

    useEffect(() =>
    {
        let ignore = false;
        OrchBookHelper.OrchFetchCheckAuth().then(r =>
        {
            if (!ignore)
            {
                setIsWaiting(false);
                setIsAuthed(r.ok);

                if (OrchLocalStorageHelpers.GetAccountInfo() === null)
                {
                    OrchBookHelper.OrchFetchGet("/Account/Auth/AccountInfo")
                        .then(accountR =>
                        {
                            if (!ignore)
                            {
                                accountR.json().then(j =>
                                {
                                    if (!ignore)
                                    {
                                        OrchLocalStorageHelpers.SaveAccountInfoLocally(j)
                                    }
                                })
                            }
                        })
                }
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