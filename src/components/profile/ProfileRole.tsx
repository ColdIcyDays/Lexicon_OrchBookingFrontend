import type {GetAccountInfoResult} from "../../Types/UserTypes.tsx";

export function ProfileRole({ Info } : { Info : GetAccountInfoResult }) {

    let highestRole : string = "";

    if (Info.roles.length <= 0)
    {
        highestRole = "NO ROLE"
    }
    else
    {
        /* TODO: This is a mess... CLEAN IT UP! IDK if i should handle multiple roles...*/
        Info.roles.forEach((val) => {
            if (val.toLowerCase() === "admin")
            {
                highestRole = "Admin";
            }

            if (highestRole != "Admin" && val.toLowerCase() === "showmanager")
            {
                highestRole = "Show manager";
            }

            if (highestRole != "Admin" && val.toLowerCase() === "blogwriter")
            {
                highestRole = "Blog writer"
            }
        })

        if (highestRole.length <= 0)
        {
            highestRole = "Regular user"
        }
    }

    if (highestRole.length <= 0)
    {
        return (<></>)
    }

    return (
        <>{highestRole}</>
    );
}