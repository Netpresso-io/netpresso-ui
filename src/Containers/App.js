import Layout from "./Layout/Layout"
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import Navbar from "../Components/Navigation/Navbar/Navbar";
import React from "react";

function App() {
  return (
    <div className="App">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Navbar/>
            <Layout/>
        </LocalizationProvider>
    </div>
  );
}

export default App;
