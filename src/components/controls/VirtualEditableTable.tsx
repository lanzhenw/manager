import React, { useEffect, useState } from "react";
import styled from "styled-components"
import {
    Grid,
    GridCellProps,
    GridColumn as Column,
    GridPageChangeEvent,
  } from "@progress/kendo-react-grid";
import useApp from '../../hooks/useApp';
import { groupByKey } from "../utils";
import CellRender from "./CellRenderer";
import { IData, IGeneric } from "../../types/common";

const Container = styled.div`
    height: calc(100% - 160px);
    margin: 0 auto;
    width: 100%;
`
const EDIT_FIELD = 'inEdit'

const FilterBar:React.FunctionComponent = () => {
    const appCtx = useApp()
    const wellData =  appCtx.getFilteredWells()
    
    const [skip, setSkip] = React.useState<number>(0);
    const [displayData, setDisplayData] = useState<IGeneric[]>([])

    useEffect(() => {
        const data = groupByKey(wellData, ['wellAPI', 'wellName'], 'Qo')
        setDisplayData(data.slice(skip, skip + 20))
    },[skip, wellData])

    const pageChange = (event: GridPageChangeEvent) => {
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
        <Container>
            <Grid
              style={{ height: "100%" }}
              rowHeight={40}
              data={displayData}
              pageSize={20}
              total={displayData.length}
              skip={skip}
              scrollable={"virtual"}
              onPageChange={pageChange}
            //   onItemChange={itemChange}
              cellRender={customCellRender}
              editField={EDIT_FIELD}
            >
                <Column field="wellAPI" title="Well API" width="150px" editable={false} />
                <Column field="wellName" title="Well Name" width="200px" />
            </Grid>
        </Container>
    )
}

export default FilterBar