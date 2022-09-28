import React, { useEffect, useState } from "react";
import styled from "styled-components"
import {
    Grid,
    GridCellProps,
    GridColumn as Column,
    GridPageChangeEvent,
  } from "@progress/kendo-react-grid";
import ViewTabStrip from '../TabStrip';
import useApp from '../../hooks/useApp';

import { IData, IGeneric } from "../../types/common";
import CellRender from "../controls/CellRenderer";

const Container = styled.div`
    height: 100%;
    margin: 0 auto;
    width: 100%;
`
const EDIT_FIELD = 'inEdit'
const Table = () => {
    const appCtx = useApp()
    const wellData =  appCtx.getFilteredWells()
    
    const [skip, setSkip] = React.useState<number>(0);
    const [displayData, setDisplayData] = useState<IGeneric[]>([])

    useEffect(() => {
        const d = wellData.slice(0, 800)
        setDisplayData(d.slice(skip, skip + 30))
    },[skip, wellData])

    const pageChange = (event: GridPageChangeEvent) => {
        console.info(event.page.skip)
        setSkip(event.page.skip);
    }

    const customCellRender: any = (
        td: React.ReactElement<HTMLTableCellElement>,
        props: GridCellProps
      ) => (
        <CellRender
          originalProps={props}
          td={td}
          enterEdit={enterEdit}
          editField={EDIT_FIELD}
        />
    )

    const enterEdit = (dataItem: IData, field: string | undefined) => appCtx.editWellName(dataItem.wellAPI, field)
    
    return (
        <ViewTabStrip tab={1}>
            <Container>
                <Grid
                    style={{ height: "100%" }}
                    rowHeight={30}
                    data={wellData}
                    pageSize={30}
                    total={displayData.length}
                    skip={skip}
                    scrollable={"virtual"}
                    onPageChange={pageChange}
                    // onItemChange={itemChange}
                    // cellRender={customCellRender}
                    // editField={EDIT_FIELD}
                >
                    <Column field="wellName" title="Well Name" width="100px" />
                    <Column field="boreID" title="Bore" width="50px" />
                    <Column field="reservoir" title="Reservoir" width="70px" />
                    <Column field="Date" title="Date" width="70px" />
                    <Column field="Qo" title="Oil" width="100px" />
                    <Column field="Qw" title="Water" width="100px" />
                    <Column field="Qg" title="Gas" width="100px" /> 
                </Grid>
            </Container>
        </ViewTabStrip>
    )
}

export default Table