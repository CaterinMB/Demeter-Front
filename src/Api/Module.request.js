import axios from "./Axios.js";

export const GetModules = () => axios.get(`/getModuleNames`)
export const GetModuleNamesAndRoleState = (id) => axios.get(`/getModuleNamesAndRoleState/${id}`)
export const RemoveMultipleModulePermissions = (id, modules) => axios.post(`/removeMultipleModulePermissions/${id}`, modules)