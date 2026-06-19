
/* Note: Idea here is to have 1 place where i can handle the url. (Proxy is not used on production builds, will need to manually handle the URL)
* i.e -> We get '/api/GetBlogs' becomes 'http://lexicon_backend:8080/api/GetBlogs'.
* Currently the proxy is handling this but apparently i need to do it manually...
*
* */
export abstract class OrchBookHelper {

    private static SetCorrectURL(someInfo : RequestInfo | URL) : RequestInfo | URL {
        if (import.meta.env.MODE === 'development') {
            return someInfo; // Proxy handles the url in this case...
        }

        if (someInfo.toString().includes("http") || someInfo.toString().includes("lexicon_orchbookingbackend:8080"))
        {
            return someInfo;
        }

        return "lexicon_orchbookingbackend:8080" + someInfo;
    }
    public static OrchFetch(input : RequestInfo | URL, init? : RequestInit) : Promise<Response> {
        return fetch(OrchBookHelper.SetCorrectURL(input), init);
    }

    public static OrchFetchGet(input : RequestInfo | URL) : Promise<Response> {
        return fetch(OrchBookHelper.SetCorrectURL(input), {method: 'get', credentials: "include"});
    }

    public static OrchFetchGetPagination(input : RequestInfo | URL, aPerPage : number, aPage : number, aSortMethod : string = "date") : Promise<Response> {
        const params = new URLSearchParams();
        params.set("PerPage", aPerPage.toString());
        params.set("Page", aPage.toString());
        params.set("SortMethod", aSortMethod);

        return fetch(OrchBookHelper.SetCorrectURL(input) + "?" + params, {method: 'get', credentials: "include"});
    }

    public static OrchFetchPost(input : RequestInfo | URL, aBody : BodyInit) : Promise<Response> {
        return fetch(OrchBookHelper.SetCorrectURL(input), {method: 'post', credentials: "include", body: aBody});
    }

    public static OrchFetchJSONPost(input : RequestInfo | URL, jsonObject : object) : Promise<Response> {
        return fetch(OrchBookHelper.SetCorrectURL(input), {method: 'post', credentials: "include", body: JSON.stringify(jsonObject)});
    }
}

/*
headers: { "Content-Type": "application/json", }



* */