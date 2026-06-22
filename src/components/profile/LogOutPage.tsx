import {Navigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {OrchBookHelper} from "../../helpers/FetchHelpers.tsx";
import {OrchLocalStorageHelpers} from "../../helpers/OrchLocalStorageHelpers.tsx";

export function LogOutPage(){
    const [gotLogoutResponse, setGotLogoutResponse] = useState<boolean>(false);

    useEffect(() =>
    {
        OrchBookHelper.OrchFetchPost("/Account/Auth/Logout", null)
            .finally(() =>
        {
            setGotLogoutResponse(true);
            OrchLocalStorageHelpers.ClearAccountInfo();
        })
    }, []);

    if (!gotLogoutResponse)
    {
        return (
            <h3>Logging out...</h3>
        )
    }

    return (
        <Navigate to={"/Home"}/>
    )
}