import React, {lazy} from "react"
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom"
import './App.scss';
import Chart2 from "./components/views/GrossChart";
import Map from "./components/views/Map";
import Chart1 from "./components/views/ProductionChart";
import Table from "./components/views/Table";
import Main from "./pages/Main";

const App = () => {

  return (
    <BrowserRouter>
            <Routes>
              <Route path={"/"}  element={<Navigate to={'/main'} />} />
              <Route path="/index.html" element={<Navigate to={"/"}/>}/>
              <Route path={"main"} element={<Main/>}>
                <Route index element={<Map/>} />
                        <Route path="map" element={<Map/>}/>
                        <Route path={"table"} element={<Table />}/>
                        <Route path={"graph1"} element={<Chart1/>}/>
                        <Route path={"graph2"} element={<Chart2/>}/>
              </Route>
            </Routes>
    </BrowserRouter>
  );
}

export default App;
