import { createContext, useContext, useState } from 'react';
import { GetModuleNamesAndRoleState, GetModules, RemoveMultipleModulePermissions } from '../Api/Module.request.js'

export const ModuleContext = createContext();

export const useModule = () => {
    const context = useContext(ModuleContext);
    if (!context) {
        throw new Error("El useModule debe usarse dentro de RoleProvider")
    }
    return context;
}

export const Module = ({ children }) => {
    const [module, setModule] = useState([]);

    const getModules = async () => {
        try {
            const res = await GetModules();
            return res.data
        } catch (error) {
            console.log(error)
        }

        return []
    }

    const getModuleNamesAndRoleState = async (id) => {
        try {
            const res = await GetModuleNamesAndRoleState(id);
            return res.data
        } catch (error) {
            console.log(error)
        }

        return []
    }

    const removeMultipleModulePermissions = async (id, modules) => {
        try {
            const res = await RemoveMultipleModulePermissions(id, modules);
            return res.data
        } catch (error) {
            console.log(error)
        }

        return []
    }

    return (
        <ModuleContext.Provider
            value={{
                module,
                getModules,
                getModuleNamesAndRoleState,
                removeMultipleModulePermissions
            }}
        >
            {children}
        </ModuleContext.Provider>
    );
};