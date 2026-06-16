import type {Blog} from "./TestTypes.tsx";


export function TestBlogThumb({ BlogData } : { BlogData: Blog}){
    return (
        <div className={'rounded-md border-2 p-4'}>
            <h1>{BlogData.contentTitle}</h1>
            <p>{BlogData.contentBody}</p>
            <p>Images: {BlogData.images}</p>
            <p>DateCreated: {BlogData.dateCreated.toString()}</p>
        </div>
    );
}