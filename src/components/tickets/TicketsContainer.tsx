import {Link} from "react-router-dom";

export function TicketsContainer() {
    return (
        <div className={"w-full h-full"}>
            <h1>Welcome to tickets and shows!</h1>
            <Link to={"/Tickets&Shows/PurchaseTicket"} state={{Test: "Haha this is from the tickets container!!!"}}>Purchase</Link>
        </div>
    );
}