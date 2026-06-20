import {OrchBookHelper} from "../../helpers/FetchHelpers.tsx";
import {useEffect, useState} from "react";
import {Navigate, Outlet, useLocation} from "react-router-dom";
import {ProfileMenuContainer} from "./ProfileMenuContainer.tsx";

export function ProfileContainer() {
    const [hasRecievedCheck, setHasRecievedCheck] = useState<boolean>(false);
    const [isAuthed, setIsAuthed] = useState<boolean>(false);
    const [isWaiting, setIsWaiting] = useState<boolean>(true);

    console.log("Is waiting state: " + isWaiting);

    useEffect(() => {
        console.log("[UseEffect] Checking auth!")
        let ignore = false;
        OrchBookHelper.OrchFetchGet('/Account/Auth/CheckAuth').then(r =>
        {
            if (!ignore)
            {
                setIsWaiting(false);
                setIsAuthed(r.ok);
                setHasRecievedCheck(true)
            }
        });

        return () =>
        {
            // In case we need to cleanup for whatever reason...
            console.log("[Use effect] Ignoring check auth!");
            ignore = true;
        }
    }, []);

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
        <div className={"w-full h-full grow flex flex-col"}>
            <div className={"flex flex-row h-full grow"}>
                <div className={"px-16 py-16 flex"}>
                    <ProfileMenuContainer/>
                </div>
                <Outlet/>
            </div>
        </div>
    );
}