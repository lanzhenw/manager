import styled from "styled-components"
import {ReactNode} from "react"

type Props = {
    children: ReactNode
}

const Root = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    height: 100%;

`

const ScrollContainer = ({children}: Props) => {
    return (
        <Root>
            <div style={{flex: 1, height: "100%", width: "100%"}}>
                <div style={{width: "100%", height: "100%", overflow:"auto"}}>
                    {children}
                </div>
            </div>
        </Root>
    )
}

export default ScrollContainer