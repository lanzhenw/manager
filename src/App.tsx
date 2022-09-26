import React, {lazy} from "react"
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom"
import './App.scss';
import Main from "./pages/Main";

const App = () => {

  return (
    <BrowserRouter>
            <Routes>
              <Route path={"/"} element={<Main/>}/>
              <Route path="/index.html" element={<Navigate to={"/"}/>}/>
              <Route path={"main"} element={<Main/>}>
                        {/* <Route path={"map"} element={<<Map/>}/> */}
                        {/* <Route path={"table"} element={<Table/>}/> */}
                        {/* <Route path={"chart"} element={<Graph1/>}/> */}
              </Route>
            </Routes>
    </BrowserRouter>
  );
}

export default App;
