import React from 'react';

type TestterminProps = {
    fach?: string;
    datum: Date;
    stoff: string;
    index: number;
    days_remaining: number;
};

const Testtermin: React.FC<TestterminProps> = ({ fach = "Kein Fach", datum, stoff, index, days_remaining }) => {
    return (
        <tr key={index}>
            <td>{fach}</td>
            <td>{datum.toLocaleDateString()}</td>
            <td>{stoff}</td>
            <td>{days_remaining}</td>
        </tr>
    );
};

export default Testtermin;
