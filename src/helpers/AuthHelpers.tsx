import {OrchBookHelper} from "./FetchHelpers.tsx";

export abstract class AuthHelpers {
    public static CheckAuth() : Promise<Response> {
        return OrchBookHelper.OrchFetchGet('/Account/Auth/CheckAuth');
    }
}