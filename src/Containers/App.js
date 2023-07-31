import Layout from "./Layout/Layout"
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import Navbar from "../Components/Navigation/Navbar/Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import SideDrawer from "../Components/Navigation/SideDrawer/SideDrawer";

function App() {
  return (
    <div className="App">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Navbar/>
            <SideDrawer/>
            <Layout/>
        </LocalizationProvider>
    </div>
  );
}

export default App;
