import Layout from "./Layout/Layout"
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

function App() {
  return (
    <div className="App">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Layout/>
        </LocalizationProvider>
    </div>
  );
}

export default App;
