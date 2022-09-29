import styled from "styled-components"
import useApp from '../../hooks/useApp';
import FilterBar from "./FilterBar";

const Control = styled.div`
    height: 100%;
    width: 200px;
    border-right: 1px solid rgba(66,66,66,0.1);
`

const WellControl:React.FunctionComponent = () => {
    const appCtx = useApp()
    return (
        <Control>
            <FilterBar /> 
        </Control>
    )
}

export default WellControl