import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import {Link} from "react-router-dom";
import classes from "./SideDrawer.module.scss";

const drawerWidth = 240;

export default function PermanentDrawerLeft() {
    const linksList = [
        {
            name: "Home",
            route: "/home"
        },
        {
            name: "Internet Speed",
            route: "/speed"
        },{
            name: "Top DNS",
            route: "/topdns"
        },{
            name: "Bandwidth Usage",
            route: "/bandwidth"
        },{
            name: "Alerts",
            route: "/alerts"
        },
    ]
    return (
        <Box sx={{display: 'flex'}} className={classes.SideDrawer}>
            <CssBaseline/>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    zIndex: 1,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="permanent"
                anchor="left"
            >
                <Toolbar/>
                <List>
                    {linksList.map((linkObj, index) => (
                        <ListItem key={linkObj.name} disablePadding>
                            <Link to={linkObj.route}>
                                <ListItemButton>
                                    <ListItemText primary={linkObj.name}/>
                                </ListItemButton>
                            </Link>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </Box>
    );
}