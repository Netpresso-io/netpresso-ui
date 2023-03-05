import React from 'react';
import  "./Layout.module.css"
import classes from "./Layout.module.css";
import Navbar from "../../Components/Navigation/Navbar/Navbar";
import DynamicData from "../../Components/Charts/DynamicData/DynamicData";

const Layout = () => {
    return (
        <div className={classes.Layout}>
            <Navbar/>
            <DynamicData/>
        </div>
    );
};

export default Layout;