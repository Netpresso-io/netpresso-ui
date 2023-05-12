import Layout from "./Layout/Layout"
<<<<<<< Updated upstream
function App() {
  return (
    <div className="App">
      <Layout/>
=======
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
>>>>>>> Stashed changes
    </div>
  );
}

export default App;
