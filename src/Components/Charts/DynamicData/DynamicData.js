import React, {useState, useEffect} from "react";
import classes from "./DynamicData.module.css"
import ReactEcharts from "echarts-for-react";


const DynamicData = () => {
    let data = [];
    const option = {
        title: {
            text: "Internet Speed",
        },
        tooltip: {
            trigger: "axis",
            formatter: function (params) {
                params = params[0]
                return params.value[0] + ": " + params.value[1] + " mb/s";
            },
        },
        xAxis: {
            type: "time",
        },
        yAxis: {
            type: "value",
            boundaryGap: [0, "100%"],
        },
        series: [
            {
                name: "Internet Speed",
                type: "line",
                data: data,
            }
        ]
    }

    return <ReactEcharts option={option} className={classes.DynamicData}/>
};

export default DynamicData;