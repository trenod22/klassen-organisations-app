import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import 'bootstrap/dist/css/bootstrap.min.css';

const months = [
    "Januar", "Februar", "März", "April", "Mai", "Juni",
    "Juli", "August", "September", "Oktober", "November", "Dezember"
];

const weekdayLabels = ["Mo", "Di", "Mi", "Do", "Fr"];

const Calendar: React.FC = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [direction, setDirection] = useState<"left" | "right">("right");

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

    const weekdaysOnly: number[] = [];
    const totalDays = getDaysInMonth(year, month);
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

                <div style={{ position: "relative", minHeight: "300px" }}>
                    <AnimatePresence mode="wait" initial={false} custom={direction}>
                        <motion.table
                            key={`${month}-${year}`}
                            className="table table-bordered bg-white w-100"
                            style={{ position: "absolute", width: "100%" }}
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

                                        if (isToday(day)) {
                                            style.backgroundColor = "#e9ecef";
                                            classes += " fw-bold";
                                        } else if (isPast(day)) {
                                            classes += " text-muted";
                                            style.backgroundColor = "#f8f9fa";
                                        }

                                        return (
                                            <td key={dIdx} className={classes} style={style}>
                                                {day}
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
