import React, { useState, useEffect } from 'react';
import Testtermin from "./Testtermin";
import "./css/TestterminTable.css";
import { motion, AnimatePresence } from "framer-motion";
import "../../app.css"


type TestterminData = {
    fach: string;
    datum: Date;
    stoff: string;
};

interface TableProps {
    addXp: (xp:number) => void
}

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
    { fach: "AM", datum: new Date(2025, 2, 25), stoff: "Vectoren" },
    { fach: "E1", datum: new Date(2025, 2, 27), stoff: "Leaflet" },
    { fach: "POS1", datum: new Date(2025, 3, 3), stoff: "Threads, Producer-Consumer Problem" },
    { fach: "SYP1P", datum: new Date(2025, 3, 7), stoff: "User story, Sprint Planning" },
    { fach: "DBI1U", datum: new Date(2025, 3, 9), stoff: "ERD" },
    { fach: "WMC_1U", datum: new Date(2025, 3, 23), stoff: "React" },
    { fach: "NWC2", datum: new Date(2025, 3, 25), stoff: "???" },
    { fach: "E1", datum: new Date(2025, 3, 28), stoff: "???" },
    { fach: "NWP2", datum: new Date(2025, 3, 29), stoff: "???" },
    { fach: "GES", datum: new Date(2025, 4, 6), stoff: "???" },
    { fach: "BWMR", datum: new Date(2025, 4, 8), stoff: "???" },
    { fach: "GEO", datum: new Date(2025, 4, 20), stoff: "???" },
    { fach: "WMC_1U", datum: new Date(2025, 4, 21), stoff: "???" },
    { fach: "NSCS_1", datum: new Date(2025, 4, 26), stoff: "???" },
    { fach: "AM", datum: new Date(2025, 4, 28, 0), stoff: "???" },
    { fach: "DBI1U", datum: new Date(2025, 5, 4), stoff: "PLSQL" },
    { fach: "POS1", datum: new Date(2025, 5, 5), stoff: "JDBC" },
];

const calculateDaysRemaining = (testDate: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const testDateOnly = new Date(testDate);
    testDateOnly.setHours(0, 0, 0, 0);

    const timeDiff = testDateOnly.getTime() - today.getTime();
    return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
};

const TestterminTable: React.FC<TableProps> = (Props) => {
    const [testtermine, setTesttermine] = useState<TestterminData[]>(loadFromLocalStorage());
    const [newFach, setNewFach] = useState("");
    const [newDatum, setNewDatum] = useState("");
    const [newStoff, setNewStoff] = useState("");
    const [showAll, setShowAll] = useState(false);
    const [xpPopup, setXpPopup] = useState<number | null>(null);
    const [gradient, setGradient] = useState<string>("");
    const [colorUsed, setColorUsed] = useState<number>(0);
    const xp: number = Math.floor(Math.random() * 50 + 10);

    const generateRandomColor = () => {
        const randomColor = () => {
            let color = Math.floor(Math.random() * 16777215).toString(16);
            if(color.length < 6){
                for(let i = color.length; i < 6; i++){
                    color = "0" + color;
                }
            }else{
                color = color.slice(0, 6);
            }
            return "#" + color;
        };
        return `linear-gradient(135deg, ${randomColor()}, ${randomColor()}, ${randomColor()}, ${randomColor()})`;
    };


    const {addXp} = Props;

    useEffect(() => {
        setGradient(generateRandomColor());
    }, [colorUsed]);

    useEffect(() => {
        localStorage.setItem(localStorageKey, JSON.stringify(testtermine));
        window.dispatchEvent(new Event("updateTesttermine"));
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
            window.dispatchEvent(new Event("updateTesttermine"));

            return updatedTests;
        });

        setNewFach("");
        setNewDatum("");
        setNewStoff("");
    };

    const deleteTesttermin = (testToDelete: TestterminData) => {
        addXp(xp);
        setXpPopup(xp);
        setColorUsed(colorUsed+1);
        setTimeout(() => setXpPopup(null), 1500);

        const updatedList = testtermine.filter(test =>
            !(test.fach === testToDelete.fach &&
                test.stoff === testToDelete.stoff &&
                test.datum.getTime() === testToDelete.datum.getTime())
        );
        setTesttermine(updatedList);
        localStorage.setItem(localStorageKey, JSON.stringify(updatedList));
    };


    const editTesttermin = (oldTest: TestterminData, updatedTest: TestterminData) => {
        setTesttermine((prevTests) => {
            const updatedList = prevTests.map((test) => {
                const isSameTest =
                    test.fach === oldTest.fach &&
                    test.stoff === oldTest.stoff &&
                    test.datum.getTime() === oldTest.datum.getTime();

                if (isSameTest){
                    console.log(test.datum + " Original")
                    console.log(updatedTest.datum+ " New")
                }

                return isSameTest
                    ? { ...test, fach: updatedTest.fach, datum: updatedTest.datum, stoff: updatedTest.stoff }
                    : test;
            });

            localStorage.setItem(localStorageKey, JSON.stringify(updatedList));
            window.dispatchEvent(new Event("updateTesttermine"));

            updatedList.sort((a, b) => a.datum.getTime() - b.datum.getTime());

            return updatedList;
        });
    };


    return (
        <div className="container-fluid">
            <table className="table w-100 table-bordered shadow-sm rounded">
                <thead>
                <tr>
                    <th>Fach</th>
                    <th>Datum</th>
                    <th>Stoff</th>
                    <th>Tage verbleibend</th>
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
                            days_remaining={calculateDaysRemaining(test.datum)}
                            onDelete={() => deleteTesttermin(test)}
                            onEdit={(oldTest, updatedTest) => editTesttermin({ ...test }, updatedTest)}


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
            <AnimatePresence>
                {xpPopup !== null && (
                    <motion.div
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        transition={{
                            duration: 1,
                            ease: "easeInOut",
                        }}
                        style={{
                            position: "fixed",
                            top: "80px",
                            right: "30px",
                            padding: "12px 24px",
                            borderRadius: "12px",
                            fontSize: "18px",
                            fontWeight: "bold",
                            color: "white",
                            zIndex: 1000,
                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                            letterSpacing: "0.5px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundImage: gradient,
                            backgroundSize: "200% 200%",
                            animation: "rainbowAnimation 5s linear infinite",
                        }}
                    >
                        +{xp} XP 🚀
                    </motion.div>
                )}
            </AnimatePresence>
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
