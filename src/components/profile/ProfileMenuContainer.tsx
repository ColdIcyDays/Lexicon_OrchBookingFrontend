import {ProfileMenuItem} from "./ProfileMenuItem.tsx";
import {useEffect, useState} from "react";
import {Navigate} from "react-router-dom";

export function ProfileMenuContainer() {
    const [shouldLogout, setShouldLogout] = useState<boolean>(false);

    if (shouldLogout)
    {
        return (
            <Navigate to={"/User/Logout"}/>
        )
    }

    return (
        <div className={"flex flex-col p-8 border-2 h-auto min-w-max max-h-[512px]"}>
            <ProfileMenuItem ItemName={"Account Info"} Destination={"/User/AccountInfo"}/>
            <ProfileMenuItem ItemName={"Purchased Tickets"} Destination={"/User/PurchasedTickets"}/>
            <ProfileMenuItem ItemName={"Manage BLOGS"} Destination={"/User/ManageBlogs"}/>
            <ProfileMenuItem ItemName={"Manage PROGRAMS"} Destination={"/User/ManagePrograms"}/>
            <ProfileMenuItem ItemName={"Manage VENUES"} Destination={"/User/ManageVenues"}/>
            <ProfileMenuItem ItemName={"Manage SHOWS"} Destination={"/User/PurchasedTickets"}/>

            <input type={"button"} onClick={HandleLogout} value={"Logout"} className={"mt-auto cursor-pointer border"}/>
        </div>
    );

    function HandleLogout()
    {
        setShouldLogout(true);
    }
}