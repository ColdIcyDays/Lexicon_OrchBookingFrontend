import {Link} from 'react-router-dom';
export function TopBar() {
    return (
        <div className={"min-h-32 w-full border-b border-dotted border-black/25 grid grid-rows-2"}>
            <div className={"flex flex-row"}>
                <div className={"bg-lightaccent w-[128px] h-full ml-auto"}>
                    <Link to={"/Home"}>
                        <div className={"bg-accent w-[256px] h-full mx-auto grow flex"}>
                            <p className={"m-auto"}>Logo goes here or smthing...</p>
                        </div>
                    </Link>
                </div>
                <div className={"bg-lightaccent w-[128px] h-auto ml-auto rounded-bl-2xl "}>
                    <Link to={"/User"} className={"h-full w-full flex pr-2"}>
                        <div className={"w-max h-max m-auto flex flex-row gap-2"}>
                            <div className={"w-8 h-8 bg-white rounded-md my-auto"}/>
                            <h4 className={"text-white my-auto"}>Login</h4>
                        </div>
                    </Link>
                </div>
            </div>
            <div className={"w-full h-full flex"}>
                {/* TODO: How should i center this? TICKETS AND SHOWS needs to be centered, not the entire div...*/}
                <div className={"w-max flex flex-row mx-auto gap-6 my-auto"}>
                    <div className={"mt-auto"}>
                        <Link to={"/Blog"}>
                            BLOG
                        </Link>
                    </div>
                    <div className={"text-xl mt-auto"}>
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