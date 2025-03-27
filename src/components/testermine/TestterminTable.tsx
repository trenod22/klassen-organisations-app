import React, { useState, useEffect } from 'react';
import Testtermin from "./Testtermin";
import "./TestterminTable.css";

type TestterminData = {
    fach: string;
    datum: Date;
    stoff: string;
};


//bearbeiten funktioniert erst nach einmaligem reloaden

const localStorageKey = "testtermine";

const loadFromLocalStorage = (): TestterminData[] => {
    const data = localStorage.getItem(localStorageKey);
    if (data) {
        const parsedData = JSON.parse(data).map((item: any) => ({ ...item, datum: new Date(item.datum) }));
        return parsedData.length > 0
            //@ts-ignore
            ? parsedData.sort((a, b) => a.datum.getTime() - b.datum.getTime())
            : initialTesttermine;
    }

    return initialTesttermine.sort((a, b) => a.datum.getTime() - b.datum.getTime());
};

const initialTesttermine: TestterminData[] = [
    { fach: "AM", datum: new Date(2025, 2, 25, 10, 45), stoff: "Vectoren" },
    { fach: "E1", datum: new Date(2025, 2, 27, 13, 15), stoff: "Leaflet" },
    { fach: "POS1", datum: new Date(2025, 3, 3, 10, 45), stoff: "Threads, Producer-Consumer Problem" },
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
    today.setHours(0, 0, 0, 0);
    const testDateOnly = new Date(testDate);
    testDateOnly.setHours(0, 0, 0, 0);

    const timeDiff = testDateOnly.getTime() - today.getTime();
    return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
};

const TestterminTable: React.FC = () => {
    const [testtermine, setTesttermine] = useState<TestterminData[]>(loadFromLocalStorage());
    const [newFach, setNewFach] = useState("");
    const [newDatum, setNewDatum] = useState("");
    const [newStoff, setNewStoff] = useState("");
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        localStorage.setItem(localStorageKey, JSON.stringify(testtermine));
    }, [testtermine]);

    const resetLocalStorage = () => {
        localStorage.removeItem(localStorageKey);
        setTesttermine([]);
        setTimeout(() => {
            setTesttermine([...initialTesttermine]);
        }, 0);
    };

    const addTesttermin = () => {
        if (!newFach || !newDatum || !newStoff) return;

        const parsedDate = new Date(newDatum);
        if (isNaN(parsedDate.getTime())) return;

        const newEntry = { fach: newFach, datum: parsedDate, stoff: newStoff };

        setTesttermine((prevTests) => {
            const updatedTests = [...prevTests, newEntry];
            updatedTests.sort((a, b) => a.datum.getTime() - b.datum.getTime());

            // Speichern im localStorage als Array von Objekten, die das Datum als Date-Objekt enthalten
            localStorage.setItem(localStorageKey, JSON.stringify(updatedTests));

            return updatedTests;
        });

        setNewFach("");
        setNewDatum("");
        setNewStoff("");
    };




    const deleteTesttermin = (index: number) => {
        const updatedList = testtermine.filter((_, i) => i !== index);
        setTesttermine(updatedList);
    };

    const editTesttermin = (index: number, updatedTest: TestterminData) => {
        setTesttermine((prevTests) => {

            const updatedList = prevTests.map((test, i) =>
                i === index ? { ...test, fach: updatedTest.fach, datum: updatedTest.datum, stoff: updatedTest.stoff } : test
            );

            // Sofortiger Setzen der neuen Werte
            localStorage.setItem(localStorageKey, JSON.stringify(updatedList));

            // Sortieren nach der Aktualisierung
            updatedList.sort((a, b) => a.datum.getTime() - b.datum.getTime());

            return updatedList;
        });
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
                    .filter(test => showAll || calculateDaysRemaining(test.datum) <= 10 && calculateDaysRemaining(test.datum) >= -2)
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
            <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
                <button onClick={() => setShowAll(!showAll)}>
                    {showAll ? "Nur Nächste 10 Tage" : "Alle Anzeigen"}
                </button>
                <button onClick={resetLocalStorage}>Reset Local Storage</button>
            </div>
        </div>
    );
};

export default TestterminTable;
