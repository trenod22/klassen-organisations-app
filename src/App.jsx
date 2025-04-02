import MainSite from "./components/MainSite.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import TimeTable from "./components/TimeTable.js";
import {Card} from "react-bootstrap";
import Calendar from "./components/Calendar.js";

function App() {
  return (
      <>
          <MainSite/>
          <TimeTable/>
          <Calendar/>
      </>
  )
}

export default App
