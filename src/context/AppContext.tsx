import {createContext, ReactNode, useEffect, useState} from "react";
import { readRemoteFile } from 'react-papaparse';
import { ParseResult } from "papaparse";
import { AppCtx, AppInternalState, CompletionData, IGeneric, ProductionData } from "../types/common";
import { groupByKey, useDynamicCallback } from "../components/utils";

type TachAppProviderProps = {
    children: ReactNode
}

const COMPLETIONFILEURL = './data/completions.csv'
const PRODUCTIONFILEURL = './data/production.csv'

export const AppContext = createContext<AppCtx | null>(null)

export const AppProvider = ({children}: TachAppProviderProps) => {

    const [state, setState] = useState<AppInternalState>({
        selectedWells: [],
        productionData: [],
        completionData: [],
        aggregatedWellData: [],
        filter: undefined
    })

    useEffect(() => {
        loadInitialData()
    }, [COMPLETIONFILEURL,PRODUCTIONFILEURL])

    useEffect(() => {
       // generate the aggregatedWellData from the production file and completion file
        const data = state.productionData.map(d => {
            const Date = d.Year + '-' + `${('0' + parseInt(d.Month)).slice(-2)}` + '-' + '01'
            const completionInfo = state.completionData.find(y => y.wellAPI === d.wellAPI)
            if (completionInfo) {
                return {...d, ...completionInfo, Date}
            } else {
                console.error("cannot find well" + d.wellAPI + "in the completion file")
                return {...d, Date, wellName: '', Type: '', X: 0, Y: 0, TD: "", isHorizontal: 0, reservoir: '', faultBlock: '', compartment: '', maxBHP:0, long: 0, lat: 0}
            }
        }) 
        setState(s => ({...s, aggregatedWellData: data}))
        console.info(state.productionData, state.completionData, data)
    }, [state.productionData, state.completionData])

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

    const setFilter = (word: string) => {
        setState(s => ({...s, filter: word}))
    }

    const getFilteredWells = () => {
        if (state.filter && state.filter !== "") {
            return state.aggregatedWellData.filter(x => x.wellName.toLowerCase().includes(state.filter!.toLowerCase()))
        } else return state.aggregatedWellData
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
           selectedWells: [],
           productionData: [],
           completionData: [],
           aggregatedWellData: [],
           filter: undefined,
           setFilter: setFilter, 
           getFilteredWells: getFilteredWells,
           editWellName: editWellName
        }}>
            {children}
        </AppContext.Provider>
    )
}
