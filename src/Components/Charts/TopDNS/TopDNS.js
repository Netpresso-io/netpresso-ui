import React from 'react';
import classes from "./TopDNS.module.scss";

import ReactEcharts from "echarts-for-react";

const TopDNS = () => {
    const option={
        legend: {
            top: 'bottom'
        },
        series: [
            {
                name: 'Nightingale Chart',
                type: 'pie',
                radius: [25, 125],
                center: ['50%', '50%'],
                itemStyle: {
                    borderRadius: 8
                },
                data: [
                    { value: 40, name: 'Domain 1' },
                    { value: 30, name: 'Domain 2' },
                    { value: 20, name: 'Domain 3' },
                    { value: 10, name: 'Domain 4' },
                    { value: 3, name: 'Domain 5' },
                ]
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