import {useEffect, useState} from "react";

import type {AccountInfo, GetBlogResult, ModifyUserRole} from "./TestTypes.tsx";
import {TestBlogThumb} from "./TestBlogThumb.tsx";


export function TestLogin(){
    const [isLoginSuccess, setIsLoginSuccess] = useState<boolean>(false);
    const [getBlogsResult, setGetBlogsResult] = useState<GetBlogResult>();
    const [hasCheckedAuth, setHasCheckedAuth] = useState<boolean>(false);
    const [canModify, setCanModifiy] = useState<boolean>(false);
    const [currentAccount, setCurrentAccount] = useState<AccountInfo>();
    function HandleLogin(event: React.SyntheticEvent<HTMLFormElement>){
        console.log("Handling login!")
        event.preventDefault();
        const form = event.currentTarget;
        const foundData = new FormData(form);
        foundData.set("rememberMe", (foundData.get("rememeberMe") === "on" ? "true" : "false"));
        fetch('http://localhost:5003/Account/Auth/Login', {method: 'post', body: foundData, credentials: 'include'})
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

    function FetchBlogs(){
        const params = new URLSearchParams();
        params.set("PerPage", "2");
        params.set("Page", "0");
        params.set("SortMethod", "date");

        fetch('/api/Blog/GetBlogs', {method: 'get'})
            .then(async result => {
                setGetBlogsResult((await result.json()) as GetBlogResult);
                console.log("Got some blogs!")
            });
    }

    function HandleUploadBlog(event: React.SyntheticEvent<HTMLFormElement>)
    {
        console.log("Handling uploadblog!")
        event.preventDefault();
        const form = event.currentTarget;
        const foundData = new FormData(form);
        fetch('/api/Blog/UploadBlog', {method: 'post', body: foundData, credentials: 'include'});
    }

    function HandleRegister(event: React.SyntheticEvent<HTMLFormElement>){
        console.log("Handling register!")
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
            FetchBlogs();
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
          <div>
              <form className={"ml-4"} id={"uploadBlog"} onSubmit={HandleUploadBlog} action={""}>
                  <h1>Blog</h1>
                  <div>
                      <label className={"block"}>Title</label>
                      <input className={"border"} type={"text"} form={"uploadBlog"} name={"contentTitle"}/>
                  </div>

                  <div>
                      <label className={"block"}>Body</label>
                      <input className={"border"} type={"text"} form={"uploadBlog"} name={"contentBody"}/>
                  </div>

                  <div>
                      <label className={"block"}>ImageURL</label>
                      <input className={"border"} type={"text"} form={"uploadBlog"} name={"blogImage"}/>
                  </div>

                  <input type={"submit"} form={"uploadBlog"} className={"cursor-pointer"}/>
              </form>
          </div>
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
            <div>
                <h1>All blogs are here: </h1>
                {getBlogsResult?.foundBlogs.map((data, idx) => <TestBlogThumb key={data.id} BlogData={data}/>)}
            </div>
        </div>
      </>
    );
}