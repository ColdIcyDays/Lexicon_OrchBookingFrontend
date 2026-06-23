import {useState} from "react";


export function Dropdown<TObject>({ RecordData } : { RecordData : Record<string, TObject> }){

    interface KeyValuePair {
       key : string
       value : TObject | null
    }
    const [allData, setAllData] = useState<Record<string, TObject>>(RecordData);
    const [selectedObject, setSelectedObject] = useState<KeyValuePair>({key: "", value: null});
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

    return (
        <div className={"border min-w-32 h-min"}>
            <input type={"button"} className={"cursor-pointer w-full text-left"} onClick={() => { setDropdownOpen(!dropdownOpen) }} value={selectedObject.value === null ? "-" : selectedObject.key}/>
            <div className={"absolute flex flex-col w-32"} style={{display: dropdownOpen ? "flex" : "none"}}>
                {Object.entries(allData).map(([key, value]) => <input key={key} className={"mr-auto cursor-pointer w-full text-left"} type={"button"} value={key} onClick={() => { setDropdownOpen(false); setSelectedObject({ key: key, value: value }) }}/>)}
            </div>
        </div>
    )
}
