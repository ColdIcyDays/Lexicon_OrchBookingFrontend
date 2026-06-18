import {useLocation} from "react-router-dom";
import {LoginRegisterComponent} from "./LoginRegisterComponent.tsx";

export function LoginContainer(){
    const showLogin = useLocation().pathname.toLowerCase().includes("login");

    return (
        <div className={"h-full w-full flex"}>
            <div className={"m-auto w-[512px] h-[396px] bg-secondary"}>
                <LoginRegisterComponent aShowLogin={showLogin}/>
            </div>
        </div>
    );
}