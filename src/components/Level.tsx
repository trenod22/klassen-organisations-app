import { useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Level.css';

interface LevelProps {
    setDisplay: (page: string) => void,
    xp: number
}

// Helper: Interpolate between two colors
function interpolateColor(color1: number[], color2: number[], factor: number) {
    return color1.map((c1, i) => Math.round(c1 + (color2[i] - c1) * factor));
}

export const Level: React.FC<LevelProps> = ({ setDisplay, xp }) => {
    const level = Math.floor(xp / 100) + 1;
    const progress = xp % 100;

    useEffect(() => {
        localStorage.setItem("xp", xp.toString());
    }, [xp]);

    // Colors: from light gray to Bootstrap blue
    const lightGray = [248, 249, 250];   // #f8f9fa
    const blue = [13, 110, 253];         // #0d6efd
    const factor = progress / 100;

    const [r, g, b] = interpolateColor(lightGray, blue, factor);
    const backgroundColor = `rgb(${r}, ${g}, ${b})`;

    const navbarStyle: React.CSSProperties = {
        backgroundColor,
        transition: 'background-color 0.5s ease-in-out',
    };

    return (
        <nav className="navbar navbar-expand-lg shadow-sm sticky-top" style={navbarStyle}>
            <div className="container-fluid justify-content-between">
                <span className="navbar-brand text-dark">
                    Level {level} | XP: {progress.toFixed(0)}/100
                </span>
                <div className="navbar-nav">
                    <button className="nav-link btn btn-link" onClick={() => setDisplay("TimeTable")}>Stundenplan</button>
                    <button className="nav-link btn btn-link" onClick={() => setDisplay("TestterminTable")}>Testtermine</button>
                    <button className="nav-link btn btn-link" onClick={() => setDisplay("Calendar")}>Kalender</button>
                </div>
            </div>
        </nav>
    );
};
