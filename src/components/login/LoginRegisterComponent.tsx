import {OrchBookHelper} from "../../helpers/FetchHelpers.tsx";
import {useState} from "react";
import {Navigate} from "react-router-dom";

export function LoginRegisterComponent({ aShowLogin } : { aShowLogin : boolean }) {
    const [hasTriedLogin, setHasTriedLogin] = useState<boolean>(false);
    const [isWaiting, setIsWaiting] = useState<boolean>(false);
    const [loginSuccess, setLoginSuccess] = useState<boolean>(false);

    if (hasTriedLogin && loginSuccess)
    {
        return (
            <Navigate to={"/User"}/>
        );
    }

    if (aShowLogin)
    {
        return (
            <div className={"grid grid-cols-2 bg-secondary p-8 w-full h-full"}>
                <div className={"w-full h-full bg-white p-4"}>
                    <form className={"flex flex-col h-full"} id={"login"} onSubmit={HandleLogin}>
                        <h1>Login</h1>
                        <div>
                            <label className={"block"}>Username/Email</label>
                            <input className={"border"} type={"text"} form={"login"} name={"userName"}/>
                        </div>

                        <div>
                            <label className={"block"}>Password</label>
                            <input className={"border"} type={"password"} form={"login"} name={"password"}/>
                        </div>

                        <div>
                            <label>Remember me</label>
                            <input className={"ml-4"} type={"checkbox"} form={"login"} name={"rememberMe"}/>
                        </div>

                        <div className={"mt-auto"}>
                            <input type={"submit"} form={"login"} value={"Submit"} className={"cursor-pointer"}/>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div>

        </div>
    );

    function HandleLogin(event: React.SyntheticEvent<HTMLFormElement>)
    {
        event.preventDefault();
        if (isWaiting)
        {
            return;
        }

        console.log("Handling login!")
        if (!hasTriedLogin)
        {
            setHasTriedLogin(true);
        }

        setIsWaiting(true);
        const form = event.currentTarget;
        const foundData = new FormData(form);
        foundData.set("rememberMe", (foundData.get("rememeberMe") === "on" ? "true" : "false"));

        OrchBookHelper.OrchFetchPost('/Account/Auth/Login', foundData)
            .then(r =>
            {
                setIsWaiting(false)
                setLoginSuccess(r.ok)
            })
    }
}


