import React from "react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./TimeTable.css";

const days = ["Woche", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag"];

const TimeTable: React.FC = () => {
    const [schedule, setSchedule] = useState<string[][]>([]);
    const [selectedDay, setSelectedDay] = useState<string>("Woche");

    const defaultSchedule = [
        ["AM - WL", "DBI_1 - LR", "WMC_1U - SF,MS", "BWMR - HB", "LOAL - PD"],
        ["SYP_1P - FA", "NW2P - FR", "WMC_1U - SF,MS", "BWMB - HB", "RK - WS"],
        ["NSCS_1 - GU", "GES - HR", "BWMB - HB", "AM - WL", "BWMR - HB"],
        ["POS1 - SC", "AM - WL", "DBI1U - MF,LR", "POS1U - SC,RI", "BWMR - HB"],
        ["POS1 - SC", "GEO - HX", "NW2C - CL", "POS1U - SC,RI", "-----"],
        ["D - HU", "-----", "E1 - HU", "-----", "NW2C - CL"],
        ["-----", "NSCS_1U - GU,WB", "-----", "E1 - HU", "BESP - SD"],
        ["-----", "NSCS_1U", "-----", "E1 - HU", "BESP - SD"],
        ["-----", "NSCS_1U", "-----", "SYP1 - SV", "D - HU"],
        ["-----", "NSCS_1U", "-----", "SYP1 - SV", "-----"]
    ]

    useEffect(() => {
        const savedSchedule = localStorage.getItem("userSchedule");
        if (savedSchedule) {
            setSchedule(JSON.parse(savedSchedule));
        } else {
            setSchedule(defaultSchedule);
        }
    }, []);

    const resetTimetable = () => {
        setSchedule(defaultSchedule);
        localStorage.setItem("userSchedule", JSON.stringify(defaultSchedule));
    }

    const handleEdit = (rowIndex: number, colIndex: number, value: string) => {
        const newSchedule = [...schedule];
        newSchedule[rowIndex][colIndex] = value;
        setSchedule(newSchedule);
        localStorage.setItem("userSchedule", JSON.stringify(newSchedule));
    };

    return (
        <div className="container text-center mt-3">
            <AnimatePresence>
                {
                    <motion.div
                        className="w-100 d-flex flex-column align-items-center"
                        initial={{ opacity: 0, scale: 0.8, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: -20 }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                    >
                        <select
                            className="form-select form-select-sm text-dark bg-light border-secondary mb-3 w-auto"
                            value={selectedDay}
                            onChange={(e) => setSelectedDay(e.target.value)}
                        >
                            {days.map((day) => (
                                <option key={day} value={day}>{day}</option>
                            ))}
                        </select>
                        <button
                            type="button"
                            className="btn btn-outline-primary mb-3"
                            onClick={() => resetTimetable()}
                        >
                            Stundentplan zurücksetzen
                        </button>

                        <motion.table
                            className={`table table-bordered shadow-sm rounded text-center ${selectedDay !== "Woche" ? 'w-25' : ''}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <thead className="thead-dark">
                            <tr>
                                <th scope="col">Stunde</th>
                                {selectedDay === "Woche" ? (
                                    days.slice(1).map((day, index) => (
                                        <th scope="col" key={index}>{day}</th>
                                    ))
                                ) : (
                                    <th scope="col">{selectedDay}</th>
                                )}
                            </tr>
                            </thead>
                            <tbody>
                            {schedule.map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                    <th scope="row">{rowIndex + 1}</th>
                                    {selectedDay === "Woche" ? (
                                        row.map((cell, colIndex) => (
                                            <td key={colIndex}>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={cell}
                                                    onChange={(e) => handleEdit(rowIndex, colIndex, e.target.value)}
                                                />
                                            </td>
                                        ))
                                    ) : (
                                        <td>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={row[days.indexOf(selectedDay) - 1]}
                                                onChange={(e) => handleEdit(rowIndex, days.indexOf(selectedDay) - 1, e.target.value)}
                                            />
                                        </td>
                                    )}
                                </tr>
                            ))}
                            </tbody>
                        </motion.table>
                    </motion.div>
                }
            </AnimatePresence>
        </div>
    );
};

export default TimeTable;