import React from 'react';
import Testtermin from "./Testtermin";

type TestterminData = {
    fach: string;
    datum: Date;
    stoff: string;
};

const testtermine: TestterminData[] = [
    { fach: "Mathematik", datum: new Date(2025, 2, 20), stoff: "Analysis" },
    { fach: "Informatik", datum: new Date(2025, 3, 15), stoff: "POS " },
    { fach: "Englisch", datum: new Date(2025, 4, 10), stoff: "Grammatik" }
];

const TestterminTable: React.FC = () => {
    return (
        <>
            <table className="table">
                <thead>
                    <tr>
                        <th>Fach</th>
                        <th>Datum</th>
                        <th>Stoff</th>
                    </tr>
                </thead>
                <tbody>
                {testtermine.map((test, index) => (
                    <Testtermin datum={test.datum} fach={test.fach} stoff={test.stoff} index={index}/>
                ))}
                </tbody>
            </table>
        </>
    );
};

export default TestterminTable;