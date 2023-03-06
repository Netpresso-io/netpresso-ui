import React, {useState, useEffect} from "react";
import classes from "./DynamicData.module.css"
import ReactEcharts from "echarts-for-react";
import {InfluxDB, flux } from "@influxdata/influxdb-client";

// TODO: switch to secret on beta release
const INFLUX_URL = "http://localhost:8086";
const INFLUX_TOKEN = "vf3gPF12x61goLdqEXVOjNvxF8o_foJ4n8iLG0xP7sMuoi9Sy0GArPHvLJ1ystJcZK2y2FKb8A313voVC1EqCQ==";
const INFLUX_ORG = "Netpresso";
const INFLUX_BUCKET = "speed-test-metrics";

const UPDATE_INTERVAL = 3000 // 3 seconds

const fetchData = (bucket, queryApi, setData) => {
    const newData = []
    const query = flux`from(bucket: "${bucket}") 
                                |> range(start: -7d)
                                |> filter(fn: (r) => r._measurement == "speed-test")`
    queryApi.queryRows(query, {
        next(row, tableMeta) {
            const o = tableMeta.toObject(row)
            const newEntry = [o._time, o._value]
            newData.push(newEntry)
        },
        error(error) {
            console.error(error)
            console.log('Finished ERROR')
        },
        complete() {
            setData(newData);
            console.log('Finished SUCCESS')
        }})
}

const DynamicData = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        const client = new InfluxDB({url: INFLUX_URL, token: INFLUX_TOKEN})
        const queryApi = client.getQueryApi(INFLUX_ORG)

        const interval = setInterval(() => {
            fetchData(INFLUX_BUCKET, queryApi, setData);
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