import getRandomString from "./RandomString";

export default function GenericRequest(){
    const data = {
        requestId: getRandomString(), //TO DO Get from UUID + Username
        sessionId: sessionStorage.getItem("luna_session"),
        sessionValue: sessionStorage.getItem("luna_session"),
        username: sessionStorage.getItem("luna_user"), // TO DO Get from browser session
        clientIp: 'test', // TO DO Get from browser session
        application: 'ADMIN_PORTAL'
    }
    return data;
}