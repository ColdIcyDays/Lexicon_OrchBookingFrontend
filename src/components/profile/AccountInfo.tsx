import {useEffect, useState} from "react";
import {OrchBookHelper} from "../../helpers/FetchHelpers.tsx";
import type {GetAccountInfoResult} from "../../Types/UserTypes.tsx";
import {ProfileRole} from "./ProfileRole.tsx";

export function AccountInfo(){
    const [accountInfoResult, setAccountInfoResult] = useState<GetAccountInfoResult | null>(null)
    const [gotResponse, setGotResponse] = useState<boolean>(false)

    useEffect(() =>
    {
        let ignore = false;
        OrchBookHelper.OrchFetchGet("/Account/Auth/AccountInfo")
            .then(r =>
            {
                if (ignore)
                {
                    return;
                }


                if (r.ok)
                {
                    r.json().then(value => {
                        setAccountInfoResult(value as GetAccountInfoResult)
                        setGotResponse(true);
                    })
                }
                else
                {
                    setGotResponse(true);
                }
            })
        return () => {
            ignore = true;
        }
    }, []);

    if (!gotResponse)
    {
        return (
            <h3>Loading account info...</h3>
        );
    }

    if (accountInfoResult === null)
    {
        return (
            <h3>FAILED TO GET ACCOUNT INFO!</h3>
        )
    }

    return (
        <div className={"w-full h-full"}>
            <h1 className={"text-4xl my-8"}>Account Info</h1>
            <div className={"border-l border-dotted pl-2"}>
                <h3> | <ProfileRole Info={accountInfoResult}/> | </h3>
                <h3>DisplayName: {accountInfoResult.data.displayName}</h3>
                <h3>Username: {accountInfoResult.username}</h3>
                <h3>Email: {accountInfoResult.email}</h3>
                <h3>Date joined: {new Date(accountInfoResult.data.dateJoined).toLocaleDateString()}</h3>
            </div>
        </div>
    );
}