import {LatestBlogs} from "./LatestBlogs.tsx";

export function HomeContainer() {
    return (
        <div className={"w-full h-full"}>
            <div className={"w-full p-24"}>
                <h1 className={"text-center text-4xl"}>WELCOME TO THE MIDNIGHT ORCHESTRA</h1>
            </div>

            <div className={"w-full h-96 bg-primary flex flex-row"}>
                <div className={"w-8 text-white flex"}>
                    <p className={"m-auto"}>{'<'}</p>
                </div>
                <div className={"w-max h-full mx-auto flex"}>
                        <div className={"max-w-lg text-white text-2xl flex flex-col gap-4 py-6"}>
                            <h1 className={"text-3xl text-center"}>SHOWS TO REMEMBER</h1>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex proident</p>
                        </div>
                        <div className={"min-h-i"}>
                            <img src={"https://images.unsplash.com/photo-1519682718457-c82ce8296645?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                            className={"max-h-96 aspect-auto"}/>
                        </div>
                </div>
                <div className={"w-8 text-white flex"}>
                    <p className={"m-auto"}>{'>'}</p>
                </div>
            </div>

            <div className={"flex w-full h-full"}>
                <div className={"p-4 my-auto"}>
                    <img src={"https://images.unsplash.com/photo-1702986956144-f51b17424f1c?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}/>
                </div>

                <div className={"grow flex"}>
                    <div className={"h-5/6 w-full bg-secondary my-auto text-white"}>
                        <LatestBlogs/>
                    </div>
                </div>
            </div>
        </div>
    );
}