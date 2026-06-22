import {useState} from "react";
import {OrchBookHelper} from "../../../../helpers/FetchHelpers.tsx";
import {useNavigate} from "react-router-dom";
import {UploadVenueRequest, type Venue} from "../../../../Types/ProgramAndShowTypes.tsx";

export function AddVenue(){

    const [priceFieldIds, setPriceFieldIds] = useState<number[]>([0]);
    const [isUploadingVenue, setIsUploadingVenue] = useState<boolean>(false);
    let navigate = useNavigate();

    if (isUploadingVenue)
    {
        return (
            <h3>Uploading venue...</h3>
        )
    }

    function HandleUploadVenue(event: React.SyntheticEvent<HTMLFormElement>)
    {
        console.log("Uploading venue")
        event.preventDefault();
        const form = event.currentTarget;
        const foundData = new FormData(form);

        /* TODO: Properly handle error codes... */
        setIsUploadingVenue(true)
        OrchBookHelper.OrchFetchPost("/api/Show/UploadVenue", foundData)
            .then(r =>
            {
                if (r.ok)
                {
                    navigate("/User/ManageVenues")
                }
            })
    }

    return (
        <div className={"w-full pr-16"}>
            <h1 className={"text-4xl my-8"}>Add VENUE</h1>
            <form id={"uploadVenue"} onSubmit={HandleUploadVenue} action={""} noValidate={true}>
                <div className={"flex flex-col"}>
                    <label>Venue name</label>
                    <input type={"text"} form={"uploadVenue"} name={"name"}/>
                    <label>Venue address</label>
                    <input type={"text"} form={"uploadVenue"} name={"address"}/>
                    <label>Max seating</label>
                    <input type={"number"} form={"uploadVenue"} name={"maxSeating"}/>
                </div>

                <fieldset form={"uploadVenue"} name={"ticketPrices"}>
                    <legend>Ticket types</legend>
                    <input type={"button"} value={"Add"} className={"px-2 py-1 border cursor-pointer"} onClick={() =>
                    {
                        const idxToAdd = Math.max(...priceFieldIds) + 1;

                        setPriceFieldIds([...priceFieldIds, idxToAdd])
                    }}/>

                    {priceFieldIds.map((id, idx) => <TicketPriceField key={id} index={idx} removeFunction={RemoveIndex}/>)}
                </fieldset>

                <input type={"submit"} form={"uploadVenue"} className={"cursor-pointer"} />
            </form>
        </div>
    )

    function RemoveIndex(idx : number)
    {
        if (idx != 0)
        {
            setPriceFieldIds(priceFieldIds.slice(0, idx).concat(priceFieldIds.slice(idx + 1, priceFieldIds.length)))
        }
    }


}

function TicketPriceField({ index, removeFunction } : { index : number, removeFunction : (idx : number) => void })
{
    return (
        <fieldset form={"uploadVenue"} name={"ticketPriceGroup"}>
            <label>Ticket name</label>
            <input type={"text"} form={"uploadVenue"} name={"ticketPrices[" + index + "].ticketName"} defaultValue={index == 0 ? "Ordinary" : ""}/>
            <label>Ticket price ($)</label>
            <input type={"number"} form={"uploadVenue"} name={"ticketPrices[" + index + "].ticketCost"} defaultValue={index == 0 ? 50 : 0}/>
            <input type={"button"} style={{display : index === 0 ? "none" : "inline" }} value={"REMOVE"} onClick={() => removeFunction(index)}/>
        </fieldset>
    )
}