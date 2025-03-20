import React, { useState } from 'react';

type TestterminProps = {
    fach?: string;
    datum: Date;
    stoff: string;
    index: number;
    days_remaining: number;
    onDelete: () => void;
    onEdit: (updatedTest: { fach: string; datum: Date; stoff: string }) => void;
};

const Testtermin: React.FC<TestterminProps> = ({ fach = "Kein Fach", datum, stoff, index, days_remaining, onDelete, onEdit }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedFach, setEditedFach] = useState(fach);
    const [editedDatum, setEditedDatum] = useState(datum.toISOString().split('T')[0]);
    const [editedStoff, setEditedStoff] = useState(stoff);

    const handleSave = () => {
        onEdit({ fach: editedFach, datum: new Date(editedDatum), stoff: editedStoff });
        setIsEditing(false);
    };

    return (
        <tr>
            {isEditing ? (
                <>
                    <td><input type="text" value={editedFach} onChange={(e) => setEditedFach(e.target.value)} /></td>
                    <td><input type="date" value={editedDatum} onChange={(e) => setEditedDatum(e.target.value)} /></td>
                    <td><input type="text" value={editedStoff} onChange={(e) => setEditedStoff(e.target.value)} /></td>
                    <td>{days_remaining}</td>
                    <td>
                        <button onClick={handleSave}>Speichern</button>
                        <button onClick={() => setIsEditing(false)}>Abbrechen</button>
                    </td>
                </>
            ) : (
                <>
                    <td>{fach}</td>
                    <td>{datum.toLocaleDateString()}</td>
                    <td>{stoff}</td>
                    <td>{days_remaining}</td>
                    <td>
                        <button onClick={() => setIsEditing(true)}>Bearbeiten</button>
                        <button onClick={onDelete}>Löschen</button>
                    </td>
                </>
            )}
        </tr>
    );
};

export default Testtermin;
