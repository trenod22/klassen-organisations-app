import React, { useState } from 'react';
import "./css/Testtermin.css";

type TestterminProps = {
    fach?: string;
    datum: Date;
    stoff: string;
    days_remaining: number;
    onDelete: (oldTest: { fach: string; datum: Date; stoff: string }) => void;
    onEdit: (
        oldTest: { fach: string; datum: Date; stoff: string },
        updatedTest: { fach: string; datum: Date; stoff: string }
    ) => void;
};

const Testtermin: React.FC<TestterminProps> = ({ fach = "Kein Fach", datum, stoff, days_remaining, onDelete, onEdit }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedFach, setEditedFach] = useState(fach);
    const [editedDatum, setEditedDatum] = useState(datum.toISOString().split('T')[0]);
    const [editedStoff, setEditedStoff] = useState(stoff);

    // Speichern der aktuellen Bearbeitungsdaten
    const handleSave = () => {
        const newDate = new Date(editedDatum);
        // Setze die Zeit auf 00:00 UTC, um die Zeitkomponente zu entfernen
        newDate.setUTCHours(0, 0, 0, 0); // UTC verwenden, um Zeitverschiebung zu vermeiden

        onEdit(
            { fach, datum, stoff },  // Die ursprünglichen Daten
            { fach: editedFach, datum: newDate, stoff: editedStoff }  // Die bearbeiteten Daten
        );
        setIsEditing(false);
    };


    // Bearbeitungsmodus aktivieren
    const pressEdit = () => {
        setIsEditing(true);
        setEditedFach(fach);  // Ursprüngliche Daten zum Bearbeiten setzen
        setEditedDatum(datum.toLocaleDateString("en-CA"));  // Local Date String (ISO 8601 Format)
        setEditedStoff(stoff);
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
                        <button onClick={() => pressEdit()}>Bearbeiten</button>
                        <span> </span>
                        <button onClick={() => onDelete({ fach, datum, stoff })}>Fertig</button>
                    </td>
                </>
            )}
        </tr>
    );
};

export default Testtermin;
