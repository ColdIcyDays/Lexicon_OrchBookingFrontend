import {type ReactNode, useEffect} from "react";

export function AuthGuard({ children, RequiredRole } : { children : ReactNode | ReactNode[] , RequiredRole : string }) {

    useEffect(() =>
    {
        
    }, []);

    return (
        {children}
    );
}