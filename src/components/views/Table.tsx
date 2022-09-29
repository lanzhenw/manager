import React, { useEffect, useState } from "react";
import styled from "styled-components"
import {
    Grid,
    GridColumn as Column,
    GridPageChangeEvent,
    GridSortChangeEvent
  } from "@progress/kendo-react-grid";
import { orderBy, SortDescriptor } from "@progress/kendo-data-query"
import ViewTabStrip from '../TabStrip';
import useApp from '../../hooks/useApp';
import { IData } from "../../types/common";

const Container = styled.div`
    height: 100%;
    margin: 0 auto;
    width: 100%;
`
const initialDataState: PageState = { skip: 0, take: 25 }

interface PageState {
    skip: number,
    take: number
}

const Table = () => {
    const appCtx = useApp()
    const wellData =  appCtx.getFilteredWells()

    const [page, setPage] = React.useState<PageState>(initialDataState)
    const [data, setData] = useState<IData[]>(wellData)
    const [sort, setSort] = React.useState<Array<SortDescriptor>>([
        { field: "wellName", dir: "desc" },
      ])
    
      const pageChange = (event: GridPageChangeEvent) => {
        setPage(event.page);
    }


    const sortChange = (event: GridSortChangeEvent) => {
    //   setData(getData(event.sort));
      setSort(event.sort);
    };

    const getData = (data: IData[], sort: SortDescriptor[]): IData[] => {
      return orderBy(data, sort);
    }

    useEffect(() => {
        const d = getData(wellData, sort)
        setData(d)
    }, [ sort, wellData])

    console.info('data', data, wellData)
   
    return (
        <ViewTabStrip tab={1}>
            <Container>
                <Grid
                    style={{ height: "100%" }}
                    rowHeight={30}
                    pageable
                    data={data.slice(page.skip, page.take + page.skip)}
                    skip={page.skip}
                    take={page.take}
                    pageSize={100}
                    total={data.length}
                    onPageChange={pageChange}
                    sort={sort}
                    sortable={{
                        allowUnsort: true,
                        mode: "multiple",
                    }}
                    onSortChange={sortChange}
                >
                    <Column field="Date" title="Date" width="120px" filterable={false}/>
                    <Column field="wellName" title="Well Name" width="150px" />
                    <Column field="reservoir" title="Reservoir" width="150px" />
                    <Column field="Type" title="Type" width="120px" filterable={false}/> 
                    <Column field="Qo" title="Oil Prod" width="120px" filterable={false}/>
                    <Column field="Qw" title="Water Prod" width="120px" filterable={false} />
                    <Column field="Qg" title="Gas Prod" width="120px" filterable={false}/> 
                    <Column field="Qs" title="Solid Prod" width="120px" filterable={false}/> 
                    <Column field="BHP" title="Bottom Hole Pressure" width="100px" filterable={false}/> 
                </Grid>
            </Container>
        </ViewTabStrip>
    )
}

export default Table