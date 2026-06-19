import {Link} from 'react-router-dom';
import {AuthCompGuard} from "../guard/AuthCompGuard.tsx";
import {AuthStatus} from "./AuthStatus.tsx";
export function TopBar() {
    return (
        <div className={"min-h-64 w-full border-b border-dotted border-black/25 grid grid-rows-2"}>
            <div className={"flex flex-row"}>
                <div className={"bg-lightaccent w-[128px] h-full ml-auto"}>
                    <Link to={"/Home"}>
                        <div className={"bg-accent w-[256px] h-full mx-auto grow flex"}>
                            <p className={"m-auto"}>Logo goes here or smthing...</p>
                        </div>
                    </Link>
                </div>
                <div className={"bg-lightaccent w-[128px] h-1/2 ml-auto rounded-bl-2xl "}>
                    <Link to={"/User"} className={"h-full w-full flex pr-2"}>
                        <AuthCompGuard LoggedInComp={<AuthStatus IsAuthed={true}/>} LoggedOutComp={<AuthStatus IsAuthed={false}/>}/>
                    </Link>
                </div>
            </div>
            {/* TODO: pl-13 centers the div on 'TICKETS AND SHOWS'. Any better way of doing this?*/}
            <div className={"w-full h-full flex pl-13"}>
                <div className={"w-max flex flex-row mx-auto gap-12 my-auto text-2xl"}>
                    <div className={"mt-auto"}>
                        <Link to={"/Blog"}>
                            BLOG
                        </Link>
                    </div>
                    <div className={"text-3xl mt-auto"}>
                        <Link to={"/Tickets&Shows"}>
                            TICKETS AND SHOWS
                        </Link>
                    </div>
                    <div className={"mt-auto"}>
                        <Link to={"/Aboutus"}>
                            ABOUT US
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}