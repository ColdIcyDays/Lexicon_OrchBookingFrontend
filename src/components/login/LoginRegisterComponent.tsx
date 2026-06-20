import {OrchBookHelper} from "../../helpers/FetchHelpers.tsx";
import {useState} from "react";
import {Navigate, useNavigate} from "react-router-dom";

export function LoginRegisterComponent({ aShowLogin } : { aShowLogin : boolean }) {
    const [hasTriedLogin, setHasTriedLogin] = useState<boolean>(false);
    const [isWaiting, setIsWaiting] = useState<boolean>(false);
    const [loginSuccess, setLoginSuccess] = useState<boolean>(false);
    let navigate = useNavigate();

    if (hasTriedLogin && loginSuccess)
    {
        return (
            <Navigate to={"/User"}/>
        );
    }

    if (aShowLogin)
    {
        return (
            <div className={"grid grid-cols-2 bg-secondary pl-8 py-8 w-full h-full"}>
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

                <div className={"mx-auto w-2/3 text-white flex flex-col gap-2 mt-4"}>
                    <h3 className={"text-center"}>Yet to register?</h3>
                    <input className={"border w-full bg-primary p-2 cursor-pointer"} type={"button"} value={"Register"} onClick={() => navigate("/User/Register")} />
                </div>
            </div>
        );
    }

    return (
        <div className={"grid grid-cols-2 bg-secondary pl-8 py-8 w-full h-full"}>
            <div className={"w-full h-full bg-white p-4"}>
                <form className={"flex flex-col h-full"} id={"register"} onSubmit={HandleRegister}>
                    <h1>Register</h1>
                    <div>
                        <label className={"block"}>Email</label>
                        <input className={"border"} type={"text"} form={"register"} name={"email"}/>
                    </div>

                    <div>
                        <label className={"block"}>Username</label>
                        <input className={"border"} type={"text"} form={"register"} name={"userName"}/>
                    </div>

                    <div>
                        <label className={"block"}>Password</label>
                        <input className={"border"} type={"password"} form={"register"} name={"password"}/>
                    </div>

                    <div className={"mt-auto"}>
                        <input type={"submit"} form={"register"} value={"Submit"} className={"cursor-pointer"}/>
                    </div>
                </form>
            </div>

            <div className={"mx-auto w-2/3 text-white flex flex-col gap-2 mt-4"}>
                <h3 className={"text-center"}>Already a member?</h3>
                <input className={"border w-full bg-primary p-2 cursor-pointer"} type={"button"} value={"Login"} onClick={() => navigate("/User/Login")} />
            </div>
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

    function HandleRegister(event: React.SyntheticEvent<HTMLFormElement>)
    {
        event.preventDefault();
        if (isWaiting)
        {
            return;
        }

        console.log("Handling register!")
        if (!hasTriedLogin)
        {
            setHasTriedLogin(true);
        }

        setIsWaiting(true);
        const form = event.currentTarget;
        const foundData = new FormData(form);

        OrchBookHelper.OrchFetchPost('/Account/Auth/Register', foundData)
            .then(r =>
            {
                setIsWaiting(false)
                setLoginSuccess(r.ok)
            })
    }
}


