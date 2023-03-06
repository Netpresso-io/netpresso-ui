import React, {useState, useEffect} from "react";
import classes from "./DynamicData.module.css"
import ReactEcharts from "echarts-for-react";

const UPDATE_INTERVAL = 1000 * 60 * 15 // 15 minutes

const DynamicData = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            console.log("Data fetched");
            const now = new Date();
            const newEntry = [now.getTime(), Math.floor(Math.random() * (100 + 1))]
            const newData = [...data]
            newData.push(newEntry)
            setData(newData);
        }
        const interval = setInterval(() => {
            fetchData();
        }, UPDATE_INTERVAL);

        return () => clearInterval(interval);
    });


    const option = {
        title: {
            text: "Internet Speed",
        },
        tooltip: {
            trigger: "axis",
            formatter: function (params) {
                const now = new Date(params[0].value[0])
                return `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()} ${params[0].value[1]} mb/s`
            },
        },
        xAxis: {
            type: "time",
            axisLabel: {
                formatter: (function (value) {
                    const now = new Date(value);
                    return `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
                })
            }
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