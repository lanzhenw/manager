import { MultiSelect, MultiSelectChangeEvent } from "@progress/kendo-react-dropdowns";
import { useEffect, useState } from "react";
import styled from "styled-components"
import useApp from '../../hooks/useApp';
import { Filter } from "../../types/common";

const Container = styled.div`
    margin: 0 auto;
    width: 90%;
`

const FilterBar:React.FunctionComponent = () => {
    const appCtx = useApp()
    const raw = appCtx.initialData

    const wellOptions = Array.from(new Set(raw.map(x => x.wellName)))
    const reservoirOptions = Array.from(new Set(raw.map(x => x.reservoir)))

    const [selected, setSelect] = useState<Filter>({well: [], reservoir: [], type: []})
    
    const onHandleSelect = (ev: MultiSelectChangeEvent, category: string) => setSelect(s => ({...s, [category]: ev.value}))

    useEffect(() => {
        appCtx.setFilter(selected)
    }, [selected])
    
    return (
        <Container>
             <div className="col-xs-12 col-sm-7 example-col">
                <h5>Select Well:</h5>
                <MultiSelect
                    style={{width: "70%"}}
                    data={wellOptions}
                    value={selected.well}
                    onChange={(ev) => onHandleSelect(ev, "well")}
                    />
            </div>
            <div className="col-xs-12 col-sm-7 example-col">
                <h5>Select Reservoir:</h5>
                <MultiSelect
                    style={{width: "70%"}}
                    data={reservoirOptions}
                    value={selected.reservoir}
                    onChange={(ev) => onHandleSelect(ev, "reservoir")}
                    />
            </div>
            <div className="col-xs-12 col-sm-7 example-col">
                <h5>Select Type:</h5>
                <MultiSelect
                    style={{width: "100%"}}
                    data={['Producer', 'Injector']}
                    value={selected.type}
                    onChange={(ev) => onHandleSelect(ev, "type")}
                    />
            </div>
           
        </Container>
    )
}

export default FilterBar