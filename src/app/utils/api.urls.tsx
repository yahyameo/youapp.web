export const baseURL = "http://localhost:7075/";
let user = baseURL + "user";
export const URLs = {
    login: `${user}/login`,
    register: `${user}/register`,
    getProfile: `${user}/getProfile`,
    updateProfile: `${user}/updateProfile`,
    uploadProfilePicture: `${user}/uploadProfilePicture`,
    getUsers: `${user}/getUsers`,
    getUserById: `${user}/getUserById`,
};
