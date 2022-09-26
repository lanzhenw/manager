import styled from "styled-components"
import {ReactNode} from "react"

type Props = {
    children: ReactNode
}

const Root = styled.div`
    height: 100%;
    width: 70%;
    border: 2px solid green;
`


const Page = ({children}: Props) => {
    return <Root>{children}</Root>
}

export default Page