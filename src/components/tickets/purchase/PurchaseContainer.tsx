import { useLocation } from "react-router-dom";

export function PurchaseContainer(){
    const location = useLocation();
    return (
        <div className={"w-full h-full"}>
            <h1>Welcome to the purchase!</h1>
            <h1>Test value is: [{location.state.Test}]</h1>
        </div>
    );
}