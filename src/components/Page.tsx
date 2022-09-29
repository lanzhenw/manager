import styled from "styled-components"
import {ReactNode} from "react"
import { TabStrip, TabStripSelectEventArguments, TabStripTab } from "@progress/kendo-react-layout"
import { useLocation, useNavigate } from "react-router-dom"

type Props = {
    children: ReactNode
}

const Root = styled.div`
    height: 100%;
    width: calc(100% - 200px);
`
const Page = ({children}: Props) => {
    return (
        <Root>
             {children}
        </Root>
    ) 
}

export default Page