import {useEffect, useState} from "react";
import type {GetBlogResult} from "../../Types/BlogTypes.tsx";
import {OrchBookHelper} from "../../helpers/FetchHelpers.tsx";
import {LatestBlogPreview} from "./LatestBlogPreview.tsx";

export function LatestBlogs(){
    const [blogResult, setBlogResult] = useState<GetBlogResult | null>(null);

    useEffect(() =>
    {
        let ignore = false;
        OrchBookHelper.OrchFetchGetPagination("/api/Blog/GetBlogs", 6, 0)
            .then(async r =>
                {
                    if (ignore)
                    {
                        return;
                    }

                    if (r.ok)
                    {
                        setBlogResult((await r.json()) as GetBlogResult);
                    }
                });
        return () => { ignore = true; }
    }, []);

    if (blogResult === null)
    {
        return (
            <p>Fetching...</p>
        );
    }

    return (
        <div className={"flex flex-col h-full p-8"}>
            <div className={"max-h-5/6 flex flex-col gap-4 overflow-hidden flex-wrap grow basis-1 shrink-0"}>
               {blogResult.foundBlogs.map((blog, idx) => <LatestBlogPreview key={blog.id} BlogData={blog}/>)}
            </div>
        </div>
    );
}