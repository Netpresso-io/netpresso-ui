import React, {useEffect, useState} from 'react';
import  "./Layout.module.scss"
import classes from "./Layout.module.scss";
import InternetSpeed from "../../Components/Charts/InternetSpeed/InternetSpeed";
import TopDNS from "../../Components/Charts/TopDNS/TopDNS";
import BandwidthTable from "../../Components/Charts/BandwidthTable/BandwidthTable";
import Alerts from "../../Components/Charts/Alerts/Alerts";
import { Routes, Route } from 'react-router-dom';


const Layout = () => {
    return (
        <div className={classes.Layout}>
            <Routes>
                <Route path={"/"} element={<div>Home</div>}/>
                <Route path={"/speed"} element={<InternetSpeed/>}/>
                <Route path={"/topdns"} element={<TopDNS/>}/>
                <Route path={"/bandwidth"} element={<BandwidthTable/>}/>
                <Route path={"/alerts"} element={<Alerts/>}/>
            </Routes>
        </div>
    );
};

export default Layout;