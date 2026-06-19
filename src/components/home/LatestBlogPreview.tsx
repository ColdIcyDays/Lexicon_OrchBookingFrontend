import type {Blog} from "../../Types/BlogTypes.tsx";

export function LatestBlogPreview({ BlogData } : { BlogData : Blog }) {
    return (
        <div className={"w-full bg-offprimary mx-auto text-black p-4 text-3xl"}>
            <p>{
                new Date(BlogData.dateCreated).toLocaleDateString()
            }</p>
            <div className={"px-4 pb-4 flex flex-col gap-4"}>
                <h1 className={"text-5xl"}>{BlogData.contentTitle}</h1>
                <p>{BlogData.contentBody}</p>
            </div>
        </div>
    );
}