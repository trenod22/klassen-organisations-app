import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import 'bootstrap/dist/css/bootstrap.min.css';
// @ts-ignore
import React from "react";
import './Calendar.css';

type TestterminData = {
    fach: string;
    datum: Date;
    stoff: string;
};

const months = [
    "Januar", "Februar", "März", "April", "Mai", "Juni",
    "Juli", "August", "September", "Oktober", "November", "Dezember"
];

const weekdayLabels = ["Mo", "Di", "Mi", "Do", "Fr"];

const Calendar: React.FC = () => {



    useEffect(() => {
        loadTesttermine();

        const handleStorageChange = (event: StorageEvent) => {
            if (event.key === "testtermine") {
                loadTesttermine();
            }
        };

        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);


    const [currentDate, setCurrentDate] = useState(new Date());
    const [direction, setDirection] = useState<"left" | "right">("right");
    const [testtermine, setTesttermine] = useState<TestterminData[]>([]);

    const today = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const getDaysInMonth = (year: number, month: number) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const prevMonth = () => {
        setDirection("left");
        setCurrentDate(new Date(year, month - 1, 1));
    };

    const nextMonth = () => {
        setDirection("right");
        setCurrentDate(new Date(year, month + 1, 1));
    };

    const isToday = (day: number) =>
        day === today.getDate() &&
        month === today.getMonth() &&
        year === today.getFullYear();

    const isPast = (day: number) => {
        const date = new Date(year, month, day);
        const now = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        return date < now;
    };

    const getTesttermin = (day: number) => {
        return testtermine.find((termin) => {
            const date = new Date(termin.datum);
            return (
                date.getFullYear() === year &&
                date.getMonth() === month &&
                date.getDate() === day
            );
        });
    };

    const loadTesttermine = () => {
        const saved = localStorage.getItem("testtermine");
        if (saved) {
            const parsed: TestterminData[] = JSON.parse(saved).map((t: any) => ({
                ...t,
                datum: new Date(t.datum),
            }));
            setTesttermine(parsed);
        } else {
            setTesttermine([]);
        }
    };

    // Beim Laden + auf Events im Storage reagieren
    useEffect(() => {
        loadTesttermine();

        const handleStorageChange = () => {
            loadTesttermine();
        };

        // Eigener Event für manuelle Updates
        const handleCustomUpdate = () => {
            loadTesttermine();
        };

        window.addEventListener("storage", handleStorageChange);
        window.addEventListener("updateTesttermine", handleCustomUpdate);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
            window.removeEventListener("updateTesttermine", handleCustomUpdate);
        };
    }, []);

    const weekdaysOnly: number[] = [];
    const totalDays = getDaysInMonth(year, month);
    let daysToSpare = 0;
    const firstDay = new Date(year, month, 1);
    daysToSpare = firstDay.getDay() - 1;
    if(daysToSpare >= 5){
        daysToSpare = 0;
    }
    for(let i = 0; i < daysToSpare;i++){
        weekdaysOnly.push(0);
    }
    for (let day = 1; day <= totalDays; day++) {
        const date = new Date(year, month, day);
        const weekday = date.getDay();
        if (weekday >= 1 && weekday <= 5) {
            weekdaysOnly.push(day);
        }
    }

    const weeks: number[][] = [];
    let currentWeek: number[] = [];
    for (let i = 0; i < weekdaysOnly.length; i++) {
        currentWeek.push(weekdaysOnly[i]);
        if (currentWeek.length === 5) {
            weeks.push(currentWeek);
            currentWeek = [];
        }
    }

    if (currentWeek.length > 0) {
        weeks.push(currentWeek);
    }

    const variants = {
        enter: (direction: "left" | "right") => ({
            opacity: 0,
            x: direction === "right" ? 100 : -100
        }),
        center: {
            opacity: 1,
            x: 0
        },
        exit: (direction: "left" | "right") => ({
            opacity: 0,
            x: direction === "right" ? -100 : 100
        })
    };



    return (
        <div className="container text-center mt-4">
            <div className="bg-light shadow-sm rounded p-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <button className="btn btn-outline-secondary" onClick={prevMonth}>
                        &laquo; Zurück
                    </button>
                    <h4 className="mb-0">
                        {months[month]} {year}
                    </h4>
                    <button className="btn btn-outline-secondary" onClick={nextMonth}>
                        Weiter &raquo;
                    </button>
                </div>

                <div style={{ display: "grid", overflow: "hidden" }}>
                    <AnimatePresence mode="wait" initial={false} custom={direction}>
                        <motion.table
                            key={`${month}-${year}`}
                            className="table table-bordered bg-white w-100"
                            style={{ tableLayout: "fixed" }}
                            custom={direction}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.4 }}
                        >
                            <thead className="thead-light">
                            <tr>
                                {weekdayLabels.map((day, idx) => (
                                    <th key={idx}>{day}</th>
                                ))}
                            </tr>
                            </thead>
                            <tbody>
                            {weeks.map((week, wIdx) => (

                                <tr key={wIdx}>
                                    {week.map((day, dIdx) => {
                                        let classes = "align-middle";
                                        let style: React.CSSProperties = { height: "80px" };

                                        const termin = getTesttermin(day);

                                        if (isToday(day)) {
                                            style.backgroundColor = "#e7f1ff"; // soft blue
                                            classes += " fw-bold text-dark";
                                        } else if (isPast(day) || day === 0) {
                                            style.backgroundColor = "#f8f9fa"; // soft gray
                                            classes += " text-muted";
                                        }

                                        if (termin) {
                                            style.border = "2px solid #0d6efd"; // primary blue
                                        }

                                        return (
                                            <td key={dIdx} className={classes} style={style}>
                                                <div>{day == 0 ? "" : day}</div>
                                                {termin && (
                                                    <>
                                                        <small className="d-block text-danger">
                                                            {termin.fach}
                                                        </small>
                                                        <small className="d-block text-muted" style={{ fontSize: "0.75rem" }}>
                                                            {termin.stoff}
                                                        </small>
                                                    </>
                                                )}
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                            </tbody>
                        </motion.table>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default Calendar;
