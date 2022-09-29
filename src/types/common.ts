
export type AppInternalState = {
    selectedWells: string[]
    productionData: ProductionData[]
    completionData: CompletionData[]
    aggregatedWellData: IData[]
    mapData: CompletionData[]
    initialData: IData[]
    filter: Filter
}

export type AppCtx = AppInternalState & {
    setFilter: (filter: Filter) => void
    // getFilteredWells: () => IData[] 
    // getCompletionData: () => CompletionData[]
    // getRawData: () => IData[]
    editWellName: (wellApi: string, newName: string | undefined) => void
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
    BHP: string // bottom hole pressure
    Qo: string // oil quantity
    Qw: string // water quantity
    Qg: string // gas quantity
    Qs: string
    CompL: string
    FlowDays: string 
    Pressure: string
    Status: string// 1 for completed
}


export type CompletionData = {
    wellName: string
    wellAPI: string
    boreID: string
    compSubId: string
    Type: string 
    X: string 
    Y: string 
    TD: string 
    isHorizontal: string // 0 for horizontal
    reservoir: string
    faultBlock: string | null
    compartment: string | null
    maxBHP: string 
    long: string
    lat:string
}

export interface IData extends ProductionData {
    wellName: string
    Type: string 
    X: string 
    Y: string 
    TD: string
    isHorizontal: string 
    reservoir: string
    faultBlock: string | null
    compartment: string | null
    maxBHP: string 
    long: string
    lat: string
    Date: string
}

export type Filter = {
    well: string[]
    reservoir : string[]
    type: string[]
}