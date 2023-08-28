import React, {useState, useEffect} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Button, Input, MenuItem, Select, FormControl} from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import axios from "axios";
import classes from "./Alerts.module.scss";

const Alerts = () => {
    const [alerts, setAlerts] = useState([]);
    const [firedAlerts, setFiredAlerts] = useState([]);
    const [selectedType, setSelectedType] = useState();
    const [usageAmount, setUsageAmount] = useState();
    const [usageMeasurement, setUsageMeasurement] = useState();
    const [accessApp, setAccessApp] = useState();

    useEffect(() => {
        const getAllAlerts = async () => {
            const newAlerts = await getAlerts();
            const newFiredAlerts = await getFiredAlerts();

            setAlerts(newAlerts.reverse());
            setFiredAlerts(newFiredAlerts.reverse());
        }
        getAllAlerts();
        const interval = setInterval(()=>getAllAlerts(), 15000);
        return () =>{
            clearInterval(interval);
        }
    }, [])


    const resolveAlert = async (index) => {
        const res = await axios.post("http://localhost:5000/resolve-alert", {"alert_id": firedAlerts[index]["_id"]["$oid"]})
        if(res.status === 200) {
            const newFiredAlerts = [...firedAlerts];
            newFiredAlerts[index].fired = false;
            setFiredAlerts(newFiredAlerts);
        }
    }

    const addAlert = async () =>{
        let property;
        if(selectedType === "New Enpoint")
            property = "-";
        else if (selectedType === "Usage Alert"){
            property = usageAmount + usageMeasurement;
        } else if(selectedType === "Access Alert")
            property = accessApp;
        const newAlert = {
            type: selectedType,
            property: property,
            fired: false
        }
        const res = await axios.post("http://localhost:5000/add-alert", {...newAlert})
        if(res.status === 200) {
            const newAlerts = [...alerts];
            newAlerts.push(newAlert);
            setAlerts(newAlerts);
        }
    }

    const getAlerts = async()=>{
        const res = await axios.get("http://localhost:5000/get-alerts");
        if(res.status === 200){
            return res.data;
        }
    }
    const getFiredAlerts = async()=>{
        const res = await axios.get("http://localhost:5000/get-fired-alerts");
        if(res.status === 200){
            return res.data;
        }
    }


    return (

        <div className={classes.FiredAlerts}>
            <h3>Fired Alerts</h3>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Type</TableCell>
                            <TableCell align="left">Property</TableCell>
                            <TableCell align="left">Value</TableCell>
                            <TableCell align="left">Time</TableCell>
                            <TableCell align="left">Resolve</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {firedAlerts.map((alert, i) => (
                            <TableRow
                                key={alert.type + i}
                                sx={{
                                    '&:last-child td, &:last-child th': {border: 0},
                                    backgroundColor: alert.fired ? "#FB4B4E" : "white"
                                }}
                            >
                                <TableCell component="th" scope="row">
                                    {alert.type}
                                </TableCell>
                                <TableCell align="left">{alert.property}</TableCell>
                                <TableCell align="left">{alert.value}</TableCell>
                                <TableCell align="left">{alert.time}</TableCell>
                                <TableCell align="left">
                                    {alert.fired && <Button className={classes.ResolveAlert}
                                    onClick={() => resolveAlert(i)}><VisibilityOffIcon/></Button>}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <h3 className={classes.Alerts}>Alerts</h3>
            <TableContainer className={classes.AlertsTable} component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Type</TableCell>
                            <TableCell align="left">Property</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow key={"New Alert"}>
                            <TableCell>
                                <Select onChange={(e)=> setSelectedType(e.target.value)} sx={{minWidth: 150, height: 40}}>
                                    <MenuItem value={"New Enpoint"}>New Endpoint</MenuItem>
                                    <MenuItem value={"Usage Alert"}>Usage Alert</MenuItem>
                                    <MenuItem value={"Access Alert"}>Access Alert</MenuItem>
                                </Select>
                            </TableCell>
                            <TableCell>
                                {selectedType == "Usage Alert" &&
                                    <><Input onChange={(e) => setUsageAmount(e.target.value)} type={"number"} sx={{width: 50, height: 40}}/>
                                        <Select onChange={(e)=> setUsageMeasurement(e.target.value)} sx={{minWidth: 70, height: 40}}>
                                            <MenuItem value={"Gb"}>Gb</MenuItem>
                                            <MenuItem value={"Mb"}>Mb</MenuItem>
                                            <MenuItem value={"Kb"}>Kb</MenuItem>
                                        </Select></>}
                                {selectedType == "Access Alert" &&
                                    <Select onChange={(e)=>setAccessApp(e.target.value)} sx={{minWidth: 70, height: 40}}>
                                        <MenuItem value={"TikTok"}>TikTok</MenuItem>
                                        <MenuItem value={"Instagram"}>Instagram</MenuItem>
                                        <MenuItem value={"Facebook"}>Facebook</MenuItem>
                                    </Select>}
                            </TableCell>
                            <TableCell>
                                <Button onClick={addAlert}><AddCircleOutlineIcon/></Button>
                            </TableCell>
                        </TableRow>
                        {alerts.map((alert, i) => (
                            <TableRow
                                key={alert.type + i}
                                sx={{
                                    '&:last-child td, &:last-child th': {border: 0},
                                }}
                            >
                                <TableCell component="th" scope="row">
                                    {alert.type}
                                </TableCell>
                                <TableCell align="left">{alert.property}</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default Alerts;