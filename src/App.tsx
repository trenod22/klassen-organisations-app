import MainSite from "./components/MainSite.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import Calendar from "./components/Calendar.js";
import {Level} from "./components/Level.js";
import TestterminTable from "./components/testermine/TestterminTable.js";
import {useEffect, useState} from "react";
import TimeTable from "./components/TimeTable/TimeTable";
import './app.css';

function App() {

    const [display, setDisplay] = useState<string>(() => localStorage.getItem("lastDisplay") || "TestterminTable");
    const [xp, setXp] = useState<number>(() => parseFloat(localStorage.getItem("xp")) || 0);

    const addXp = (toAdd: number) => {
        setXp(xp + toAdd);
    }

    useEffect(() => {
        localStorage.setItem("lastDisplay", display);
    }, [display]);

    return (
        <>
            <Level setDisplay={setDisplay} xp={xp}/>
            {display === "TestterminTable" && <TestterminTable addXp={addXp}/>}
            {display === "TimeTable" && <TimeTable />}
            {display === "Calendar" && <Calendar />}
            {display === "MainSite" && <MainSite />}
        </>
    );
}

export default App;