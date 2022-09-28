import styled from "styled-components"
import {ReactNode} from "react"
import { TabStrip, TabStripSelectEventArguments, TabStripTab } from "@progress/kendo-react-layout"
import { useLocation, useNavigate } from "react-router-dom"

type Props = {
    tab: number,
    children: ReactNode
}

const ViewTabStrip = ({tab, children}: Props) => {
    const {pathname} = useLocation()
    const navigate = useNavigate()
    const handleSelect = (e: TabStripSelectEventArguments) => {
        if (e.selected === 0) navigate('/main/map')
        if (e.selected === 1) navigate('/main/table')
        if (e.selected === 2) navigate('/main/graph1')
        if (e.selected === 3) navigate('/main/graph2')
        else return 0
    }
    const getSelectedTab = (pathName: string) => {
        const mapPath = '/main/map'
        const tablePath = '/main/table'
        const graphPath1 = '/main/graph1'
        const graphPath2 = '/main/graph2'
        if (pathName === mapPath) return 0
        else if (tablePath === pathName) return 1
        else if (graphPath1 === pathName) return 2
        else if (graphPath2 === pathName) return 3
        else return 0
    }

    return (
             <TabStrip selected={getSelectedTab(pathname)}
                  tabPosition={"right"} onSelect={handleSelect}
                  animation={false} style={{height: "100%", width: "100%"}}>
                <TabStripTab title="Map" contentClassName="Panel-body">
                    {children}
                </TabStripTab>
                <TabStripTab title="Table" contentClassName="Panel-body">
                    {children}
                </TabStripTab>
                <TabStripTab title="Reservior" contentClassName="Panel-body">
                    {children}
                </TabStripTab>
                <TabStripTab title="Gross" contentClassName="Panel-body">
                    {children}
                </TabStripTab>
            </TabStrip>
    ) 
}

export default ViewTabStrip