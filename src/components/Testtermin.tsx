import React from 'react';

type TestterminProps = {
    fach?: string;
    datum: Date;
};

const Testtermin: React.FC<TestterminProps> = ({ fach = "Kein Fach", datum }) => {
    return (
        <div className="bg-white shadow-lg rounded-2xl p-4 text-center w-64">
            <h2 className="text-xl font-semibold text-gray-800">{fach}</h2>
            <p className="text-gray-500 text-sm mt-2">{datum.toLocaleDateString()}</p>
        </div>
    );
};

export default Testtermin;
