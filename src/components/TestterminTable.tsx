import React, { useState, useEffect } from 'react';
import Testtermin from "./Testtermin";

type TestterminData = {
    fach: string;
    datum: Date;
    stoff: string;
};

const localStorageKey = "testtermine";

const loadFromLocalStorage = (): TestterminData[] => {
    const data = localStorage.getItem(localStorageKey);
    if (data) {
        const parsedData = JSON.parse(data).map((item: any) => ({ ...item, datum: new Date(item.datum) }));
        return parsedData.length > 0 ? parsedData : initialTesttermine;
    }
    return initialTesttermine;
};

//Noch nicht löschen was man selbst gemacht hat, local storage reset noch und show all fürs nächste mal!!!

const initialTesttermine: TestterminData[] = [
    { fach: "AM", datum: new Date(2025, 2, 25, 10, 45), stoff: "Vectoren" },
    { fach: "E1", datum: new Date(2025, 2, 27, 13, 15), stoff: "Leaflet" },
    { fach: "POS1", datum: new Date(2025, 3, 3, 10, 45), stoff: "Threads" },
    { fach: "SYP1P", datum: new Date(2025, 3, 7, 8, 50), stoff: "???" },
    { fach: "DBI1U", datum: new Date(2025, 3, 9, 10, 45), stoff: "???" },
    { fach: "WMC_1U", datum: new Date(2025, 3, 23, 8, 0), stoff: "React" },
    { fach: "NWC2", datum: new Date(2025, 3, 25, 12, 25), stoff: "???" },
    { fach: "E1", datum: new Date(2025, 3, 28, 12, 25), stoff: "???" },
    { fach: "NWP2", datum: new Date(2025, 3, 29, 8, 50), stoff: "???" },
    { fach: "GES", datum: new Date(2025, 4, 6, 9, 40), stoff: "???" },
    { fach: "BWMR", datum: new Date(2025, 4, 8, 8, 0), stoff: "???" },
    { fach: "GEO", datum: new Date(2025, 4, 20, 11, 35), stoff: "???" },
    { fach: "WMC_1U", datum: new Date(2025, 4, 21, 8, 0), stoff: "???" },
    { fach: "NSCS_1", datum: new Date(2025, 4, 26, 9, 40), stoff: "???" },
    { fach: "AM", datum: new Date(2025, 4, 28, 9, 40), stoff: "???" },
    { fach: "DBI1U", datum: new Date(2025, 5, 4, 10, 45), stoff: "???" },
];

const calculateDaysRemaining = (testDate: Date) => {
    const today = new Date();
    const timeDiff = testDate.getTime() - today.getTime();
    return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
};

const TestterminTable: React.FC = () => {
    const [testtermine, setTesttermine] = useState<TestterminData[]>(loadFromLocalStorage());
    const [newFach, setNewFach] = useState("");
    const [newDatum, setNewDatum] = useState("");
    const [newStoff, setNewStoff] = useState("");

    useEffect(() => {
        localStorage.setItem(localStorageKey, JSON.stringify(testtermine));
    }, [testtermine]);

    const addTesttermin = () => {
        if (!newFach || !newDatum || !newStoff) return;
        const newEntry = { fach: newFach, datum: new Date(newDatum), stoff: newStoff };
        setTesttermine([...testtermine, newEntry]);
        setNewFach("");
        setNewDatum("");
        setNewStoff("");
    };

    const deleteTesttermin = (index: number) => {
        const updatedList = testtermine.filter((_, i) => i !== index);
        setTesttermine(updatedList);
    };

    const editTesttermin = (index: number, updatedTest: TestterminData) => {
        const updatedList = testtermine.map((test, i) => (i === index ? updatedTest : test));
        setTesttermine(updatedList);
    };

    return (
        <div className="container-fluid">
            <table className="table w-100">
                <thead>
                <tr>
                    <th>Fach</th>
                    <th>Datum</th>
                    <th>Stoff</th>
                    <th>Days Remaining</th>
                    <th>Aktionen</th>
                </tr>
                </thead>
                <tbody>
                {testtermine
                    .filter(test => calculateDaysRemaining(test.datum) <= 10)
                    .map((test, index) => (
                        <Testtermin
                            key={index}
                            datum={test.datum}
                            fach={test.fach}
                            stoff={test.stoff}
                            index={index}
                            days_remaining={calculateDaysRemaining(test.datum)}
                            onDelete={() => deleteTesttermin(index)}
                            onEdit={(updatedTest) => editTesttermin(index, updatedTest)}
                        />
                    ))}
                <tr>
                    <td><input type="text" value={newFach} onChange={(e) => setNewFach(e.target.value)} placeholder="Fach" /></td>
                    <td><input type="date" value={newDatum} onChange={(e) => setNewDatum(e.target.value)} /></td>
                    <td><input type="text" value={newStoff} onChange={(e) => setNewStoff(e.target.value)} placeholder="Stoff" /></td>
                    <td><button onClick={addTesttermin}>Hinzufügen</button></td>
                </tr>
                </tbody>
            </table>
        </div>
    );
};

export default TestterminTable;
