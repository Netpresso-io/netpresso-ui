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
    const [bandwidth, setData] = useState([])
    useEffect(() => {
        axios.get("http://localhost:5000/bandwidth-usage", {params: {file_name: "bigFlows.pcap", packet_amount: 200000}})
            .then((res) => {
                console.log(res)
                const newData = []
                for (const el in res.data){
                    const curIP = el;
                    newData.push({
                        ip: curIP,
                        download: res.data[el]["download_speed"],
                        upload: res.data[el]["upload_speed"]})
                }
                setData(newData);
            }).catch(err => console.log(err))
    }, [])

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
                        {bandwidth.map((el) => (
                            <TableRow
                                key={el.ip}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell component="th" scope="row">
                                    {el.ip}
                                </TableCell>
                                <TableCell align="left"><ProgressBar now={100}
                                                                     label={(el.download).toFixed(1) + "Kb/s"}/></TableCell>
                                <TableCell align="left"><ProgressBar now={100}
                                                                     label={(el.upload).toFixed(1) + "Kb/s"}/></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default BandwidthTable;