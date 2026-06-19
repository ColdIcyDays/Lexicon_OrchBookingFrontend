export function AuthStatus({ IsAuthed } : { IsAuthed : boolean }) {

    if (IsAuthed)
    {
        return (
            <div className={"w-max h-max m-auto flex flex-row gap-2"}>
                <div className={"w-8 h-8 bg-white rounded-md my-auto"}/>
                <h4 className={"text-white my-auto"}>Profile</h4>
            </div>
        )
    }

    return (
        <div className={"w-max h-max m-auto flex flex-row gap-2"}>
            <div className={"w-8 h-8 bg-white rounded-md my-auto"}/>
            <h4 className={"text-white my-auto"}>Login</h4>
        </div>
    );
}