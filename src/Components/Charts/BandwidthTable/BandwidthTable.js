import React, {useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import classes from "./BandwidthTable.module.scss";
import ProgressBar from 'react-bootstrap/ProgressBar';
import axios from "axios";

const BandwidthTable = () => {
    let overallDownload = 0;
    let overallUpload = 0;
    const [data, setData] = useState([])
    useEffect(() => {
        axios.get("http://localhost:5000/bandwidth-usage", {params: {file_name: "test.pcap"}})
            .then((res) => {
                const newData = Array(res.data).map(el=>{
                    const curIP = Object.keys(el)[0];
                    return {
                        ip: curIP,
                        download: el[curIP]["download_speed"],
                        upload: el[curIP]["upload_speed"]
                    }
                })
                setData(newData);
            }).catch(err => console.log(err))
    },[overallDownload, overallUpload])

    overallDownload = data.reduce((sum, cur) => sum+cur.download, 0);
    overallUpload = data.reduce((sum, cur) => sum+cur.upload, 0);

    return (
        <div className={classes.BandwidthTable}>
            <h3>Bandwidth Usage</h3>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Endpoint</TableCell>
                            <TableCell align="left">Download</TableCell>
                            <TableCell align="left">Upload</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((el) => (
                            <TableRow
                                key={el.ip}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell component="th" scope="row">
                                    {el.ip}
                                </TableCell>
                                <TableCell align="left"><ProgressBar now={el.download*100/overallDownload} label={(el.download).toFixed(1)+"Kb/s"}/></TableCell>
                                <TableCell align="left"><ProgressBar now={el.upload*100/overallUpload} label={(el.upload).toFixed(1)+"Kb/s"}/></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default BandwidthTable;