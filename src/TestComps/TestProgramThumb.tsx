import type {OrchProgram} from "./TestTypes.tsx";

export function TestProgramThumb ({ programResult } : { programResult : OrchProgram}){
    return (
        <div className={'rounded-md border-2 p-4'}>
            <h1>{programResult.title}</h1>
            <p>{programResult.description}</p>
            <p>Length (min): {programResult.lengthInMinutes}</p>
            <p>Id: {programResult.id}</p>
        </div>
    )
}