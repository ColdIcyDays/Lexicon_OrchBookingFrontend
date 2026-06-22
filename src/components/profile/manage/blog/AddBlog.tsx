import {OrchBookHelper} from "../../../../helpers/FetchHelpers.tsx";
import {useNavigate} from "react-router-dom";
import {useState} from "react";

export function AddBlog(){
    const [isPostingBlog, setIsPostingBlog] = useState<boolean>(false)
    let navigate = useNavigate();

    if (isPostingBlog)
    {
        return (
            <div>
                <h3>Posting blog...</h3>
            </div>
        )
    }

    return (
        <div>
            <h1 className={"text-4xl my-8"}>Add BLOG</h1>
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
    )

    function HandleUploadBlog(event: React.SyntheticEvent<HTMLFormElement>)
        {
            event.preventDefault();
            const form = event.currentTarget;
            const foundData = new FormData(form);
            /* TODO: Properly handle error codes... */
            setIsPostingBlog(true)
            OrchBookHelper.OrchFetchPost("/api/Blog/UploadBlog", foundData)
                .then(r =>
                {
                    if (r.ok)
                    {
                        navigate("/User/ManageBlogs")
                    }
                })
        }
    }