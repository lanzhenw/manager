import styled from "styled-components"
import useApp from '../../hooks/useApp';

const Container = styled.div`
    height: 150px;
    margin: 0 auto;
    width: 90%;
    border: 1px solid red
`

const FilterBar:React.FunctionComponent = () => {
    const appCtx = useApp()
    
    return (
        <Container>
            
        </Container>
    )
}

export default FilterBar