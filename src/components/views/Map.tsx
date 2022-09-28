import React, { useMemo, useState } from 'react';
import Map, { FullscreenControl, Marker, Popup, PopupEvent } from 'react-map-gl'
import {Button} from '@blueprintjs/core'
import useApp from '../../hooks/useApp';
import ViewTabStrip from '../TabStrip'
import { CompletionData } from '../../types/common';
import 'mapbox-gl/dist/mapbox-gl.css';


const TOKEN = 'pk.eyJ1IjoiZGFuaWVsMTAwMiIsImEiOiJja3hlZG94NDIxZG42MnZreXlwa2l4c2NlIn0.XfMCpu0oQnSo2l5yYdXheg'

const MapGL = () => {
    const appCtx = useApp()
    const wellData =  appCtx.getCompletionData()

    const initialViewState = {
        latitude: -33.17872233,
        longitude: 21.22032089,
        zoom: 12,
       
    }

    const [viewState, setViewState] = React.useState(initialViewState)
    const [showPopup, setShowPopup] = React.useState(true)
    const [selectedWell, setSelectedWell] = useState<CompletionData|undefined>(undefined)

    // const onClose = (ev:PopupEvent) => {
    //     setSelectedWell(undefined)
    // }
    const getColor = (wellType: string) => wellType === "Producer" ? "#90A959" : "#FA89B5"
    const markers = useMemo(() => {
       
        return wellData.map((well) => (
            <Marker
                key={well.wellName}
                latitude={parseFloat(well.lat)}
                longitude={parseFloat(well.long)}
            >
                <Button
                    className={well.Type === 'Producer' ? 'producer' : 'injector'}
                    icon={well.Type === 'Producer' ? 'oil-field' : 'tint'}
                    onClick={() => {
                        setSelectedWell(well)
                        setShowPopup(true)
                    }}
                    style={{backgroundColor: getColor(well.Type), color: "pink", borderWidth: '0px', padding: "3px 6px"}}
                    outlined={false}
                />
            </Marker>
        ))
    }, [wellData])

    return (
        <ViewTabStrip tab={0}>
            <Map
                {...viewState}
                mapboxAccessToken={TOKEN}
                onMove={evt => setViewState(evt.viewState)}
                mapStyle='mapbox://styles/mapbox/light-v10'
                style={{ width: 'calc(100vw - 190px)', height: 'calc(100vh - 65px)',}}
            >
                {markers}
                {/* {showPopup && selectedWell && (
                    <Popup
                        latitude={parseFloat(selectedWell.lat)}
                        longitude={parseFloat(selectedWell.long)}
                        // anchor='bottom'
                        style={{height: '100px', width: '400px'}}
                        onClose={() =>setShowPopup(false)}
                    >
                        <div>
                            <h4> Well Name: {selectedWell.wellName} </h4>
                            <p>  {selectedWell.Type} </p>
                            <p> Reservoir: {selectedWell.reservoir} </p>
                        </div>
                    </Popup>
                )} */}
                
            </Map>
        </ViewTabStrip>
    )
}

export default MapGL