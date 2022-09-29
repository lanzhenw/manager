import { useEffect, useMemo, useRef } from 'react';
import Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"

import useApp from '../../hooks/useApp';
import { useSize } from '../../hooks/useSize';
import ViewTabStrip from '../TabStrip';
import { groupByKey } from '../utils';
import { TileLayout, TileLayoutItem } from '@progress/kendo-react-layout';
import ScrollContainer from '../ScrollContainer';

const Chart2 = () => {

    const appCtx = useApp()
   
    const wellData =  appCtx.aggregatedWellData

    const data = useMemo(() => {
        const aggregated =  groupByKey(wellData, ['Date'], ["Qo", "Qg", "Qw"]) as {reservoir: string, Date: string, Qo: number, Qg: number, Qw: number}[]
        return aggregated.sort((a, b) => (new Date(a.Date).getTime()) - (new Date(b.Date).getTime()))
    }, [wellData])
    console.info("data", data)
    
    const options = {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            zoomType: "xy"
        },
        title: {
            text: 'Aggregated Gross Production',
            visible: false,
        },
    
        accessibility: {
            point: {
                valueSuffix: ''
            }
        },
        xAxis: [{
            type: 'datetime',
            labels: {
                format: '{value:%Y-%m}'
            }
          }],
        yAxis: [{ // Primary yAxis
            labels: {
              format: '{value}',
              style: {
                color: "#795c5f"
              },
              formatter: function (): string {
                // @ts-ignore
                const value = this.value
                return Highcharts.numberFormat(value, 0, ".", ",")
            }
            },
            title: {
              text: 'Oil and Gas Production (BOE)',
              style: {
                color: "#795c5f"
              }
            }
          }, { // Secondary yAxis
            title: {
              text: 'Water Production (mscf)',
              style: {
                color: "#795c5f"
              }
            },
            labels: {
              format: '{value}',
              style: {
                color: "#795c5f"
              },
              formatter: function (): string {
                // @ts-ignore
                const value = this.value
                return Highcharts.numberFormat(value, 0, ".", ",")
            }
            },
            opposite: true
          }
        ],
        tooltip: {
            shared: true,
          },
        legend: {
            layout: 'horizontal',
            align: 'right',
            x: -150,
            verticalAlign: 'top',
            y: 20,
            floating: true,
            backgroundColor:
              Highcharts?.defaultOptions?.legend?.backgroundColor ?? // theme
              'rgba(255,255,255,0.25)'
          },
        plotOptions: {
            series: {
                marker: {
                    enabled: false,
                }
            },
            area: {
                stacking: 'normal',
                lineColor: '#666666',
                lineWidth: 1,

            }
        },
        series: [
            {
                name: "Crude Oil Production",
                type: 'area',
                yAxis: 0,
                data: data.map(x => [(new Date(x.Date)).getTime(),
                     Number(x.Qo)] ),
                tooltip: {
                    valueDecimals: 2,
                    valueSuffix: ' (BBL)'
                },
                color: '#4C9A32'
            },
            {
                name: "Gas Production",
                type: 'area',
                yAxis: 0,
                data: data.map(x => [(new Date(x.Date)).getTime(),
                     Number(x.Qg/6)] ),
                tooltip: {
                        valueDecimals: 2,
                        valueSuffix: ' (BOE)'
                    },
                color: '#CD5334'
            },
            {
                name: 'Water Production',
                type: 'spline',
                yAxis: 1,
                data: data.map(x => [(new Date(x.Date)).getTime(), Number(x.Qw)]),
                tooltip: {
                    valueDecimals: 2,
                    valueSuffix: ' (MSCF)'
                },
                color: '#2C497F'
            },
        ]
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
        <ViewTabStrip tab={3}>
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

export default Chart2