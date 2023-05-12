import React, {useState, useEffect} from "react";
<<<<<<< Updated upstream:src/Components/Charts/DynamicData/DynamicData.js
import classes from "./DynamicData.module.css"
=======
import classes from "./InternetSpeed.module.scss";
>>>>>>> Stashed changes:src/Components/Charts/InternetSpeed/InternetSpeed.js
import ReactEcharts from "echarts-for-react";
import {InfluxDB, flux } from "@influxdata/influxdb-client";

// TODO: switch to secret on beta release
// TODO: switch to influxdb hostname instead of localhost (might require nginx configuration)
const INFLUX_URL = "http://localhost:8086";
const INFLUX_TOKEN = "admin-token";
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

const InternetSpeed = () => {
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
        tooltip: {
            trigger: "axis",
            formatter: function (params) {
                const now = new Date(params[0].value[0])
                return `${now.getDate()}/${now.getMonth()+1}  ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()} ${params[0].value[1]} mb/s`
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

<<<<<<< Updated upstream:src/Components/Charts/DynamicData/DynamicData.js
    return <ReactEcharts option={option} className={classes.DynamicData}/>
=======
    return (
        <div className={classes.InternetSpeed}>
            <h3>Internet Speed</h3>
            <FormControl>
                <div className={classes.Form}>
                    <DateTimePicker slotProps={{textField: {size: 'small', placeholder:'From'}}} value={from} onChange={(v) => setFrom(v)}/>
                    <DateTimePicker slotProps={{textField: {size: 'small', placeholder:'To'}}} value={to} onChange={(v) => setTo(v)}/>
                    <Button variant="contained" size={"small"}
                            onClick={() => fetchData(INFLUX_BUCKET, queryApi, setData, from, to)}>Submit</Button>
                </div>
            </FormControl>

            <ReactEcharts option={option} className={classes.DynamicData}/>
        </div>
    )
>>>>>>> Stashed changes:src/Components/Charts/InternetSpeed/InternetSpeed.js
};

export default InternetSpeed;