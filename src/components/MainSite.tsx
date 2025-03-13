// @ts-ignore
import React from 'react';
import Testtermin from "./Testtermin";

const MainSite: React.FC = () => {
    return (
        <>
            <Testtermin fach={"Mathe"} datum={new Date("13.03.2025")}></Testtermin>

        </>
    );
}

export default MainSite;