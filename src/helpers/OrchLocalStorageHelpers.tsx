import type {GetAccountInfoResult} from "../Types/UserTypes.tsx";
import {OrchBookHelper} from "./FetchHelpers.tsx";

export abstract class OrchLocalStorageHelpers
{
    private static AccountInfoKey : string = "AccountInfo"
    /* TODO: This needs to be called somewhere, and update when the user changes... Probably move CheckAuth to its own helper function? */
    public static SaveAccountInfoLocally(someInfo : GetAccountInfoResult){
        localStorage.setItem(OrchLocalStorageHelpers.AccountInfoKey, JSON.stringify(someInfo));
    }

    public static ClearAccountInfo(){
        localStorage.removeItem(OrchLocalStorageHelpers.AccountInfoKey)
    }

    public static FetchAndSaveAccountInfoLocally(){
        OrchBookHelper.OrchFetchGet("/Account/Auth/GetAccountInfo")
            .then(r =>
            {
                r.json()
                    .then(j =>
                    {
                        this.SaveAccountInfoLocally(j as GetAccountInfoResult);
                    })
            })
    }

    public static GetAccountInfo() : GetAccountInfoResult | null
    {
        const data = localStorage.getItem(OrchLocalStorageHelpers.AccountInfoKey);
        if (data === null)
        {
            return null;
        }

        return JSON.parse(data);
    }
}