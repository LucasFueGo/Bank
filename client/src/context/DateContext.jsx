import React, { useState } from "react";

const DateContext = React.createContext(null);

const DateProvider = ({ children }) => {
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [year, setYear] = useState(new Date().getFullYear());
    const years = Array.from({ length: 5 }, (_, i) => 2024 + i);

    const months = [
        { value: 1, label: 'Janvier' },
        { value: 2, label: 'Février' },
        { value: 3, label: 'Mars' },
        { value: 4, label: 'Avril' },
        { value: 5, label: 'Mai' },
        { value: 6, label: 'Juin' },
        { value: 7, label: 'Juillet' },
        { value: 8, label: 'Août' },
        { value: 9, label: 'Septembre' },
        { value: 10, label: 'Octobre' },
        { value: 11, label: 'Novembre' },
        { value: 12, label: 'Décembre' },
    ];

    const exposedValue = {
        month,
        setMonth,
        year,
        setYear,
        months,
        years
    };

    return (
        <DateContext.Provider value={exposedValue}>
            {children}
        </DateContext.Provider>
    );
};

export { DateContext, DateProvider };