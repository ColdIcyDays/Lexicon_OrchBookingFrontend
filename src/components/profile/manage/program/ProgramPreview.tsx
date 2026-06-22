import type {OrchProgram} from "../../../../Types/ProgramAndShowTypes.tsx";

export function ProgramPreview({ programData } : { programData : OrchProgram }){
    return (
        <div className={"border w-full"}>
            <h4>Id: {programData.id}</h4>
            <h3>{programData.title}</h3>
            <h3>{programData.description}</h3>
            <h3>{programData.lengthInMinutes}</h3>
        </div>
    )
}