import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

interface LevelProps {
    setDisplay: (page: string) => void,
    xp: number
}

export const Level: React.FC<LevelProps> = (Props) => {
    const {setDisplay, xp} = Props;
    const level = Math.floor(xp / 100) + 1;
    const progress = xp % 100;

    useEffect(() => {
        localStorage.setItem("xp", xp);
    }, [xp]);

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm sticky-top">
            <div className="container-fluid justify-content-between">
                <span className="navbar-brand">Level {level} | XP: {progress.toFixed(0)}/100</span>
                <div className="navbar-nav">
                    <button className="nav-link btn btn-link" onClick={() => setDisplay("TimeTable")}>Stundenplan</button>
                    <button className="nav-link btn btn-link" onClick={() => setDisplay("TestterminTable")}>Testtermine</button>
                    <button className="nav-link btn btn-link" onClick={() => setDisplay("Calendar")}>Kalender</button>
                </div>
            </div>
        </nav>
    );
};