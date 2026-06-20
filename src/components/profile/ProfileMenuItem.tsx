import {Link, useLocation} from "react-router-dom";
import {useEffect, useState} from "react";

export function ProfileMenuItem({ ItemName, Destination } : { ItemName : string, Destination : string }){
    const [isSelected, setIsSelected] = useState<boolean>(false)
    const location = useLocation();

    useEffect(() =>
    {
        setIsSelected(location.pathname === Destination);
    }, [Destination, location.pathname]);


    return (
        <Link to={Destination} style={{textDecoration : isSelected ? "underline" : "none"}}>{ItemName}</Link>
    );
}