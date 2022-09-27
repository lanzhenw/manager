import styled from "styled-components"
import useApp from '../../hooks/useApp';
import FilterBar from "./FilterBar";
import VirtualEditableTable from "./VirtualEditableTable";

const Control = styled.div`
    height: 100%;
    width: 350px;
    border-right: 1px solid rgba(66,66,66,0.1);
`

const WellControl:React.FunctionComponent = () => {
    const appCtx = useApp()
    console.info("welldata",  appCtx.getFilteredWells())
    return (
        <Control>
            <FilterBar /> 
            <VirtualEditableTable />
        </Control>
    )
}

export default WellControl