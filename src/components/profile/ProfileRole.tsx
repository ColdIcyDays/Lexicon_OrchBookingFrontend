import type {GetAccountInfoResult} from "../../Types/UserTypes.tsx";

export function ProfileRole({ Info } : { Info : GetAccountInfoResult }) {

    let highestRole : string = "";

    if (Info.roles.length <= 0)
    {
        highestRole = "NO ROLE"
    }
    else
    {
        Info.roles.forEach((val) => {
            if (highestRole.length <= 0)
            {
                if (val.toLowerCase() === "admin")
                {
                    highestRole = "Admin";
                }
                else if (val.toLowerCase() === "showmanager")
                {
                    highestRole = "Show manager";
                }
                else if (val.toLowerCase() === "blogwriter")
                {
                    highestRole = "Blog writer"
                }
            }
        })
    }

    if (highestRole.length <= 0)
    {
        return (<></>)
    }

    return (
        <>{highestRole}</>
    );
}