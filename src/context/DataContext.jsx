import React, { createContext, useState } from 'react';

// Criação do contexto
const DataContext = createContext();

const DataProvider = ({ children }) => {

    const data = {
        "evento": null,
        "dados": null,
        "pagamento": null
    }

    // Use o estado para permitir atualização dinâmica, se necessário
    const [userData, setUserData] = useState(data);

    return (
        <DataContext.Provider value={{ userData, setUserData }}>
            {children}
        </DataContext.Provider>
    );
};

export { DataContext, DataProvider };