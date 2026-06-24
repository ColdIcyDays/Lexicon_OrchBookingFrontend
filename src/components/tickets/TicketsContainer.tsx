import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {OrchBookHelper} from "../../helpers/FetchHelpers.tsx";
import type {ProgramsWithShowsResult, ProgramWithVenue} from "../../Types/TicketAndShowsTypes.tsx";
import {ProgramWithShows} from "./ProgramWithShows.tsx";

export function TicketsContainer() {
    const [programsWithVenues, setProgramsWithVenues] = useState<ProgramsWithShowsResult>()
    const [selectedProgram, setSelectedProgram] = useState<ProgramWithVenue>()
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() =>
    {
        console.log("Effect start")
        let ignore = false;
        OrchBookHelper.OrchFetchGet("/api/Show/ProgramsWithShows").then((r) =>
        {
            console.log("response got!")
            if (!ignore)
            {
                r.json()
                    .then((j) =>
                    {
                        if (!ignore)
                        {
                            setProgramsWithVenues(j as ProgramsWithShowsResult);
                            setIsLoading(false);
                        }

                    })
            }

        });

        return () => {
            console.log("Cleanup")
            ignore = true;
        }
    }, []);

    if (isLoading)
    {
        return (
            <h3>Loading...</h3>
        )
    }

    if (programsWithVenues === undefined)
    {
        return (
            <h3>Failed to load!</h3>
        )
    }

    return (
        <div className={"w-full h-full flex flex-row grow"}>
            <div className={"p-4 grow max-w-1/2"}>
                <div className={"bg-offprimary w-full h-max p-4 flex flex-col"}>
                    <div className={"bg-white"}>
                        {programsWithVenues.programWithVenues.map((p) => <ProgramWithShows key={p.program.id} Data={p} OnSeeVenues={() => setSelectedProgram(p)}/>)}
                    </div>
                </div>
            </div>

            <div className={"p-4 bg-secondary grow my-16 flex"}>
                {selectedProgram ?
                        <div className={"bg-offprimary p-4 flex flex-col gap-2 grow"}>
                            <div className={"bg-white p-4"}>
                                <h3 className={"text-2xl text-center"}>{selectedProgram.program.title}</h3>
                                <p>{selectedProgram.program.description}</p>
                            </div>
                            <div className={"bg-white grow flex flex-col p-4"}>

                                <input type={"button"} value={"Buy tickets"} className={"mt-auto cursor-pointer"}/>
                            </div>
                        </div>
                    :
                    <div className={"flex h-full"}>
                        <h3 className={"text-white m-auto"}>Click 'See venues' to see available venues!</h3>
                    </div>
                }
            </div>

        </div>
    );
}


/*
*
*
*    <h1>Welcome to tickets and shows!</h1>
            <Link to={"/Tickets&Shows/PurchaseTicket"} state={{Test: "Haha this is from the tickets container!!!"}}>Purchase</Link>*/