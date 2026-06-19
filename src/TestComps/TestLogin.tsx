import {useEffect, useState} from "react";

import type {AccountInfo, GetBlogResult, GetProgramsResult, GetShowsResult, ModifyUserRole} from "./TestTypes.tsx";
import {TestBlogThumb} from "./TestBlogThumb.tsx";
import {TestProgramThumb} from "./TestProgramThumb.tsx";
import {TestShowThumb} from "./TestShowThumb.tsx";


export function TestLogin(){
    const [isLoginSuccess, setIsLoginSuccess] = useState<boolean>(false);
    const [getBlogsResult, setGetBlogsResult] = useState<GetBlogResult>();
    const [getShowsResult, setGetShowsResult] = useState<GetShowsResult>();
    const [getProgramResult, setGetProgramResult] = useState<GetProgramsResult>();
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

    function HandleUploadShow(event: React.SyntheticEvent<HTMLFormElement>) {
        console.log("Handling upload show!")
        event.preventDefault();
        const form = event.currentTarget;
        const foundData = new FormData(form);
        fetch('/api/Show/UploadShow', {method: 'post', body: foundData, credentials: 'include'})
            .then(r => {
                FetchProgramsAndShows();
            });
    }

    function HandleUploadProgram(event: React.SyntheticEvent<HTMLFormElement>) {
        console.log("Handling upload program!")
        event.preventDefault();
        const form = event.currentTarget;
        const foundData = new FormData(form);
        fetch('/api/Show/UploadProgram', {method: 'post', body: foundData, credentials: 'include'})
            .then(r => {
                FetchProgramsAndShows();
            });
    }

    function FetchProgramsAndShows(){
        const params = new URLSearchParams();
        params.set("PerPage", "2");
        params.set("Page", "0");
        params.set("SortMethod", "date");

        fetch('/api/Show/GetShows', {method: 'get'})
            .then(async result => {
                setGetShowsResult((await result.json()) as GetShowsResult);
                console.log("Got some blogs!")
            });

        fetch('/api/Show/GetPrograms', {method: 'get'})
            .then(async result => {
                setGetProgramResult((await result.json()) as GetProgramsResult);
                console.log("Got some blogs!")
            });
    }


    useEffect(() => {
/*        let headers = new Headers();
        headers.append("Access-Control-Allow-Origin", "http://localhost:5294/");
        headers.append("Access-Control-Allow-Credentials", "true");*/
        let ignore = false;

        if (!hasCheckedAuth)
        {
            FetchBlogs();
            fetch('/Account/Auth/CheckAuth', {method: 'get', credentials: 'include'})
                .then(r => {
                    if (ignore)
                    {
                        return;
                    }
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

        return () => { ignore = true; }
    })

    return (
      <div className='font-pilant'>
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
                    <h1 className='font-pilant'>You are admin!</h1>
                </div>
                :
                <div>
                    <h1 className='font-pilant'>You are NOT admin!</h1>
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

            <div>
                <h1>Lets see those programs!</h1>
                <div>
                    {getProgramResult?.foundPrograms.map((data, idx) => <TestProgramThumb key={data.id} programResult={data}/>)}
                </div>
                <h1>Here comes the shows!</h1>
                <div>

                </div>
                    {getShowsResult?.foundShows.map((data, idx) => <TestShowThumb key={data.id} someShow={data}/>)}
                <div>
                    <h1>Here you can add your own shows and programs!</h1>

                    <div className={'flex flex-row'}>
                        <form className={"ml-4"} id={"uploadProgram"} onSubmit={HandleUploadProgram} action={""}>
                            <h1>Program</h1>
                            <div>
                                <label className={"block"}>Title</label>
                                <input className={"border"} type={"text"} form={"uploadProgram"} name={"title"}/>
                            </div>

                            <div>
                                <label className={"block"}>Description</label>
                                <input className={"border"} type={"text"} form={"uploadProgram"} name={"description"}/>
                            </div>

                            <div>
                                <label className={"block"}>Length (min)</label>
                                <input className={"border"} type={"number"} form={"uploadProgram"} name={"lengthInMinutes"}/>
                            </div>

                            <input type={"submit"} form={"uploadProgram"} className={"cursor-pointer"}/>
                        </form>

                        <form className={"ml-4"} id={"uploadShow"} onSubmit={HandleUploadShow} action={""}>
                            <h1>Show</h1>
                            <div>
                                <label className={"block"}>Program ID</label>
                                <input className={"border"} type={"number"} form={"uploadShow"} name={"programId"}/>
                            </div>

                            <div>
                                <label className={"block"}>Venue name</label>
                                <input className={"border"} type={"text"} form={"uploadShow"} name={"venueName"}/>
                            </div>

                            <div>
                                <label className={"block"}>Venue address</label>
                                <input className={"border"} type={"text"} form={"uploadShow"} name={"venueAddress"}/>
                            </div>

                            <div>
                                <label className={"block"}>Show date</label>
                                <input className={"border"} type={"datetime-local"} form={"uploadShow"} name={"showDate"}/>
                            </div>

                            <input type={"submit"} form={"uploadShow"} className={"cursor-pointer"}/>
                        </form>
                    </div>
                </div>
            </div>
        </div>
      </div>
    );
}