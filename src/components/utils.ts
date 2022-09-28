import {useCallback, useRef} from "react"
import { IGeneric } from "../types/common"

export function useDynamicCallback(callBack: any) {
    const ref = useRef()
    ref.current = callBack
    // @ts-ignore
    return useCallback((...args) => ref.current.apply(this, args), [])
}

export const groupByKey = (arr:IGeneric[], groupByKeys: string[], aggregateByKey: string) => {
    let grouped: IGeneric = {}
    const subSet = (o:IGeneric, keys:string[]) => Object.fromEntries(keys.map(k => [k, o[k]]))
    arr.forEach(o => {
      const values = groupByKeys.map(k => o[k]).join("|");

      if (grouped[values])
        grouped[values][aggregateByKey] = parseFloat(o[aggregateByKey]) + parseFloat( grouped[values][aggregateByKey])
      else
        grouped[values] = { ...subSet(o, groupByKeys), [aggregateByKey]: o[aggregateByKey] }
    })
  
    return Object.values(grouped);
}

export const toMonthName = (monthNumber: number) => {
  const date = new Date()
  date.setMonth(monthNumber - 1)

  return date.toLocaleString('en-US', {
    month: 'long',
  })
}