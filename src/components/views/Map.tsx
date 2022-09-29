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
    const wellData =  appCtx.mapData

    const initialViewState = {
        latitude: -33.17872233,
        longitude: 21.22032089,
        zoom: 12,
       
    }

    const [viewState, setViewState] = React.useState(initialViewState)
    const [showPopup, setShowPopup] = React.useState(true)
    const [selectedWell, setSelectedWell] = useState<CompletionData|undefined>(undefined)


    const getColor = (reservior: string) => {
        switch (reservior.toLowerCase()) {
            case "red":
                return "rgba(99, 105, 227, 0.5)" // purple
            case "bisque":
                return "rgba(239, 67, 107, 0.7)" // pink
            case "rock":
                return "rgba(252, 255, 51, 0.9)" // yellow
            case "maine":
                return "rgba(4, 163, 149, 0.7)" // green
            default:  
                return "orange"
        }
    }
    
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
                    style={{backgroundColor: getColor(well.reservoir), borderWidth: '0px', padding: "3px 6px"}}
                    outlined={false}
                />
            </Marker>
        ))
    }, [wellData])

    console.info(selectedWell)

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