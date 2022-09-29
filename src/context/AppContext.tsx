import {createContext, ReactNode, useEffect, useState} from "react";
import { readRemoteFile } from 'react-papaparse';
import { ParseResult } from "papaparse";
import { AppCtx, AppInternalState, CompletionData, Filter, ProductionData } from "../types/common";
import { useDynamicCallback } from "../components/utils";


type TachAppProviderProps = {
    children: ReactNode
}

const COMPLETIONFILEURL = '/data/completions.csv'
const PRODUCTIONFILEURL = '/data/production.csv'

export const AppContext = createContext<AppCtx | null>(null)
export const AppProvider = ({children}: TachAppProviderProps) => {

    const [state, setState] = useState<AppInternalState>({
        selectedWells: [],
        productionData: [],
        completionData: [],
        aggregatedWellData: [],
        initialData: [],
        mapData: [],
        filter: {well: [], reservoir: [], type: []}
    })

    useEffect(() => {
        loadInitialData()
    }, [COMPLETIONFILEURL,PRODUCTIONFILEURL])

    useEffect(() => {
       // generate the rawData from the production file and completion file
        const data = state.productionData.map(d => {
            const Date = d.Year + '-' + `${('0' + parseInt(d.Month)).slice(-2)}` + '-' + '01'
            const completionInfo = state.completionData.find(y => y.wellAPI === d.wellAPI)
            if (completionInfo) {
                return {...d, ...completionInfo, Date}
            } else {
                console.warn("cannot find well" + d.wellAPI + "in the completion file")
                return {...d, Date, wellName: '', Type: '', X: '0', Y: '0', TD: "", isHorizontal: '0', reservoir: 'missing', faultBlock: '', compartment: '', maxBHP:'0', long: '0', lat: '0'}
            }
        }) 
        setState(s => ({...s, aggregatedWellData: data, initialData: data, mapData: state.completionData}))
    }, [state.productionData, state.completionData])

    useEffect(() => {
        const {well, reservoir, type} = state.filter 
        const aggregatedWellData = state.initialData.filter(x => (well.length == 0 || well.includes(x.wellName)) && (reservoir.length === 0 || reservoir.includes(x.reservoir)) && (type.length === 0 || type.includes(x.Type)))
        const mapData = state.completionData.filter(x => (well.length == 0 || well.includes(x.wellName)) && (reservoir.length === 0 || reservoir.includes(x.reservoir)) && (type.length === 0 || type.includes(x.Type)))
        setState(s => ({...s, aggregatedWellData, mapData}))
    }, [state.filter])

    const loadInitialData = useDynamicCallback(() => {
        readRemoteFile(PRODUCTIONFILEURL, {
            complete: (results:ParseResult<ProductionData>) => {
                setState(s => ({...s, productionData: results.data}))
            },
            download: true,
            header: true
       })
       readRemoteFile(COMPLETIONFILEURL, {
            complete: (results:ParseResult<CompletionData>) => {
                setState(s => ({...s, completionData: results.data}))
            },
            download: true,
            header: true
       })
    })

    const setFilter = (filter: Filter) => {
        setState(s => ({...s, filter: filter}))
    }

    const editWellName = (wellApi: string, newName: string | undefined) => {
        if (newName) {
            const newData = [...state.aggregatedWellData].map(x => {
                if (x.wellAPI === wellApi) {
                    x.wellName = newName
                    return x
                } else return x
            })
            setState(s => ({...s, aggregatedWellData: newData}))
        }
    }

    return (
        <AppContext.Provider value={{
           selectedWells: state.selectedWells,
           productionData: state.productionData,
           completionData: state.completionData,
           mapData: state.mapData,
           aggregatedWellData: state.aggregatedWellData,
           initialData: state.initialData,
           filter: {well: [], reservoir: [], type: []},
           setFilter: setFilter, 
           editWellName: editWellName
        }}>
            {children}
        </AppContext.Provider>
    )
}
