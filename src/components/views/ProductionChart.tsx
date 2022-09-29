import { useEffect, useMemo, useRef, useState } from 'react';
import Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"
import streamGraph from 'highcharts/modules/streamgraph';
import useApp from '../../hooks/useApp';
import { useSize } from '../../hooks/useSize';
import ViewTabStrip from '../TabStrip';
import { groupByKey, toMonthName } from '../utils';
import { TileLayout, TileLayoutItem } from '@progress/kendo-react-layout';
import ScrollContainer from '../ScrollContainer';

streamGraph(Highcharts)

type Series ={name: string, data: number[], color: string | Highcharts.GradientColorObject | Highcharts.PatternObject}

const Chart1 = () => {
    const appCtx = useApp()
    const wellData =  appCtx.aggregatedWellData


    const data = useMemo(() => {
        return groupByKey(wellData, ['reservoir','Date'],["Qo"]) as {reservoir: string, Date: string, Qo: number}[]
    }, [wellData])
     
    const initialSeries: Series[] = []
    const [series, setSeries] = useState<Series[]>(initialSeries)
    const [dateList, setDateList] = useState<string[]>([])

    useEffect(() => {
        if (data.length > 0) {
            const timeStamps = Array.from(new Set((data.map(x => (new Date(x.Date)).getTime())))) // get unique timestamp
            const dateList = timeStamps.sort((a,b) => a - b).map(y => {
                                const d = new Date(y)
                                const mm = d.getUTCMonth() + 1 > 9 ? d.getUTCMonth() + 1 : '0' + (d.getUTCMonth() + 1)
                                const dd = d.getUTCDate() + 1 > 9 ? d.getUTCDate() : '0' + d.getUTCDate()
                                return `${d.getUTCFullYear()}-${mm}-${dd}`
                                
                            })
            const r = new Set(data.map(x => x.reservoir))
            const series = Array.from(r).map((x, idx) => ({
                name: x,
                data: new Array(dateList.length).fill(0),
                color: idx == 2 ? '#fcff33' : colors[idx+4]
            }))
            data.forEach(d => {
                const seriesIdx = series.findIndex(x => x.name === d.reservoir)
                const dataIdx = dateList.findIndex(x => x === d.Date)
                series[seriesIdx].data[dataIdx] = d.Qo
            })
            setSeries(series)
            setDateList(dateList)
        }
    }, [data])

    const timeline = dateList.map(d => {
        const [yyyy, mm, dd] = d.split('-')
        return `${yyyy} ${toMonthName(parseInt(mm))}`
    })
    
    const colors = Highcharts.getOptions().colors!
    const options = {
        chart: {
            type: 'streamgraph',
            marginBottom: 30,
            zoomType: 'x'
        },
        title: {
            floating: true,
            align: 'left',
            text: 'Monthly Oil Production '
        },
        subtitle: {
            floating: true,
            align: 'left',
            y: 30,
            text: "by Reservior",
        },
        tooltip: {
            shared: true,
            valueDecimals: 2,
            valueSuffix: " (barrels)",
            
        },
        xAxis: {
            maxPadding: 0,
            type: 'category',
            crosshair: true,
            categories: timeline,
            labels: {
                align: 'left',
                reserveSpace: false,
                rotation: 270
            },
            lineWidth: 0,
            margin: 20,
            tickWidth: 0
        },
    
        yAxis: {
            visible: false,
            startOnTick: false,
            endOnTick: false
        },
    
        legend: {
            enabled: false
        },
    
        plotOptions: {
            series: {
                label: {
                    minFontSize: 5,
                    maxFontSize: 15,
                    style: {
                        color: 'rgba(255,255,255,0.75)'
                    }
                },
                accessibility: {
                    exposeAsGroupOnly: true
                }
            }
        },
    
        series: series,
        exporting: {
            sourceWidth: 800,
            sourceHeight: 600
        }
    }

    
    const Chart = () => {
        const contentRef = useRef<HTMLDivElement | null>(null)
        const chartRef = useRef<any>(null)
        const size = useSize(contentRef)

        useEffect(() => {
            if(chartRef.current) {
                chartRef.current.chart.reflow()
            }
        }, [size])
        return (<div style={{ width: "100%", height: "100%", marginBottom: "0", backgroundColor: "white" }} 
           ref={contentRef}
           >
            <HighchartsReact
                ref={chartRef}
                containerProps={{ style: { height: `${size ? size.height : 0}px`, width: `${size ? size.width : 0}px` } }}
                highcharts={Highcharts}
                options={options}
            />
        </div>)
    }


    const TileList: Array<TileLayoutItem> = [
        {
            defaultPosition: {col: 1, row: 1, colSpan: 12, rowSpan: 3},
            item: <Chart/>,
            resizable: false,
            reorderable: false,
        }
    ]

    return (
        <ViewTabStrip tab={2}>
             <div style={{display: "flex", width: "100%", height: "100%"}}>
                <ScrollContainer>
                    <TileLayout
                        columns={12}
                        columnWidth={240}
                        rowHeight={200}
                        autoFlow={"row dense"}
                        gap={{rows: 10, columns: 10}}
                        items={TileList}
                        dataItemKey={"id"}
                    />
                </ScrollContainer>
            </div>
        </ViewTabStrip>
    )
}

export default Chart1