const login = () =>
    import ( /* webpackChunkName: "login" */ '@/views/login/login');
const registerGetCode = () =>
    import ( /* webpackChunkName: "register-getCode" */ '@/views/login/register-getCode/');
const forget = () =>
    import ( /* webpackChunkName: "forget" */ '@/views/login/forget/');


export default [{
    path: "/login",
    name: "login",
    component: login
}, {
    path: "/login/registerGetCode",
    name: "registerGetCode",
    component: registerGetCode
}, {
    path: "/login/forget",
    name: "forget",
    component: forget
}]