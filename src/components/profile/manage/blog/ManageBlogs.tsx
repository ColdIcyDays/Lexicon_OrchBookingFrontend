import {useEffect, useState} from "react";
import type {Blog, GetBlogResult} from "../../../../Types/BlogTypes.tsx";
import {OrchBookHelper} from "../../../../helpers/FetchHelpers.tsx";
import {ManageBlogPreview} from "./ManageBlogPreview.tsx";
import {useNavigate} from "react-router-dom";

export function ManageBlogs(){
    const [blogResult, setBlogResult] = useState<GetBlogResult | undefined>();
    const [gotResult, setGotResult] = useState<boolean>(false);

    let navigate = useNavigate();

    useEffect(() =>
    {
        let ignore = false;
        OrchBookHelper.OrchFetchGet("/api/Blog/GetBlogs")
            .then(r =>
            {
                if (!ignore)
                {
                    r.json().then(j =>
                    {
                        if (!ignore)
                        {
                            setBlogResult(j as GetBlogResult)
                            setGotResult(true);
                        }
                    })
                }
            })

        return () =>
        {
            ignore = true;
        }
    }, []);

    if (!gotResult)
    {
        return (
            <h3>Loading blogs...</h3>
        )
    }

    if (blogResult === undefined)
    {
        return (
            <h3>Blog result NULL!</h3>
        )
    }

    return (
        <div className={"w-full pr-16"}>
            <h1 className={"text-4xl my-8"}>Manage BLOGS</h1>
            <input type={"button"} value={"ADD"} onClick={() => navigate("/User/ManageBlogs/AddBlog")} className={"border ml-8 px-2 cursor-pointer"}/>

            <div className={"flex flex-col p-4 gap-4"}>
                {blogResult.foundBlogs.map((blogData) => <ManageBlogPreview key={blogData.id} BlogData={blogData}/>)}
            </div>
        </div>
    )
}