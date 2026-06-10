import {useEffect, useState} from "react";

export function TestLogin(){
    const [isLoginSuccess, setIsLoginSuccess] = useState<boolean>(false);
    function HandleLogin(event: React.SyntheticEvent<HTMLFormElement>){
        console.log("Handling login!")
        event.preventDefault();
        const form = event.currentTarget;
        const foundData = new FormData(form);
        foundData.set("rememberMe", (foundData.get("rememeberMe") === "on" ? "true" : "false"));
        fetch("http://localhost:5294/Account/Auth/Login", {method: 'post', body: foundData})
            .then(r => {
                setIsLoginSuccess(r.ok);
            });
    }

    useEffect(() => {
        fetch("http://localhost:5294/Account/Auth/CheckAuth", {method: 'get', credentials: 'include'})
            .then(r => {
                setIsLoginSuccess(r.ok);
            })
    })

    return (
      <>
        <div className="flex flex-col">
            {isLoginSuccess ?
                <div>
                    <h1>You are logged in as: {}</h1>
                </div>
                : null
            }
            <form className={"ml-4"} id={"login"} onSubmit={HandleLogin} action={""}>
                <div>
                    <label className={"block"}>Username</label>
                    <input className={"border"} type={"text"} form={"login"} name={"userName"}/>
                </div>

                <div>
                    <label className={"block"}>Password</label>
                    <input className={"border"} type={"text"} form={"login"} name={"password"}/>
                </div>

                <div>
                    <label>Remember me</label>
                    <input className={"ml-4"} type={""} form={"login"} name={"rememberMe"}/>
                </div>

                <input type={"submit"} form={"login"} className={"cursor-pointer"}/>
            </form>
            <div>

            </div>
        </div>
      </>
    );
}