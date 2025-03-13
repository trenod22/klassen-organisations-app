import React from 'react';

type TestterminProps = {
    fach?: string;
    datum: Date;
    stoff: string;
    index: number;
};

const Testtermin: React.FC<TestterminProps> = ({ fach = "Kein Fach", datum, stoff, index }) => {
    return (
        <tr key={index}>
            <td>{fach}</td>
            <td>{datum.toLocaleDateString()}</td>
            <td>{stoff}</td>
        </tr>
    );
};

export default Testtermin;
