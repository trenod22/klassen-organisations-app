import { useState } from "react";

const TimeTable: React.FC = () => {
    const [toggled, setToggled] = useState<boolean>(false);

    return (
        <>
            <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setToggled(!toggled)}
            >
                Stundenplan einblenden
            </button>

            {toggled && (
                <table className="table table-striped w-50">
                    <thead>
                    <tr>
                        <th scope="col">Stunde</th>
                        <th scope="col">Montag</th>
                        <th scope="col">Dienstag</th>
                        <th scope="col">Mittwoch</th>
                        <th scope="col">Donnerstag</th>
                        <th scope="col">Freitag</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>AM - WL</td>
                        <td>DBI_1 - LR</td>
                        <td rowSpan={2}>WMC_1U - SF,MS</td>
                        <td>BWMR - HB</td>
                        <td>LOAL - PD</td>
                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td>SYP_1P - FA</td>
                        <td>NW2P - FR</td>
                        <td>BWMB - HB</td>
                        <td rowSpan={2}>RK - WS</td>
                    </tr>
                    <tr>
                        <th scope="row">3</th>
                        <td>NSCS_1 - GU</td>
                        <td>GES - HR</td>
                        <td>BWMB - HB</td>
                        <td>AM - WL</td>
                    </tr>
                    <tr>
                        <th scope="row">4</th>
                        <td rowSpan={2}>POS1 - SC</td>
                        <td>AM - WL</td>
                        <td rowSpan={2}>DBI1U - MF,LR</td>
                        <td rowSpan={2}>POS1U - SC,RI</td>
                        <td>BWMR - HB</td>
                    </tr>
                    <tr>
                        <th scope="row">5</th>
                        <td>GEO - HX</td>
                        <td>NW2C - CL</td>
                    </tr>
                    <tr>
                        <th scope="row">6</th>
                        <td>D - HU</td>
                        <td>------</td>
                        <td>E1 - HU</td>
                        <td>------</td>
                        <td>NW2C - CL</td>
                    </tr>
                    <tr>
                        <th scope="row">7</th>
                        <td>------</td>
                        <td rowSpan={4}>NSCS_1U - GU,WB</td>
                        <td>------</td>
                        <td rowSpan={2}>E1 - HU</td>
                        <td rowSpan={2}>BESP - SD</td>
                    </tr>
                    <tr>
                        <th scope="row">8</th>
                        <td>------</td>
                        <td>------</td>
                    </tr>
                    <tr>
                        <th scope="row">9</th>
                        <td>------</td>
                        <td>------</td>
                        <td rowSpan={2}>SYP1 - SV</td>
                        <td>D - HU</td>
                    </tr>
                    <tr>
                        <th scope="row">10</th>
                        <td>------</td>
                        <td>------</td>
                        <td>------</td>
                    </tr>
                    </tbody>
                </table>
            )}
        </>
    );
}

export default TimeTable;
