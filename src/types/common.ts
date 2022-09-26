
export type AppInternalState = {
    selectedWells: string[]
    productionData: ProductionData[]
    completionData: CompletionData[]
    aggregatedWellData: IGeneric[]
    filter: string | undefined
}

export type AppCtx = AppInternalState & {
    setFilter: (word: string) => void
    getFilteredWells: () => void 
    editWellName: (wellApi: string, newName: string) => void
}

export interface IGeneric {
    [key: string]: any
}

export type ProductionData = {
    Year: string 
    Month: string 
    wellAPI: string
    boreID: string
    compSubId: string
    BHP: number // bottom hole pressure
    Qo: number // oil quantity
    Qw: number // water quantity
    Qg: number // gas quantity
    Qs: number
    CompL: number
    FlowDays: number 
    Pressure: number
    Status: number// 1 for completed
}


export type CompletionData = {
    wellName: string
    wellAPI: string
    boreID: string
    compSubId: string
    Type: string 
    X: number // bottom hole pressure
    Y: number // oil quantity
    TD: string // water quantity
    isHorizontal: number // 0 for horizontal
    reservoir: string
    faultBlock: string | null
    compartment: string | null
    maxBHP: number 
    long: number
    lat:number
}

export interface IData extends ProductionData {
    wellName: string
    Type: string 
    X: number // bottom hole pressure
    Y: number // oil quantity
    TD: string // water quantity
    isHorizontal: number // 0 for horizontal
    reservoir: string
    faultBlock: string | null
    compartment: string | null
    maxBHP: number 
    long: number
    lat:number
}