import type {Blog} from "../../../../Types/BlogTypes.tsx";

export function ManageBlogPreview({ BlogData } : { BlogData : Blog }){
    return (
        <div className={"border p-4"}>
            <h5>Id: {BlogData.id}</h5>
            <h3>{BlogData.contentTitle}</h3>
            <p>{BlogData.contentBody}</p>
            <p>{new Date(BlogData.dateCreated).toLocaleDateString()}</p>
        </div>
    )
}