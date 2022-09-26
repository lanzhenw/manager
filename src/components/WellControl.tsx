import styled from "styled-components"
import useApp from '../hooks/useApp';

const Control = styled.div`
    height: 100%;
    width: 30%;
    display: flex;
    border: 1px solid red
`

const WellControl:React.FunctionComponent = () => {
    const appCtx = useApp()
    console.info("welldata",  appCtx.getFilteredWells())
    return (
        <Control>
            This is well control:
            Filter 
            Show selected well api and name
            // use virtual table
        </Control>
    )
}

export default WellControl