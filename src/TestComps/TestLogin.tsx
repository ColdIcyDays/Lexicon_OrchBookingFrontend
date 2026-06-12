import {useEffect, useState} from "react";

type AccountInfo = {
    username: string,
    email: string,
    roles: string[]

}

type ModifyUserRole = {
    targetUsername: string,
    newRoleName: string
}

export function TestLogin(){
    const [isLoginSuccess, setIsLoginSuccess] = useState<boolean>(false);
    const [hasCheckedAuth, setHasCheckedAuth] = useState<boolean>(false);
    const [canModify, setCanModifiy] = useState<boolean>(false);
    const [currentAccount, setCurrentAccount] = useState<AccountInfo>();
    function HandleLogin(event: React.SyntheticEvent<HTMLFormElement>){
        console.log("Handling login!")
        event.preventDefault();
        const form = event.currentTarget;
        const foundData = new FormData(form);
        foundData.set("rememberMe", (foundData.get("rememeberMe") === "on" ? "true" : "false"));
        fetch('/Account/Auth/Login', {method: 'post', body: foundData, credentials: 'include'})
            .then(r => {
                setIsLoginSuccess(r.ok);

                fetch('/Account/Auth/AccountInfo', {method: 'get', credentials: 'include'})
                    .then(async r => {

                        const indata = ((await r.json()) as AccountInfo);

                        console.log(indata);

                        setCurrentAccount(indata);
                    });

                const temp: ModifyUserRole = {} as ModifyUserRole;
                temp.newRoleName = "Prutt";
                temp.targetUsername = "Test";
                fetch('/Account/Auth/ModifyUserRole', {method: 'post', credentials: 'include',
                    headers: {
                        "Content-Type": "application/json",
                    }, body: JSON.stringify(temp) })
                    .then(async r => {
                        setCanModifiy(r.ok);
                    });
            });
    }

    function HandleRegister(event: React.SyntheticEvent<HTMLFormElement>){
        console.log("Handling login!")
        event.preventDefault();
        const form = event.currentTarget;
        const foundData = new FormData(form);
        fetch('/Account/Auth/Register', {method: 'post', body: foundData, credentials: 'include'})
            .then(r => {
                setIsLoginSuccess(r.ok);
            });
    }



    useEffect(() => {
/*        let headers = new Headers();
        headers.append("Access-Control-Allow-Origin", "http://localhost:5294/");
        headers.append("Access-Control-Allow-Credentials", "true");*/

        if (!hasCheckedAuth)
        {
            fetch('/Account/Auth/CheckAuth', {method: 'get', credentials: 'include'})
                .then(r => {
                    console.log("Response recieved!")
                    console.log(r);
                    setIsLoginSuccess(r.ok);

                    setHasCheckedAuth(true);
                    if (r.ok)
                    {
                        const temp: ModifyUserRole = {} as ModifyUserRole;
                        temp.newRoleName = "Prutt";
                        temp.targetUsername = "Test";
                        fetch('/Account/Auth/ModifyUserRole', {method: 'post', credentials: 'include',
                            headers: {
                                "Content-Type": "application/json",
                            }, body: JSON.stringify(temp) })
                            .then(async r => {
                                setCanModifiy(r.ok);
                            });
                        fetch('/Account/Auth/AccountInfo', {method: 'get', credentials: 'include'})
                            .then(async r => {

                                const indata = ((await r.json()) as AccountInfo);

                                console.log(indata);

                                setCurrentAccount(indata);
                            });


                    }
                })
        }
    })

    return (
      <>
        <div className="flex flex-col">
            {canModify ?
                <div>
                    <h1>You are admin!</h1>
                </div>
                :
                <div>
                    <h1>You are NOT admin!</h1>
                </div>}
            {isLoginSuccess && currentAccount ?
                <div>
                    <h1>You are logged in as: {currentAccount.username}</h1>
                    <h1>Email: {currentAccount.email}</h1>
                    <h1>Roles {currentAccount.roles.map((v, idx) => {
                        return (v)
                    })}</h1>
                </div>
                : null
            }

            <div className={'flex flex-row'}>
                <form className={"ml-4"} id={"login"} onSubmit={HandleLogin} action={""}>
                    <h1>Login</h1>
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
                        <input className={"ml-4"} type={"checkbox"} form={"login"} name={"rememberMe"}/>
                    </div>

                    <input type={"submit"} form={"login"} className={"cursor-pointer"}/>
                </form>

                <div>
                    <form className={"ml-4"} id={"register"} onSubmit={HandleRegister} action={""}>
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
                            <input className={"border"} type={"text"} form={"register"} name={"password"}/>
                        </div>

                        <input type={"submit"} form={"register"} className={"cursor-pointer"}/>
                    </form>
                </div>
            </div>
        </div>
      </>
    );
}