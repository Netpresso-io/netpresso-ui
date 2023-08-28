import React, {useEffect, useState} from 'react';
import classes from "./TopDNS.module.scss";
import axios from "axios";

import ReactEcharts from "echarts-for-react";

const TopDNS = () => {
    const [dns, setData] = useState([])



    useEffect(() => {
        const getNewTopDNS = async () => {
            const newTopDNS = await getTopDNS();

            setData(newTopDNS);
        }
        getNewTopDNS();
        const interval = setInterval(()=>getNewTopDNS(), 15000);
        return () =>{
            clearInterval(interval);
        }
    }, [])

    const getTopDNS = async () => {
        const res = await axios.get("http://localhost:5000/top-dns");
        let newData = [];
        res.data.forEach(el => newData.push({value: el["amount"], name: el["domain"]}));
        return newData;
    }
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