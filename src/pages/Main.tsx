import React from "react"
import {Outlet} from "react-router-dom"
import styled from "styled-components"


import Page from "../components/Page"
import TitleBar from "../components/TitleBar"
import WellControl from "../components/controls/WellControl"
import { AppProvider } from "../context/AppContext"



const Main: React.FunctionComponent = () => {

    const Container = styled.div`
    height: calc(100vh - 45px);
    width: 100%;
    margin-top: 45px;
    display: flex;
    flex-direction: row;
`
    return (
        <AppProvider>
            <div className='main'>
                <TitleBar />
                <Container >
                    <WellControl />
                    <Page>
                        <Outlet />
                    </Page>
                </Container>
                
            </div>
        </AppProvider>
    )
}

export default Main