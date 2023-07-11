import React, {useEffect, useState} from 'react';
import classes from "./TopDNS.module.scss";
import axios from "axios";

import ReactEcharts from "echarts-for-react";

const TopDNS = () => {
    const [dns, setData] = useState([])
    useEffect(() => {
        axios.get("http://localhost:5000/top-dns", {params: {file_name: "bigFlows.pcap", packet_amount: 200000}})
            .then((res) => {
                let newData = [];
                res.data.forEach(el => newData.push({value: el[1], name: el[0]}));
                setData(newData);
            }).catch(err => console.log(err))
    }, [])
    const option = {
        legend: {
            top: 'bottom'
        },
        tooltip: {
            trigger: 'item'
        },
        series: [
            {
                name: 'Top DNS',
                type: 'pie',
                radius: '55%',
                center: ['50%', '50%'],
                animationType: 'scale',
                animationEasing: 'elasticOut',
                data: dns
            }
        ]
    }
    return (
        <div className={classes.TopDNS}>
            <h3>Top 5 Used Domains</h3>
            <ReactEcharts className={classes.PieChart} option={option}/>
        </div>
    );
};

export default TopDNS;