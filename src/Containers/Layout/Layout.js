import React from 'react';
import  "./Layout.module.scss"
import classes from "./Layout.module.scss";
import Navbar from "../../Components/Navigation/Navbar/Navbar";
import InternetSpeed from "../../Components/Charts/InternetSpeed/InternetSpeed";
import TopDNS from "../../Components/Charts/TopDNS/TopDNS";

const Layout = () => {
    return (
        <div className={classes.Layout}>
            <InternetSpeed/>
            <TopDNS/>
        </div>
    );
};

export default Layout;