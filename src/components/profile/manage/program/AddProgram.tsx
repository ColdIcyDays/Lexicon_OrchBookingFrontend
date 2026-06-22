import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {OrchBookHelper} from "../../../../helpers/FetchHelpers.tsx";

export function AddProgram(){
    const [isUploadingProgram, setIsUploadingProgram] = useState<boolean>(false);
    let navigate = useNavigate();

    if (isUploadingProgram)
    {
        return (
            <h3>Uploading venue...</h3>
        )
    }


    return (
        <div>
            <form className={"ml-4"} id={"uploadProgram"} onSubmit={HandleUploadProgram} action={""}>
                <h1>Program</h1>
                <div>
                    <label className={"block"}>Title</label>
                    <input className={"border"} type={"text"} form={"uploadProgram"} name={"title"}/>
                </div>

                <div>
                    <label className={"block"}>Description</label>
                    <input className={"border"} type={"text"} form={"uploadProgram"} name={"description"}/>
                </div>

                <div>
                    <label className={"block"}>Length (min)</label>
                    <input className={"border"} type={"number"} form={"uploadProgram"} name={"lengthInMinutes"}/>
                </div>

                <input type={"submit"} form={"uploadProgram"} className={"cursor-pointer"}/>
            </form>
        </div>
    )

    function HandleUploadProgram(event: React.SyntheticEvent<HTMLFormElement>){
        console.log("Handling upload program!")
        event.preventDefault();
        const form = event.currentTarget;
        const foundData = new FormData(form);
        setIsUploadingProgram(true);
        OrchBookHelper.OrchFetchPost("/api/Show/UploadProgram", foundData)
            .then(r =>
            {
                if (r.ok)
                {
                    navigate("/User/ManagePrograms")
                }
            });
    }
}